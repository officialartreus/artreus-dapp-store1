
import MostPopularAssets from '@/components/BuyAssests/MostPopularAssets'
import { HotAssets, MostPopular } from '@/components/Homepage'
import { getMarketAddress } from '@/hooks/selectChain'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import contract from '../contracts-connector/evm/addresses.json'
import { Footer, getListedNfts } from '@/components/Utils'
import { nearWallet } from '@/contracts-connector/near/near-interface'
import ConnectWallet from '@/components/Utils/ConnectWallet'
import Loading from '@/components/Utils/Loading'



const BuyAssets = () => {

  const [data, setData] = useState();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { data: readData } = useContractRead({
    address: getMarketAddress(chain),
    abi: contract.marketAbi,
    functionName: 'getAllDevDapps'
  })

  const getAllDappsListeds = async (limit: number) => {
    let newerData = readData?.map(async (data: any, index: number) => {
      if (data.uri != '') {
        let a;
        await fetch("https://ipfs.io/ipfs/" + data.uri, {
          method: 'GET',
          redirect: 'follow'
        })
          .then(response => response.json().then(res => {
            a = res
          }))
          .catch(error => console.log('error', error));
        return {
          owner: data.owner,
          nft_contract: data.nft,
          data: a,
          id: data.id
        };
      }
    })

    if (newerData != undefined) {
      newerData = await Promise.all(newerData)
      newerData = newerData.filter((data: any) => data != undefined)
      setData(newerData)
    }
  }

  const MarketPlaceNfts = async () => {
    const d = await getListedNfts(20)
    setData(() => { if (d) return d; else return [] })
  }

  useEffect(() => {

    nearWallet.startUp()
    if (nearWallet.connected) {
      setTimeout(() => {
        MarketPlaceNfts()
        return
      }, 5000);
    }
    if (isConnected) {
      setTimeout(() => {
        getAllDappsListeds(20)
      }, 5000);
    }

  }, [readData, getMarketAddress(chain), nearWallet.connected, isConnected])

  if (isConnected || nearWallet.connected) {
    if (!data) {
      return (<Loading />)
    } else {
      return (
        <div className='px-[40px]'>
          <section className="">
            <div className="relative">
              <Image unoptimized alt='' className="rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[300px]" width={500} height={200} src='/images/Battle.png' />

              <div className="absolute top-[27%] left-[10%] ">
                <p className="text-[50px] leading-[60px] text-white font-bold">
                  Purchase and Sell <br />
                  in Game assets
                </p>

              </div>

            </div>
          </section>

          {/* most popular dapps  */}
          <section className="mt-[50px]">
            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Most Popular Games</p>
              </div>
              {data?.length > 0 ? <MostPopular num={20} data={data} /> : <MostPopular />}
            </div>
          </section>


          {/* recently added  */}
          <div className='mt-[50px]'>
            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Recently Added Games</p>
              </div>
              {data.length > 0 ? <HotAssets len={12} data={data} /> : <HotAssets len={12} />}
            </div>
          </div>


          {/* recently listed dapps  */}
          <section className="mt-[50px] mb-[40px]">
            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Recently Listed Dapps</p>
              </div>
              {data.length > 0 ? <MostPopular num={6} data={data} /> : <MostPopular />}
            </div>
          </section>

        </div>
      )
    }
  } else {
    // alert('Connect Wallet to view Listed Dapps')
    return <ConnectWallet />
  }


}

export default BuyAssets
