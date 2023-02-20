import Image from 'next/image'
import React from 'react'
import { Icon } from './Icon'


type Props = {
	src: string,
	name: string,
	icon: string
}

const Cards = (props: Props) => {

	return (
		<>
			<div className="card rounded-md bg-[#FFFFFF] w-[212px] h-[236px]">
				<div className={`rounded-t-[20px] bg-no-repeat bg-cover bg-center w-[212px] h-[160px] bg-[url(/images/` + props.src + `)]`}>
				</div>
				<div className='p-2'>
					<p className='mb-2 text-[#FF3880] text-lg'>{props.name}</p>
					<div className="flex justify-between ">
						<div className='flex'>
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

export default Cards