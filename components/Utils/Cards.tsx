import Image from 'next/image'
import Link from 'next/link'
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
						<Link href='/app/cyberpunk'>
							<button className='text-white font-semibold h-[27px] w-[54px] bg-[#212121] rounded-2xl'>Get</button>
						</Link>
					</div>
				</div>

			</div >
		</>
	)
}

export const OwnedCards = () => {

	return (
		<>
			<div className={`rounded-md items-center flex mr-[35px]`}>
				<div >
					<Image className='minicard border-[3px] border-[#FF3880] object-cover w-[72px] h-[72px] ' src={`/images/Magequit_Cover.jpg`} width={212} height={212} alt={''} />
				</div>

				<div className='ml-3 flex space-y-[4px] flex-col '>
					<div>
						<p className='text-[32px] font-semibold text-[#4D4D4D]'>Direct Money Szaz</p>

					</div>
					<div className="flex space-x-2">
						<div className='flex space-x-1 a-center'>
							<p className='text-[#FF3880] text-[12px]'>Assets</p>
							{Array(4).fill(true).map((_, i) => (
								<Icon classes='h-[14px] w-[14px] cursor-pointer' size={12} name='star.svg' key={i} />
							))}
							<Icon classes='h-[14px] w-[14px] cursor-pointer' size={12} name='star-white-nofill.svg' />
						</div>
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
