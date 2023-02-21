import { Card, MiniCards } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import Image from "next/image";
import Hotlist from '../components/Hotlist';
const mostPopular = [
  {
    src: 'A_Plague_Tale_Requiem_1.jpg',
    name: 'Plague Tale Requiem',
    icon: 'game',
  },
  {
    src: 'Crossfire_Legion.jpg',
    name: 'Crossfire Legion',
    icon: 'gamepad',
  },
  {
    src: 'Gamedec.png',
    name: 'Gamedec',
    icon: 'gamepad',
  },
  {
    src: 'Assassin-s_Creed_Valhalla.png',
    name: 'Assassin`s Creed Valhalla',
    icon: 'gamepad',
  },
  {
    src: 'HordeCore.jpg',
    name: 'HordeCore',
    icon: 'gamepad',
  },
  {
    src: 'Kitaria_Fables_2.jpg',
    name: 'Kitaria Fables',
    icon: 'gamepad',
  },

]

export default function Home() {
  return (
    <>
      <div className="ml-[3rem]">
        <div className='hero'>
          {/* <Image alt='' className="w-full h-[480px] z-[-1000]" width={200} height={200} src='/images/Assassin-s_Creed_Valhalla.png' /> */}
        </div>


        <div className='hero2 overflow-hidden m-auto w-[100%] max-h-[480px]'>
          {/* <Image unoptimized alt='' className="w-[100%] object-cover h-[480px]" width={200} height={200} src='/images/Assassin-s_Creed_Valhalla.png' /> */}
        </div>
        <div className="h-[180px]"></div>
      </div>

      <section className="ml-20">
        <div>
          <p className="text-[32px] font-semibold my-2  mb-4">Most Popular Games</p>
          <div className="flex space-x-5 ">

            {
              mostPopular.map((game, index) => (
                <Card key={index} src={game.src} name={game.name} icon={game.icon} />
              ))
            }
          </div>
        </div>

      </section>

      <section className="ml-20 mt-10">
        <div>
          <p className="text-[32px] font-semibold my-2 mb-4">Recently Added</p>
          <div className="flex flex-wrap gap-[10px]">
            {Array(16).fill(true).map((val, i) => {
              return (
                <MiniCards key={i} />
              )
            })}
          </div>
        </div>
      </section>

      <section className="ml-20 mt-[70px]">
        <div className="relative">
          <Image unoptimized alt='' className="rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[300px]" width={200} height={200} src='/images/Battle.png' />
          <div className="absolute top-[17%] left-[10%] ">
            <p className="text-[50px] leading-[60px] text-white font-bold">
              Purchase and Sell <br />
              in Game assets
            </p>

            <div className="flex mt-6 w-fit p-1 px-3 bg-[#F5F5F5] rounded-[55px]">
              <Icon classes='text-white h-[25px] w-[24px]' size={23} name='shop.png' />
              <p className="ml-[5px] text-xl">Buy Assets</p>
            </div>

          </div>
        </div>
      </section>

      <section className="ml-20 mt-10">
        <div>
          <p className="text-[32px] font-semibold my-2 mb-4">Hot Assets</p>
          <div className="flex flex-wrap gap-[10px]">
            {Array(16).fill(true).map((val, i) => {
              return (
                <MiniCards key={i} />
              )
            })}
          </div>
        </div>
      </section>

      <section className="ml-20 mt-[70px]">
        <div className="relative">
          <Image unoptimized alt='' className="object-center rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[430px]" width={200} height={200} src='/images/Cyberpunk2077_1.png' />
          <div className="absolute top-[43%] left-[43%] ">
            <Icon classes="w-[52px] h-[52px]" name="play-circle.png" size={20} />
          </div>
        </div>
      </section>

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
      <Hotlist/>

    </>
  )
}
