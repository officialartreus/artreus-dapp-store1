
import MostPopularAssets from '@/components/BuyAssests/MostPopularAssets'
import { HotAssets } from '@/components/Homepage'
import Image from 'next/image'
import React from 'react'

const BuyAssets = () => {

	const mostPopularAssets = [
		{
			name: 'Call Of Duty',
			icon: 'callofduty.png',
			img1: 'Call_of_Duty_Ghosts_MSBS_05.jpg',
			img2: '8975972482_6ab9cacdbb_b.jpg'
		},
		{
			name: 'Minecraft',
			icon: 'minecraft.png',
			img1: '_tpYYwhnwvMF69Zg0AfXnSxWAGI8GL2hdBRvNpL44wk.webp',
			img2: '_tpYYwhnwvMF69Zg0AfXnSxWAGI8GL2hdBRvNpL44wk.webp'
		},
		{
			name: 'Call Of Duty',
			icon: 'callofduty.png',
			img1: 'Call_of_Duty_Ghosts_MSBS_05.jpg',
			img2: '8975972482_6ab9cacdbb_b.jpg'
		},
	]

	return (
		<div className=''>
			<section className="ml-20">
				<div className="relative absolute top-[85px]">
					<Image unoptimized alt='' className="rounded-[30px] border-[3px] border-[#FF3880] w-[100%] object-cover h-[300px]" width={500} height={200} src='/images/Battle.png' />

					<div className="absolute top-[27%] left-[10%] ">
						<p className="text-[50px] leading-[60px] text-white font-bold">
							Purchase and Sell <br />
							in Game assets
						</p>

					</div>

				</div>
			</section>

			<div className='mt-[120px] ml-20'>
				<p className="text-[32px] font-semibold my-2 mb-4">Hot Assets</p>
				<HotAssets len={40} />
			</div>

			<div className="ml-20">
				<div className="my-5 mt-16 text-[#4D4D4D]">
					<p className='font-semibold text-[32px]'>
						Most Popular Assets
					</p>
				</div>
				<div className="flex space-x-4">
					{mostPopularAssets.map((asset, index) => (
						<MostPopularAssets key={index} name={asset.name} img1={asset.img1} img2={asset.img2} icon={asset.icon} />
					))}
				</div>
			</div>

			<div className='mt-10 ml-20'>
				<p className="text-[32px] font-semibold my-2 mb-4">New Releases</p>
				<HotAssets len={40} />
			</div>
		</div>
	)
}

export default BuyAssets
