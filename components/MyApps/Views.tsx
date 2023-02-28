import Image from 'next/image'
import React from 'react'
import { Icon } from '../Utils'
import { OwnedCards } from '../Utils/Cards'

export const GridView = () => {
    return (

        <div className="flex mt-[34px] gap-[29px]">

            <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/Jurassic_World_Evolution_2_8.jpg'} alt='Jurassic_World_Evolution_2_8' />

            <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/GridironCover.png'} alt='GridironCover' />

            <Image className='w-[82px] h-[82px] rounded-[11px] image-center' unoptimized width={20} height={40} src={'/images/GridironCover.png'} alt='GridironCover' />

            <div className='flex items-center justify-center border border-[#A6A6A6] w-[82px] h-[82px] rounded-[11px]'>
                <Icon classes='w-[24px] h-[24px]' name='add-grey.svg' size={20} />
            </div>

        </div>

    )
}

export const ListView = () => {
    return (
        <div className="flex flex-wrap mt-[34px] gap-[29px]">

            <OwnedCards />
            <OwnedCards />
            <OwnedCards />
            <OwnedCards />
            <OwnedCards />
            <OwnedCards />
            <OwnedCards />
            <OwnedCards />

        </div>


    )
}

