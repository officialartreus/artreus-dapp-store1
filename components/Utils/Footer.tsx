import React from 'react'
import { Icon } from './Icon'

export const Footer = () => {

	const social = ['twitter', 'instagram', 'discord', 'telegram', 'youtube']

	return (
		<div className="bg-[#FFFFFF] flex w-[1440px] h-[460px] p-[97px] pl-[130px]">

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

			<div className='mt-[57px] ml-auto flex space-x-[66px]'>
				<div className='space-y-[26px]'>
					<p className="font-semibold text-[24px]">Marketplace</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Explore</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Blog</p>
					<p className="font-medium text-[#6039CF] text-[16px]">How it works</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Jobs</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Help Center</p>

				</div>

				<div className='space-y-[26px]'>
					<p className="font-semibold text-[24px]">Dapp Store</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Apps</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Games</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Blog</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Jobs</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Help Center</p>

				</div>

				<div className='space-y-[26px]'>
					<p className="font-semibold text-[24px]">Creators</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Quick start</p>
					<p className="font-medium text-[#6039CF] text-[16px]">JS SDK</p>
					<p className="font-medium text-[#6039CF] text-[16px]">UI Kit</p>
					<p className="font-medium text-[#6039CF] text-[16px]">The Graph</p>
					<p className="font-medium text-[#6039CF] text-[16px]">Resources</p>

				</div>

			</div>

		</div>
	)
}
