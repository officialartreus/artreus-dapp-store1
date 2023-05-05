import Image from 'next/image'
import React from 'react'
import { Icon } from '../Utils'

type Props = {
    icon: string;
    name: string;
    img1: string;
    img2: string;
}

const MostPopularAssets = (props: Props) => {

    const { name, img1, img2, icon } = props


    return (
        <>
            <div className="text-[#4D4D4D]">
                <div className=" bg-white w-[515px] shadowPA h-[334px] p-[28px] rounded-[24px]">
                    <div className='flex flex-row '>
                        <div>
                            <Image alt='call of duty' src={'/images/' + icon} height={200} width={200} className='w-[72px] h-[72px] rounded-[16px] shadowPA p-1 border-[#FF3880] border-[3px] object-contain' unoptimized />
                        </div>

                        <div className='pl-2'>
                            <p className='font-semibold text-[32px]'>
                                {name}
                            </p>

                            <div className='flex space-x-2'>
                                <p className='font-light text-[14px] text-[#FF6AA0]'>
                                    Assets
                                </p>

                                <div className='flex space-x-1 a-center'>
                                    {Array(5).fill(true).map((_, i) => (
                                        <Icon classes='h-[20px] w-[16px] cursor-pointer' size={12} name='star-filled.png' key={i} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex py-8'>
                        <Image alt='call of duty' src={'/images/' + img1} height={200} width={200} className='w-[233px] h-[126px] rounded-[27px] shadowPA p-1 object-cover' unoptimized />

                        <Image alt='call of duty' src={'/images/' + img2} height={200} width={200} className='w-[233px] h-[126px] rounded-[27px] shadowPA p-1 object-cover' unoptimized />

                    </div>

                    <div className='flex justify-end mr-auto'>
                        <p>Show all</p>
                        <Icon classes='ml-2' name='arrow-up.png' size={20} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MostPopularAssets