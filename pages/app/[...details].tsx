import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import { Footer, getListedNft, Icon } from '@/components/Utils'
import { MostPopular } from '@/components/Homepage'
import { nearWallet, storage_balance_of, offer, remove_sale } from '@/contracts-connector/near/near-interface'
import { NEAR_MARKETPLACE_ADDRESS } from '@/config/constants'
import { utils } from 'near-api-js'
import { GetServerSidePropsContext } from 'next'
import RelistModal from '@/components/AppDetails/RelistModal'

import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

import contract from '../../contracts-connector/evm/addresses.json'
import { getMarketAddress } from '@/hooks/selectChain'
import { ethers } from 'ethers'
import EVMRelistModal from '@/components/AppDetails/EVMRelistModal'
import Loading from '@/components/Utils/Loading'


const AppDetails = (path: { path: string }) => {

	const [isOpen, setIsOpen] = useState(false)
	const [token_id, settoken_id] = useState('0')
	const [Desc, setDesc] = useState('desc1')
	const [storageBalance, setStorageBalance] = useState('0')
	const [data, setData] = useState();
	const [enableBuy, setenableBuy] = useState(false)
	const [fprice, setfprice] = useState('0')
	const [functCall, setfunctCall] = useState('devDappInfo')
	const [nftAddress, setnftAddress] = useState()
	const { chain } = useNetwork();
	const { address, isConnected } = useAccount();
	const walletId = address || nearWallet.accountId

	async function BuyOffer() {
		try {
			const tx = offer({
				nft_contract_id: 'newminter.danieldave.testnet',
				token_id: String(token_id),
				contractId: NEAR_MARKETPLACE_ADDRESS,
				deposit: String(data.price)
			})

			return tx
		} catch (buy_error: any) {
			console.log(buy_error)
		}
	}

	async function getStorageBalance() {
		if (nearWallet.connected) {
			try {
				let bal = ''
				bal = await storage_balance_of({
					account_id: String(walletId),
					contractId: NEAR_MARKETPLACE_ADDRESS
				})
				bal = utils.format.formatNearAmount(bal)
				setStorageBalance(bal)
			}
			catch (e) {
				console.log(e)
			}
		} else console.log('Not Connected')
	}

	const { data: readBlockData, error: getDappErr } = useContractRead({
		address: getMarketAddress(chain),
		abi: contract.marketAbi,
		functionName: functCall,
		args: token_id != '0' ? [nftAddress, token_id] : [nftAddress],
		enabled: nftAddress
	})

	useEffect(() => {

		if (!walletId) {
			alert("Kindly Connect your wallet to view to view This app")
			window.location.replace(window.location.origin)
			return
		}

		nearWallet.startUp()
		if (nearWallet.connected) {
			const [_, id, __] = window.atob(path.path).split('/')
			settoken_id((id))

			setTimeout(() => {
				getStorageBalance()
				MarketPlaceNfts(String(token_id))
			}, 5000);
			return
		}
		if (isConnected) {
			const [nft, id, chain_Id] = window.atob(path.path).split('/')
			setnftAddress(nft)
			settoken_id(Number(id))

			if (chain?.id != Number(chain_Id)) window.location.replace(window.location.origin)

			if (id == '0') setfunctCall('devDappInfo')
			else setfunctCall('userDappInfo')
			setnftAddress(nft)
			setTimeout(() => {
				saveData()
			}, 5000);
			return
		}

		// alert("Connect Your Wallet To View Listed Apps on Your Blockchain")
		return
	}, [token_id, nftAddress, readBlockData, nearWallet.connected, isConnected])

	const MarketPlaceNfts = async (token_id: string) => {
		setData(await getListedNft(200, token_id))
	}

	const getADapp = async () => {
		if (readBlockData == undefined) {
			return
		}
		let a = await fetch("https://ipfs.io/ipfs/" + readBlockData?.uri, {
			method: 'GET',
			redirect: 'follow'
		})
			.then(response => response.json().then(res => {
				return res
			}))
			.catch(error => console.log('error', error));

		return {
			owner: readBlockData?.owner,
			price: readBlockData?.price?.toString(),
			numberOfDownloads: readBlockData?.numberOfDownloads?.toString(),
			data: await a,
			totalSupply: readBlockData?.totalSupply?.toString(),
			id: readBlockData?.id?.toString(),
		};
	}

	const saveData = async () => {
		setData(await getADapp())
	}

	const handleRelist = () => {
		if (nearWallet.connected || isConnected) {
			if ((data?.owner_id || data?.owner) != walletId) return
			setIsOpen(true)
		} else {
			alert('You`re not Connected')
		}
	}

	const { config: evmBuyConfig } = usePrepareContractWrite({
		address: getMarketAddress(chain),
		abi: contract.marketAbi,
		functionName: 'Purchase',
		args: [token_id, nftAddress],
		overrides: {
			value: ethers.utils.parseEther(fprice),
		},
		enabled: enableBuy
	})

	const { data: BuyTx, write: BuyEVM, error: buyTxError, isLoading } = useContractWrite(evmBuyConfig)

	const { data: waittx, isError, error: buyerror } = useWaitForTransaction({
		hash: BuyTx?.hash,
	})

	useEffect(() => {
		if (waittx) {
			if (!isError)
				window.location.replace(window.location.origin + '/myapps')
			else console.log(buyerror)
		}
	}, [waittx])

	const handleUnlist = async () => {
		if ((data?.owner_id || data?.owner) != walletId) return

		if (nearWallet.connected) {
			try {
				const tx = await remove_sale({
					nft_contract_id: 'newminter.danieldave.testnet',
					contractId: NEAR_MARKETPLACE_ADDRESS,
					token_id: String(token_id),
					deposit: String('1')
				})

				return tx
			} catch (unlistErr: any) {
				console.log(unlistErr)
			}
			return
		}
	}

	const handleBuy = () => {
		if (nearWallet.connected) {
			try {
				BuyOffer()
			} catch (err) {
				console.log(err)
			}
		}
		else if (isConnected) {
			BuyEVM?.()
		}
		else {
			alert('You`re not Connected')
		}
	}

	const imgSrc = data != null ? "https://ipfs.io/ipfs/" + data?.data?.images_url?.banner : '/images/Cyberpunk2b077_1.png'


	useEffect(() => {
		if (!data) return
		setenableBuy(true)
		let des = data?.data?.description
		des = des?.length > 300 ? des?.slice(0, 300) : des
		setDesc(des)

		if (isConnected) setfprice(ethers.utils.formatEther(data?.price).toString())
		else setfprice(utils.format.formatNearAmount(data?.price))

	}, [data])

	console.log(data)

	if (!data) {
		return <Loading />
	} else if (data.data != undefined) {
		return (
			<>
				<div className='px-[30px] text-[#7A7A7A]'>

					<div className='flex space-x-[55px]'>
						<div>
							<Image unoptimized alt='' className="rounded-[20px]  w-[396px] object-cover h-[486px]" width={500} height={200} src={imgSrc} />
							<div className='bg-[#FCFCFC] flex rounded-b-[20px] pt-3 w-[270px] h-[62px] mt-[-15px]'>

								<div className='flex space-x-3 m-auto'>
									<div className='flex items-center'>
										<Icon classes='mr-2 ' name='Heart.svg' size={20} />
										<p className='text-[14px]'>244 Likes</p>
									</div>
									<div className='flex items-center'>
										<Icon classes='mr-2' name='share.svg' size={20} />
										<p className='text-[14px]'>12 shares</p>
									</div>
								</div>
							</div>
						</div>

						<div className='space-y-6'>
							<div className='w-[742px] p-[30px] bg-[#FFFFFF] rounded-[24px] flex '>
								<div className='flex-1 space-y-3'>
									<p className="font-meduim text-[14px] text-[#000000]">Created By: <span className='capitalize text-[#6039CF]'>{data?.owner_id || data.owner}</span></p>
									<p className="font-semibold text-[32px] text-[#000000]">{data?.data?.name}</p>
									<p className='text-[14px]'>
										{Desc}
										{Desc.length > 300 ? (
											<button className='text-[#6039CF] ml-2'
												onClick={() => setDesc(data?.data?.description.slice(0, 300))}
											> Show less
											</button>) : (
											<button className='text-[#6039CF] ml-2'
												onClick={() => setDesc(data?.data?.description)}
											> Show more
											</button>)}
									</p>

									<div className='flex space-x-6 items-center'>
										<div className='flex flex-col items-center'>
											<div className='flex items-center'>
												<p className='text-[32px] text-[#000000] font-semibold '>4.0</p>
												<Icon classes='ml-1 w-[25px] h-[25px]' name='star-filled.png' size={20} />
											</div>
											<p className='text-[12px]'>Average</p>
										</div>

										<div className='h-[62px] w-0 border border-black'></div>

										<div className='flex flex-col items-center'>
											<div className='flex items-center'>
												<p className='text-[32px] text-[#000000] font-semibold '>17k</p>
											</div>
											<p className='text-[12px]'>Ratings</p>
										</div>

										<div className='h-[62px] w-0 border border-black'></div>

										<div className='flex items-center'>
											<div className='flex items-center'>
												<Icon classes='mr-2 object-contain w-[40px] h-[60px]' name='teenesrb.svg' size={20} />
											</div>

											<div className='flex flex-col '>
												<p className='text-[12px]'>Diverse Content: discretion is advised </p>
												<p className='text-[12px]'>In App Purchases</p>
											</div>
										</div>

									</div>
								</div>

								{isConnected && (
									<div>
										<div className='flex ml-3 space-y-2 flex-col m-auto'>
											<div className='flex items-center'>
												<Icon classes='mr-2 ' name='truck.svg' size={20} />
												<p className='text-[14px]'>{data?.totalSupply} Supply</p>
											</div>
											<div className='flex items-center'>
												<Icon classes='mr-2' name='receive-square.svg' size={20} />
												<p className='text-[14px]'>{data?.numberOfDownloads} Downloads</p>
											</div>
										</div>
									</div>
								)}

							</div>


							<div className='w-[742px] h-[217px] space-y-3 bg-[#FCFCFC] border border-[#e6e6e6] rounded-[16px] flex flex-col overflow-hidden'>

								<div className='flex border-b border-[#E6E6E6] h-[48px] items-center w-[100%] justify-between'>
									<div className='flex-1 text-[16px] uppercase p-5 flex'>
										<Icon classes='mr-2 ' name='notification-icon.svg' size={20} />
										<p>Sale ends February 28, 2023 at 8:55 AM GMT-8</p>
									</div>

									<div className='bg-[#FFC005] items-center flex justify-center w-[42px] h-[48px]'>
										<Icon classes='' name='notification-icon-white.svg' size={20} />
									</div>
								</div>

								<div className='px-5 py-2 justify-between flex'>
									<div className=''>
										<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>Current Price</p>
										<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>
											{fprice} {chain?.nativeCurrency.symbol || "NEAR"}
										</p>
									</div>
									<div className=''>
										<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>24H Volume</p>
										<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>15.25 {chain?.nativeCurrency.symbol || "NEAR"}</p>
									</div>
									<div className=''>
										<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>Total Volume</p>
										<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>15.25 {chain?.nativeCurrency.symbol || "NEAR"}</p>
									</div>
								</div>

								<div className='px-5 flex space-x-3'>


									<button className={`${(data?.owner_id || data?.owner) == walletId ? 'bg-[#6039CF]' : 'bg-[#D3D3D3] '} rounded-[12px] pointer w-[280px] h-[48px] flex items-center justify-center`}
										onClick={Number(data.price) > 0 ? handleUnlist : handleRelist}
										disabled={(data?.owner_id || data?.owner) != walletId}
									>
										<Icon classes='mr-5' name='document.svg' size={20} />
										<p className='text-[#FFFFFF] text-[16px] font-semibold'>{Number(data.price) > 0 ? 'Unlist' : 'Relist'}</p>
									</button>

									{Number(data.price) > 0 ?
										(
											(data?.owner_id || data?.owner) != walletId ?
												(
													<button className={`bg-[#6039CF] rounded-[12px] w-[280px] h-[48px] flex items-center justify-center`}
														onClick={handleBuy}
														disabled={isLoading}
													>
														<Icon classes='mr-5' name='document.svg' size={20} />
														<p className='text-[#A6A6A6] text-[16px] font-semibold'>{isLoading ? "Please Wait ..." : "Buy"}</p>
													</button>
												)
												:

												(<a href={`https://ipfs.io/ipfs/${data.data.images_url?.appFile}`} download={data.data.name}>
													<button className={`bg-[#6039CF] rounded-[12px] w-[280px] h-[48px] flex items-center justify-center`}
													>
														<Icon classes='mr-5' name='document.svg' size={20} />
														<p className='text-[#A6A6A6] text-[16px] font-semibold'>Download App</p>
													</button>
												</a>)
										)
										:
										(
											<a href={`https://ipfs.io/ipfs/${data.data.images_url?.appFile}`} download={data.data.name}>
												<button className={`bg-[#6039CF] rounded-[12px] w-[280px] h-[48px] flex items-center justify-center`}
													disabled={data?.owner_id != walletId}
												>
													<Icon classes='mr-5' name='document.svg' size={20} />
													<p className='text-[#A6A6A6] text-[16px] font-semibold'>Download App</p>
												</button>
											</a>
										)
									}
								</div>

							</div>

						</div>

					</div>

					<div className='mt-[30px]'>
						<div className='bg-[#FCFCFC] p-[28px] rounded-[20px] h-[287px] grid grid-cols-3 w-[100vw] gap-[15px]'>

							<Image unoptimized alt='' className="rounded-[20px]  w-[100%] object-cover h-[230px]" width={2} height={200} src={`https://ipfs.io/ipfs/${data.data.images_url?.image1}`} />

							<Image unoptimized alt='' className="rounded-[20px]  w-[100%] object-cover h-[230px]" width={2} height={200} src={`https://ipfs.io/ipfs/${data.data.images_url?.image2}`} />

							<Image unoptimized alt='' className="rounded-[20px]  w-[100%] object-cover h-[230px]" width={2} height={200} src={`https://ipfs.io/ipfs/${data.data.images_url?.image3}`} />

						</div>
					</div>

					<div className='mt-[30px] space-x-[35px] flex'>

						{/* chart section  */}
						<div className='bg-[#FFFFFF] w-[690px] h-[345px] border border-[#e6e6e6] rounded-[12px] '>

							<div className='w-full flex px-5 h-[50px] border-b border-[#e6e6e6]'>

								<div className='flex-1 items-center flex'>
									<Icon classes='mr-2 ' name='chart.svg' size={20} />
									<p className='text-[16px] font-semibold text-[#212121]'>Price History</p>
								</div>

								<Icon classes='' name='Vector 91.svg' size={20} />
							</div>

							<div className='p-5'>

								<div className='bg-[#F0F0F0] p-[4px]  rounded-[6px] items-center ml-auto w-[72px] h-[27px] flex'>

									<p className='text-[16px] text-center font-medium text-[#666666] '>Week</p>

									<Icon classes='ml-2 w-[12px] h-[12px]' name='Vector 91.svg' size={20} />

								</div>

								<Icon classes='mt-5 w-[668px] h-[200px]' name='Chart-Det.svg' size={20} />
							</div>

						</div>
						{/* end of chart section  */}

						{/* listing section  */}
						<div className='bg-[#FFFFFF] w-[470px] h-[345px] border border-[#e6e6e6] rounded-[12px] '>

							<div className='w-full flex px-5 h-[50px] border-b border-[#e6e6e6]'>

								<div className='flex-1 items-center flex'>
									<Icon classes='mr-2 ' name='document-black.svg' size={20} />
									<p className='text-[16px] font-semibold text-[#212121]'>Listing</p>
								</div>

								<Icon classes='' name='Vector 91.svg' size={20} />
							</div>


							<div className='bg-[#F5F5F5] w-[424px] h-[239px] flex flex-col items-center justify-center rounded-[12px] m-[23px]'>

								<div>
									<div className='rounded-full flex items-center m-auto w-[64px] h-[64px] bg-[#FFCC37] '>
										<Icon classes='w-[30px] mx-auto' name='Group 81.svg' size={20} />
									</div>
									<p className='mt-2'>No Official Listing Yet</p>
								</div>

							</div>

						</div>

					</div>

					{/* ratins and reviews section  */}
					<div>
						<div className='bg-[#FFFFFF] mt-[30px] w-[1197px] h-[470px] border border-[#e6e6e6] rounded-[12px] '>

							<div className='w-full flex px-5 h-[50px] border-b justify-between items-center border-[#e6e6e6]'>

								<p className='text-[16px] font-semibold text-[#212121]'>Ratings and Reviews</p>
								<Icon classes='rotate-[-90deg] ' name='vector 91.svg' size={20} />
							</div>

							{/* rating  */}
							<div className='p-8 px-10 space-x-[33px] flex'>
								<div>
									<p className='text-[50px] text-[#000000] font-semibold '>4.0</p>
									<p className='text-[12px]'>17,567 Ratings</p>
								</div>

								<div className='items-center  flex flex-col'>
									<div className='flex items-center space-x-3 '>
										<p className='flex text-[12px] items-center'>
											5
											<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
										</p>
										<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
											<div className='bg-[#FFC005] w-[150px] h-[8px] rounded-[6px] '></div>
										</div>
									</div>

									<div className='flex items-center space-x-3 '>
										<p className='flex text-[12px] items-center'>
											4
											<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
										</p>
										<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
											<div className='bg-[#FFC005] w-[174px] h-[8px] rounded-[6px] '></div>
										</div>
									</div>

									<div className='flex items-center space-x-3 '>
										<p className='flex text-[12px] items-center'>
											3
											<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
										</p>
										<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
											<div className='bg-[#FFC005] w-[74px] h-[8px] rounded-[6px] '></div>
										</div>
									</div>

									<div className='flex items-center space-x-3 '>
										<p className='flex text-[12px] items-center'>
											2
											<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
										</p>
										<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
											<div className='bg-[#FFC005] w-[31px] h-[8px] rounded-[6px] '></div>
										</div>
									</div>

									<div className='flex items-center space-x-3 '>
										<p className='flex text-[12px] items-center'>
											1
											<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
										</p>
										<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
											<div className='bg-[#FFC005] w-[18px] h-[8px] rounded-[6px] '></div>
										</div>
									</div>

								</div>

							</div>

							<div className='flex p-5'>
								{Array(5).fill(true).map((_, i) => (
									<Icon key={i} classes='ml-1 w-[20px] h-[20px]' name='star-nofill.svg' size={20} />
								))}
								<p className='ml-5 text-[#000000] text-[14px]'>How Would you Rate CyberPunk 2077 - Apps and Games</p>
							</div>

							<div className='px-5'>
								<div className='flex items-center'>
									<Icon classes='w-[13px] h-[13px]' name='cup.svg' size={20} />
									<p className='ml-1 text-[12px] text-[#6039CF]'>Most helpful Review</p>
								</div>

								<p className='text-[24px] text-[#000000] font-semibold '>Very Great Game</p>
								<p className='text-[16px] mt-[11px]'>tbh this game is superb, i wasnt expecting it to be so good, the game play and the quality is so perfect. i will give it a 5 star for the effort by Dimension studios. the only issue i have with the game is that it keeps updating on its own even tho i havent told it to update. i know this is not a big issue but i will like if the app will only updates when user wants it to.</p>

								<div className="flex mt-[22px]">

									<div className="flex flex-1">
										<p>Show all</p>
										<Icon classes='w-[24px] h-[24px] object-contain' name='arrow-up.png' size={20} />
									</div>

									<div className='flex items-center space-x-[32px]'>
										<p className='flex items-center '>
											<Icon classes='w-[24px] mr-1 rotate-[180deg] h-[24px]' name='dislike.svg' size={20} />
											<span>200</span>
										</p>
										<p className='flex items-center '>
											<Icon classes='w-[24px] mr-1 h-[24px]' name='dislike.svg' size={20} />
											<span>0</span>
										</p>
										<Icon classes='w-[24px] h-[24px]' name='flag.svg' size={20} />

									</div>
								</div>

							</div>

						</div>
					</div>

					<div>
						<div className='bg-[#FFFFFF] mt-[30px] w-[1197px] h-[332px] border border-[#e6e6e6] rounded-[12px] '>

							<div className='w-full flex px-5 h-[50px] border-b justify-between items-center border-[#e6e6e6]'>

								<p className='text-[16px] font-semibold text-[#212121]'>System requirements</p>
								<Icon classes='rotate-[-90deg] ' name='vector 91.svg' size={20} />
							</div>

							<div className='p-5 text-[14px] space-y-[16px]'>
								<p className='flex '>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick-circle.svg' size={20} />
									This Product should work on your Device Items with a check mark meets developers requirement
								</p>
								<p className='flex items-end'>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick.svg' size={20} />
									<span className='text-[16px] font-semibold #4D4D4D'>Available on</span>: PC
								</p>
								<p className='flex items-end'>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick.svg' size={20} />
									<span className='text-[16px] font-semibold #4D4D4D'>OS</span>: Windows 10 Version 17763.0 or Higher
								</p>
								<p className='flex items-end'>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick.svg' size={20} />
									<span className='text-[16px] font-semibold #4D4D4D'>Architecture</span>: x86
								</p>
								<p className='flex items-end'>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick.svg' size={20} />
									<span className='text-[16px] font-semibold #4D4D4D'>Keyboard</span>: Not specified (Minimum), Integrated Keyboard (recomended)
								</p>
								<p className='flex items-end'>
									<Icon classes='w-[24px] h-[24px] mr-[21px]' name='tick.svg' size={20} />
									<span className='text-[16px] font-semibold #4D4D4D'>Mouse</span>: Not specified (Minimum), Integrated Mouse (recomended)
								</p>


							</div>

						</div>
					</div>

					<div className='mb-[70px]'>
						<p className="mt-[31px] text-[32px] text-[#4D4D4D] font-semibold"> More Like This</p>

						<MostPopular />
					</div>
				</div>
				<Footer />
				{isConnected ?
					<EVMRelistModal setIsOpen={setIsOpen} data={{ token_id, nftAddress }} isOpen={isOpen} />
					:
					<RelistModal storageBalance={storageBalance} setIsOpen={setIsOpen} isOpen={isOpen} token_id={token_id} />
				}
			</>
		)
	} else window.location.replace(window.location.origin)

}

export default AppDetails

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const params = context.params;
	const path: any = params?.details

	return {
		props: {
			path
		}
	}

}

