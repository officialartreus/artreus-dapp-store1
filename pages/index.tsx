import Cards from "@/components/Cards";
import Image from "next/image";

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
      <div>
        <div className='hero'>
          {/* <Image alt='' className="w-full h-[480px] z-[-1000]" width={200} height={200} src='/images/Assassin-s_Creed_Valhalla.png' /> */}
        </div>


        <div className='hero2 overflow-hidden ml-[10rem] w-[100%] max-h-[480px]'>
          {/* <Image unoptimized alt='' className="w-[100%] object-cover h-[480px]" width={200} height={200} src='/images/Assassin-s_Creed_Valhalla.png' /> */}
        </div>
        <div className="h-[600px]"></div>
      </div>

      <section className="ml-20">
        <div>
          <p className="text-[32px] font-weight-600 my-2 mb-4">Most Popular Games</p>
          <div className="flex space-x-5 overflow-auto">

            {
              mostPopular.map((game, index) => (
                <Cards key={index} src={game.src} name={game.name} icon={game.icon} />
              ))
            }
          </div>
        </div>

      </section>

    </>
  )
}
