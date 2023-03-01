import React from 'react'
import { Icon } from './Icon'

export const Footer = () => {

	const social = ['twitter', 'instagram', 'discord', 'telegram', 'youtube']

	return (
		<div className="bg-[#FFFFFF] w-[1440px] h-[460px] pt-[97px] px-[166px]">

			<div className="flex flex-col">
				<div className="mb-[107px]">
					<Icon classes='ml-2 w-[227px] h-[35px]' name='logo-text.svg' size={20} />
				</div>

				<div className="mb-[66px] space-y-[12px]">
					<p className="font-semibold text-[16px]">Get the latest Artreus updates</p>

					<div className="bg-[#212121] bg-opacity-10 rounded-[12px] flex w-[330px] h-[44px] overflow-hidden items-center">
						<input className="pl-[12px] outline-none bg-transparent text-[#A6A6A6]" type="text" />

						<button className="bg-[#6039CF] w-[87px] h-[36px] items-center justify-center ml-auto flex mr-[4px] rounded-[8px]">I`m in</button>
					</div>

				</div>

				<div>
					<p className="font-semibold text-[16px]">Join Artreus Community</p>
					<div className='flex space-x-[31px] mt-[18px]'>
						{social.map((social, index) => (
							<Icon key={index} classes='ml-2 w-[19px] h-[19px]' name={social + '.svg'} size={20} />
						))}
					</div>
				</div>
			</div>

			<div>

			</div>

		</div>
	)
}
