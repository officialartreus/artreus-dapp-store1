
import { Icon } from "@/components/Utils/Icon";
import Image from "next/image";
import { Hero, HotAssets, MostPopular } from "@/components/Homepage";
import Link from "next/link";
import { HotLists } from "@/components/Homepage/HotLists";
import { Footer } from "@/components/Utils";

import { get_sales_by_nft_contract_id, nearWallet, nft_tokens } from '../contracts-connector/near/near-interface'
import { useEffect, useState } from "react";
import { NEAR_MARKETPLACE_ADDRESS } from "@/config/constants";



export default function Home() {
  const [data, setData] = useState([]);

  async function main() {
    let l = []
    l = await get_sales_by_nft_contract_id({
      nft_contract_id: 'newminter.danieldave.testnet',
      from_index: "0",
      limit: 200,
      contractId: NEAR_MARKETPLACE_ADDRESS
    })

    try {
      l = l.reverse()

      let newerData = l.map(async (e: any) => {

        try {
          let m = []
          try {
            m = await nft_tokens({
              from_index: e.token_id,
              limit: 1
            })
          } catch (error) {
            console.log(error)
          }

          let a;
          await fetch("https://ipfs.io/ipfs/" + m[0].metadata.media, {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json().then(res => a = res))
            .catch(error => console.log('error', error));

          return {
            id: e.token_id,
            data: a,
            price: e.sale_conditions,
            owner_id: e.owner_id
          }

        } catch (e) {
          console.log(e)
        }

      })

      newerData = await Promise.all(newerData)
      setData(newerData)
    } catch (e) {
      console.log(e)
    }
  }

  // console.log(!data.data)

  useEffect(() => {
    setTimeout(() => {
      main()
    }, 2000);
  }, [])

  useEffect(() => {
    nearWallet.startUp()
  }, [])


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


  return (
    <>
      <Hero />

      {/* most popular  */}
      <section className="ml-20">
        <div>
          <p className="text-[32px] font-semibold my-2  mb-4">Most Popular Games</p>
        </div>
        {data.length > 1 && <MostPopular data={data} />}
      </section>

      {/* recently added  */}
      <div className='mt-10 ml-20'>
        <p className="text-[32px] font-semibold my-2 mb-4">Recently Added</p>
        <HotAssets len={12} />
      </div>

      {/* Purchase and Sell  */}
      <section className="ml-20 mt-[70px]">
        <div className="relative">
          <Image unoptimized alt='' className="rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[300px]" width={200} height={200} src='/images/Battle.png' />
          <div className="absolute top-[17%] left-[10%] ">
            <p className="text-[50px] leading-[60px] text-white font-bold">
              Purchase and Sell <br />
              in Game assets
            </p>
            <Link href={'/buyassets'}>
              <div className="flex mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
                <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
                <p className="ml-[5px] text-xl">Buy Assets</p>
              </div>
            </Link>


          </div>
        </div>
      </section>

      {/* hot assets  */}
      <div className='mt-10 ml-20'>
        <p className="text-[32px] font-semibold my-2 mb-4">Hot Assets</p>
        <HotAssets len={12} />
      </div>

      {/* Cyberpunk2077_1  */}
      <section className="ml-20 mt-[70px]">
        <div className="relative">
          <Image unoptimized alt='' className="object-center rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[430px]" width={200} height={200} src='/images/Cyberpunk2077_1.png' />
          <div className="absolute top-[43%] left-[43%] ">
            <Icon classes="w-[52px] h-[52px]" name="play-circle.png" size={20} />
          </div>
        </div>
      </section>

      {/* Buy and Sell NFTs section  */}
      <section className="ml-20 relative mt-[70px]">
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

            <Link href={'/buynft'}>
              <div className="flex ml-auto object-right mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
                <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
                <p className="ml-[5px] text-xl">Buy NFTs</p>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* Hotlists nfts section  */}
      <div className='mt-10 ml-20'>
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

      </div>

      {/* images section  */}
      <div className='mt-10'>
        <div className="flex flex-wrap">
          {src.map((src, i) => (
            <Image key={i} unoptimized className="w-[196px] h-[97px] rounded-[11px] mr-[16px] mb-[15px]" alt={src} width={200} height={200} src={'/images/' + src} />
          ))}
        </div>
      </div>


      <div className='mt-10 ml-20'>

        <div className="mt-[45px]">
          <p className="text-[32px] text-[#4D4D4D] font-semibold my-2  mb-4">Top Nfts</p>
          <MostPopular />
        </div>

        <div className="mt-[45px]">
          <p className="text-[32px] text-[#4D4D4D] font-semibold my-2  mb-4">Nft Games</p>
          <MostPopular />
        </div>

        <div className="mt-[45px]">
          <p className="text-[32px] text-[#4D4D4D] font-semibold my-2  mb-4">Nft Apps</p>
          <MostPopular />
        </div>

      </div>

      <div className="h-[110px]"></div>

      <Footer />

    </>
  )
}
