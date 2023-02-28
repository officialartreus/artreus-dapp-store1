
import { Icon } from "@/components/Utils/Icon";
import Image from "next/image";
import { Hero, HotAssets, MostPopular } from "@/components/Homepage";
import Link from "next/link";



export default function Home() {
  return (
    <>
      <Hero />

      <section className="ml-20">
        <div>
          <p className="text-[32px] font-semibold my-2  mb-4">Most Popular Games</p>
        </div>
        <MostPopular />
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

            <div className="flex ml-auto object-right mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
              <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
              <p className="ml-[5px] text-xl">Buy NFTs</p>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}
