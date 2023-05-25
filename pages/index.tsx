
import { Icon } from "@/components/Utils/Icon";
import Image from "next/image";
import { Hero, HotAssets, MostPopular } from "@/components/Homepage";
import Link from "next/link";
import { Footer, getListedNfts, } from "@/components/Utils";
import { nearWallet } from '../contracts-connector/near/near-interface'

import { useEffect, useState } from "react";
import contract from '../contracts-connector/evm/addresses.json'
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { getMarketAddress } from "@/hooks/selectChain";
import Loading from "@/components/Utils/Loading";
import ConnectWallet from "@/components/Utils/ConnectWallet";




export default function Home() {
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
          id: data.id,
          chainId: chain?.id
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


  const src = [
    'A Plague Tale Requiem 2.png',
    'Kitaria_Fables_2.jpg',
    'Gamedec.png',
    'A Plague Tale Requiem 10.png', 'Crossfire Legion - Base Defense 2.jpg',
    'A Plague Tale Requiem 11.png',
    'Gamedec-1.png',
    'Crookz Key Art.jpg',
    'HordeCore Screenshot 02.png', 'Crossfire_Legion.jpg',
    'A Plague Tale Requiem 11.png', 'Crookz Key Art.jpg',
    'Cyberpunk2077 13.png', 'Cyberpunk2077 8.png',
    'A Plague Tale Requiem 4.png',
    'Gamedec-5.png',
    'Cyberpunk2077_1.png',
    'A Plague Tale Requiem 4.png'
  ]


  if (isConnected || nearWallet.connected) {
    if (!data) {
      return (<Loading />)
    } else {
      return (
        <>
          <Hero />

          {/* most popular  */}
          <section className="px-[30px]">
            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Most Popular Games</p>
                <Link className="text-[20px] p-0 m-0 text-[#212121]" href={'mostpopular'}>
                  See More
                </Link>
              </div>
              {data.length > 0 ? <MostPopular num={6} data={data} /> : <MostPopular />}
            </div>
          </section>

          {/* recently added  */}
          <div className='mt-10 px-[30px]'>

            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Recently Added</p>
                <Link className="text-[20px] p-0 m-0 text-[#212121]" href={'recentlyadded'}>
                  See More
                </Link>
              </div>
              {data.length > 0 ? <HotAssets len={12} data={data} /> : <HotAssets len={12} />}
            </div>
          </div>

          {/* Purchase and Sell  */}
          <section className="px-[30px] mt-[70px]">
            <div className="relative">
              <Image unoptimized alt='' className="rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[300px]" width={200} height={200} src='/images/Battle.png' />
              <div className="absolute top-[17%] left-[10%] ">
                <p className="text-[50px] leading-[60px] text-white font-bold">
                  Purchase and Sell <br />
                  in Game assets
                </p>
                {/* <Link href={'/buyassets'}> */}
                <div className="flex items-center mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
                  <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
                  <p className="ml-[5px] text-xl">Coming soon</p>
                </div>
                {/* </Link> */}


              </div>
            </div>
          </section>



          {/* hot assets  */}


          <div className='mt-10 px-[30px]'>
            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Hot Assets (Coming Soon)</p>
                <Link className="text-[20px] p-0 m-0 text-[#212121]" href={'/'}>
                  See More
                </Link>
              </div>
              <HotAssets len={5} />
            </div>
          </div>

          {/* Cyberpunk2077_1  */}
          <section className="px-[30px] mt-[70px]">
            <div className="relative">
              <Image unoptimized alt='' className="object-center rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[430px]" width={200} height={200} src='/images/Cyberpunk2077_1.png' />
              <div className="absolute top-[43%] left-[43%] ">
                <Icon classes="w-[52px] h-[52px]" name="play-circle.png" size={20} />
              </div>
            </div>
          </section>

          {/* Buy and Sell NFTs section  */}
          <section className="px-[30px] relative mt-[70px]">
            <div className="cloud-section w-[100%] overflow-hidden h-[312px]">

              <div>
                <Image unoptimized alt='' className=" w-[600px]  h-[300px]" width={200} height={200} src='/images/icons/Clouds.png' />

                <Image unoptimized alt='' className="z-[5] absolute top-0 left-0 w-[300px]  h-[300px]" width={200} height={200} src='/images/icons/head.png' />

                <Image unoptimized alt='' className="z-[7]  absolute top-0 left-[180px] w-[90px]  h-[90px]" width={200} height={200} src='/images/icons/36.png' />

                <Image unoptimized alt='' className=" absolute top-[170px] left-[34px] w-[90px]  h-[90px]" width={200} height={200} src='/images/icons/18.png' />
              </div>

              <div className="absolute top-[17%] right-[10%] ">
                <p className="text-[40px] text-right leading-[60px] text-white font-bold">
                  Buy and Sell <br />
                  Community Backed <br />
                  NFTs
                </p>

                {/* <Link href={'/buynft'}> */}
                <div className="flex items-center ml-auto object-right mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
                  <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
                  <p className="ml-[5px] text-xl">Coming Soon</p>
                </div>
                {/* </Link> */}

              </div>
            </div>
          </section>


          {/* Hotlists nfts section  */}
          {/* <div className='mt-10 px-[30px]'>
        <p className="text-[32px] text-[#4D4D4D] font-semibold my-2 mb-4">Hotlists NFTs</p>


        <div className="w-[1203px] h-[495px] rounded-[24px] border-[2px] border-[#E6E6E6]">

          <div className="border-b h-[69px] px-[30px] flex ">

            <div className="space-x-[32px] flex items-end">
              <button className="border-b-[3px] font-semibold text-[24px] border-[#FFC005]">Trending</button>
              <button className="font-semibold text-[#212121] text-[24px] ">Popular</button>
            </div>


            <div className="flex space-x-[11px] ml-auto items-center">
              <div className='bg-[#EBEBEB] rounded-[12px] items-center justify-center w-[137px] h-[38px] flex'>

                <p className='text-[18px] text-center font-medium text-[#292D32] '>Ethereum</p>

                <Icon classes='ml-2 w-[12px] h-[12px]' name='Vector 91.svg' size={20} />
              </div>

              <div className='bg-[#EBEBEB] rounded-[12px] items-center justify-center w-[102px] h-[38px] flex'>

                <p className='text-[18px] text-center font-medium text-[#292D32] '>15hrs</p>

                <Icon classes='ml-2 w-[12px] h-[12px]' name='Vector 91.svg' size={20} />
              </div>

            </div>

          </div>

          <div className="p-[30px]">
            <HotLists len={16} />
          </div>

        </div>

      </div> */}

          {/* images section  */}
          {/* <div className='mt-10'>
        <div className="flex flex-wrap">
          {src.map((src, i) => (
            <Image key={i} unoptimized className="w-[196px] h-[97px] rounded-[11px] mr-[16px] mb-[15px]" alt={src} width={200} height={200} src={'/images/' + src} />
          ))}
        </div>
      </div> */}




          <section className="px-[30px] my-10">

            <div className="bg-[#FFFFFF] shadow-md border border-[#e6e6e6] rounded-[12px] p-6">
              <div className="flex items-center mb-6">
                <p className="text-[32px] font-semibold flex-1">Recently Listed Games</p>
                <Link className="text-[20px] p-0 m-0 text-[#212121]" href={'/'}>
                  See More
                </Link>
              </div>
              {data.length > 0 ? <MostPopular num={6} data={data} /> : <MostPopular />}
            </div>
          </section>





          <Footer />

        </>
      )
    }
  } else {
    // alert('Connect Wallet to view Listed Dapps')
    return <ConnectWallet />
  }
}
