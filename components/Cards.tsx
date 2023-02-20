import Image from 'next/image'
import React from 'react'
import { Icon } from './Icon'


type Props = {
	src: string,
	name: string,
	icon: string
}

export const MiniCards = () => {

	return (
		<>
			<div className="rounded-md flex w-[261px]">
				<div >
					<Image className='minicard border-[3px] border-[#FF3880] object-cover w-[72px] h-[72px] ' src={`/images/Magequit_Cover.jpg`} width={212} height={212} alt={''} />
				</div>
				<div className='ml-2'>
					<div>
						<p className='text-[16px] font-semibold text-[#4D4D4D]'>Direct Money Szaz</p>
						<p className='text-[#FF3880] text-[12px]'>App / Games</p>

					</div>
					<div className="flex space-x-2">
						<div className='flex space-x-1 a-center'>
							{Array(5).fill(true).map((_, i) => (
								<Icon classes='h-[20px] w-[16px] cursor-pointer' size={12} name='star.png' key={i} />
							))}
						</div>
						<button className='text-white font-semibold h-[27px] w-[54px] bg-[#212121] rounded-2xl'>Get</button>
					</div>
				</div>

			</div >
		</>
	)
}


export const Card = (props: Props) => {

	return (
		<>
			<div className="card rounded-md bg-[#FFFFFF] w-[212px] h-[236px]">
				<div className={`rounded-t-[20px] bg-no-repeat bg-cover bg-center w-[212px] h-[160px] bg-[url(/images/` + props.src + `)]`}>
					<Image className='rounded-t-[20px] w-[212px] h-[160px] ' src={`/images/` + props.src} width={212} height={212} alt={props.src} />
				</div>
				<div className='p-2'>
					<p className='mb-2 text-[#FF3880] text-lg'>{props.name}</p>
					<div className="flex justify-between ">
						<div className='flex space-x-1'>
							{Array(5).fill(true).map((_, i) => (
								<Icon classes='' size={17} name='star.png' key={i} />
							))}
						</div>

						<Icon classes='' size={17} name={`${props.icon}.png`} />

					</div>
				</div>

			</div >
		</>
	)
}
