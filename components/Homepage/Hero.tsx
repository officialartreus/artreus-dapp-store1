import Image from 'next/image'
import React from 'react'

export const Hero = () => {
    return (
        <div>
            {/* hero section  */}
            <div className="ml-[3rem]">
                <div className='hero'>
                </div>

                <div className='hero2 overflow-hidden m-auto w-[100%] max-h-[480px]'>
                </div>
                <div className="h-[160px]"></div>
            </div>

            {/* four dots and banner images  */}
            <section className="">

                {/* four dots  */}
                <div className="absolute flex space-x-2 top-[510px] left-[30%] ">
                    <span className="w-[30px] h-[10px] bg-white rounded-[6px] "> </span>
                    <span className="w-[10px] h-[10px] bg-white rounded-[6px] "> </span>
                    <span className="w-[10px] h-[10px] bg-white rounded-[6px] "> </span>
                    <span className="w-[10px] h-[10px] bg-white rounded-[6px] "> </span>
                </div>

                {/* banner images below hero  */}
                <div className="absolute flex space-x-4 top-[465px] left-[45%] ">
                    <div className="flex space-x-2">
                        <Image unoptimized alt='' className="rounded-[20px] border-[3px] border-[#FF3880] w-[270px] object-cover h-[140px]" width={200} height={200} src='/images/Scott_Pilgrim_vs_The_World.jpg' />

                        <Image unoptimized alt='' className="rounded-[20px] border-[3px] border-[#FF3880] w-[270px] object-cover h-[140px]" width={200} height={200} src='/images/Jurassic_World_Evolution_2_8.jpg' />

                        <Image unoptimized alt='' className="rounded-[20px] border-[3px] border-[#FF3880] w-[270px] object-cover h-[140px]" width={200} height={200} src='/images/Gamedec-1.png' />
                    </div>
                </div>
            </section>
        </div>
    )
}
