import Cards from "@/components/Cards";

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
      <div className='hero'>
      </div>
      <div className='hero2'>
      </div>
      <div className="h-[600px]"></div>

      <section className="ml-20">
        <div>
          <p className="text-[32px] font-weight-600 my-2 mb-4">Most Popular Games</p>
          <div className="flex space-x-5">

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
