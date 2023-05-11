import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Icon } from '../Utils'
import { OwnedCards } from '../Utils/Cards'



export const GridView = ({ data }: any) => {
    console.log(data)
    return (
        <div className="flex mt-[34px] gap-[29px]">

            {data ? data.map((data: any, i: number) => {

                const encoded = window.btoa(`${(data.token_id || data.nft_contract)}/${data.id}`)

                return <Link key={i} href={`/app/${encoded}`}>
                    <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={"https://ipfs.io/ipfs/" + data.data?.images_url?.icon} alt={data.data?.name} />
                </Link>
            }) : (
                <div className="flex gap-[29px]">
                    <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/Jurassic_World_Evolution_2_8.jpg'} alt='Jurassic_World_Evolution_2_8' />

                    <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/Jurassic_World_Evolution_2_8.jpg'} alt='Jurassic_World_Evolution_2_8' />

                    <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/GridironCover.png'} alt='GridironCover' />

                    <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/GridironCover.png'} alt='GridironCover' />
                </div>
            )}


            <div className='flex items-center justify-center border border-[#A6A6A6] w-[82px] h-[82px] rounded-[11px]'>
                <Icon classes='w-[24px] h-[24px]' name='add-grey.svg' size={20} />
            </div>

        </div>

    )
}

export const ListView = ({ data }: any) => {
    return (
        <div className="flex  flex-wrap mt-[34px] gap-[29px]">

            {data ? data.map((data: any, i: number) => {
                const encoded = window.btoa(`${data.token_id || data.nft_contract}/${data.id}`)

                return <Link key={i} href={`/app/${encoded}`}>
                    <OwnedCards data={data} />
                </Link>
            }) :
                Array(8).fill(true).map((_, i) => (
                    <OwnedCards key={i} data={''} />
                ))
            }

        </div>


    )
}

