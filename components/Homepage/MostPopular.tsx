import Link from "next/link"
import { Card } from "../Utils"


type Game = {
    src: string,
    name: string,
    icon: string
}

type GameData = {
    data: []
}[]


export const MostPopular = ({ data, num }: any) => {

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
    let count = 0

    return (
        <div>
            <div className="grid grid-cols-4 lg:grid-cols-5 pc:grid-cols-6 gap-6 ">
                {data ? data.map((datas: any, i: number) => {
                    const encoded = window.btoa(`${datas.nft_contract}/${datas.id}/${datas.chainId}`)

                    const { data } = datas
                    if (!data?.images_url.icon) return
                    if (count == num) return
                    count++

                    return <Link key={i} target="_blank" href={`/app/${encoded}`}>
                        <Card key={i} src={`https://ipfs.io/ipfs/${data.images_url?.icon}`} name={data.name} icon={'game'} />
                    </Link>
                })
                    :
                    mostPopular.map((game: Game, index: number) => (
                        <Card key={index} src={'/images/' + game.src} name={game.name} icon={game.icon} />
                    ))
                }
            </div>
        </div>
    )
}


