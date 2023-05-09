import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Icon } from './Icon'


type Props = {
	src: string,
	name: string,
	icon: string
}

export const HotListCard = () => {

	return (
		<>
			<div className="rounded-md  flex mr-[64px] mb-[20px]">

				<div className="rounded-[16px] flex border-[2px] border-[#FFC005] bg-[#C4C4C4] h-[56px] w-[56px]">
				</div>

				<div className='ml-2'>
					<div className='flex flex-col'>
						<Link href={'/app/hotlist'}>
							<p className='text-[20px] font-semibold text-[#4D4D4D]'>Pain and Glory</p>
						</Link>

						<div className='flex space-x-[20px]'>
							<div>
								<p className='text-[#7A7A7A] text-[12px]'>Floor price</p>
								<p className='text-[#8061D9] text-[14px]'>15.25 ETH</p>
							</div>

							<div>
								<p className='text-[#7A7A7A] text-[12px]'>Volume <span className='text-[#029507]'>+36%</span></p>
								<p className='text-[#8061D9] text-[14px]'>1234 ETH</p>
							</div>


						</div>


					</div>

				</div>

			</div >
		</>
	)
}

export const CountDownCard = () => {

	return (
		<>
			<div className="rounded-md  flex mr-[43px] mb-[20px]">

				<div className="rounded-[16px] flex bg-[#A7A7A7] h-[56px] w-[56px]">
				</div>

				<div className='ml-2'>
					<div className='flex flex-col'>
						<Link href={'/app/game'}>
							<p className='text-[20px] font-semibold text-[#000000]'>Direct Money Szaz</p>
						</Link>

						<p className='text-[14px] font-medium text-[#FF0660]'>12hr 36mins 15 sec</p>

						<div className='flex space-x-[20px]'>
							<div>
								<p className='text-[#000000] text-[12px]'>Floor price</p>
								<p className='text-[#000000] font-semibold text-[14px]'>15.25 ETH</p>
							</div>

							<div>
								<p className='text-[#000000] text-[12px]'>Volume <span className='text-[#029507]'>+36%</span></p>
								<p className='font-semibold text-[#000000] text-[14px]'>1234 ETH</p>
							</div>


						</div>


					</div>

				</div>

			</div >
		</>
	)
}

export const MiniCards = ({ data }: any) => {
	if (data) {
		if (!data.data.images_url?.icon) return
		const encoded = window.btoa(`${data.token_id || data.nft_contract}/${data.id}`)
		return (
			<div>
				<div className="rounded-md flex w-[261px]">
					<div >
						<Image className='minicard border-[3px] border-[#FF3880] object-cover w-[72px] h-[72px] ' src={`https://ipfs.io/ipfs/${data.data?.images_url?.icon}`} width={212} height={212} alt={''} />
					</div>
					<div className='ml-2'>
						<div>
							<Link href={`app/${encoded}`}>
								<p className='text-[16px] font-semibold text-[#4D4D4D]'>{data.data.name}</p>
							</Link>
							<p className='text-[#FF3880] text-[12px]'>App / Games</p>

						</div>
						<div className="flex space-x-2">
							<div className='flex space-x-1 a-center'>
								{Array(5).fill(true).map((_, i) => (
									<Icon classes='h-[20px] w-[16px] cursor-pointer' size={12} name='star.png' key={i} />
								))}
							</div>
							<Link href={`app/${encoded}`}>
								<button className='text-white font-semibold h-[27px] w-[54px] bg-[#212121] rounded-2xl'>Get</button>
							</Link>
						</div>
					</div>

				</div >
			</div>
		)
	}

	return (
		<>
			<div className="rounded-md flex w-[261px]">
				<div >
					<Image className='minicard border-[3px] border-[#FF3880] object-cover w-[72px] h-[72px] ' src={`/images/Magequit_Cover.jpg`} width={212} height={212} alt={''} />
				</div>
				<div className='ml-2'>
					<div>
						<Link href={'/app/games'}>
							<p className='text-[16px] font-semibold text-[#4D4D4D]'>Direct Money Szaz</p>
						</Link>
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

export const OwnedCards = ({ data }: any) => {
	if (data) {
		return (
			<>
				<div className={`rounded-md items-center flex mr-[35px]`}>
					<div >
						<Image className='minicard border-[3px] border-[#FF3880] object-cover w-[72px] h-[72px] ' src={"https://ipfs.io/ipfs/" + data.data?.images_url?.icon} alt={data.data?.name} width={212} height={212} />
					</div>

					<div className='ml-3 flex space-y-[4px] flex-col '>
						<div>
							<p className='text-[32px] font-semibold text-[#4D4D4D]'>{data.data?.name}</p>

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
				<div className={`rounded-t-[20px] bg-no-repeat bg-center w-[212px] h-[160px] bg-[url(/images/` + props.src + `)]`}>
					<Image unoptimized className='rounded-t-[20px] w-[212px] h-[160px] ' src={props.src} width={212} height={212} alt={props.src} />
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
