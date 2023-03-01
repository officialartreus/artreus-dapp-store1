import { CountDownSales } from '@/components/BuyNfts/CountDownSales'
import { HotLists } from '@/components/Homepage/HotLists'
import { Footer, Icon } from '@/components/Utils'
import Image from 'next/image'
import React from 'react'

const buynft = () => {
	return (
		<>
			<div className='h-[69px]' />

			<section className="ml-20 relative">
				<div className="cloud-section w-[100%] overflow-hidden h-[312px]">

					<div>
						<Image unoptimized alt='' className=" w-[600px]  h-[300px]" width={200} height={200} src='/images/icons/Clouds.png' />

						<Image unoptimized alt='' className="z-[5] absolute top-0 left-0 w-[300px]  h-[300px]" width={200} height={200} src='/images/icons/head.png' />

						<Image unoptimized alt='' className="z-[7]  absolute top-0 left-[180px] w-[90px]  h-[90px]" width={200} height={200} src='/images/icons/36.png' />

						<Image unoptimized alt='' className=" absolute top-[170px] left-[34px] w-[90px]  h-[90px]" width={200} height={200} src='/images/icons/18.png' />
					</div>

					<div className="absolute top-[32%] right-[10%] ">
						<p className="text-[40px] text-right leading-[60px] text-white font-bold">
							Buy and Sell <br />
							Community Backed <br />
							NFTs
						</p>

					</div>
				</div>
			</section>


			{/* hotlist section  */}
			<div className='mt-10 ml-20'>
				<p className="text-[32px] text-[#4D4D4D] font-semibold my-2 mb-4">Hotlist NFTs</p>

				<div className="w-[1203px] h-[815px] rounded-[24px] border-[2px] border-[#E6E6E6]">

					<div className="border-b h-[69px]  flex px-[30px] ">

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
						<HotLists len={32} />
					</div>

				</div>

			</div>

			{/* Cyberpunk2077_1  */}
			<section className="ml-20 mt-[112px]">
				<div className="relative">
					<Image unoptimized alt='' className="object-center rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[430px]" width={200} height={200} src='/images/Cyberpunk2077_1.png' />

					<div className="absolute top-[43%] left-[43%] ">
						<Icon classes="w-[52px] h-[52px]" name="play-circle.png" size={20} />
					</div>
				</div>
			</section>


			<div className='mt-10 ml-20 mb-[130px]'>
				<div className='flex items-center'>
					<p className="text-[32px] text-[#4D4D4D] font-semibold my-2 mb-4">Countdown Sales</p>

					<div className='bg-[#FFFFFF] rounded-[8px] items-center justify-center w-[113px] h-[40px] flex ml-auto'>

						<p className='text-[18px] text-center font-medium text-[#292D32] '>See All</p>

						<Icon classes='ml-2 w-[12px] h-[12px]' name='Vector 91.svg' size={20} />
					</div>

				</div>

				<div className="w-[1203px] bg-[#FFFFFF] h-[482px] rounded-[24px] border-[2px] border-[#E6E6E6]">

					<div className="border-b h-[69px] pace-x-[32px] flex px-[30px]">

						<div className="space-x-[32px] flex items-end">
							<button className="border-b-[3px] font-semibold text-[24px] border-[#FFC005]">Trending</button>
							<button className="font-semibold text-[#212121] text-[24px] ">Popular</button>
						</div>


						<div className="flex space-x-[11px] ml-auto items-center ">
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
						<CountDownSales len={12} />
					</div>

				</div>

			</div>

			<Footer />
		</>
	)
}

export default buynft
