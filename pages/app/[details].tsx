import Image from 'next/image'
import React from 'react'

import heart from '@/public/images/icons/Heart.svg'
import { Icon } from '@/components/Utils'
import AreaChart from '@/components/AppDetails/Chart'

const AppDetails = () => {
	return (
		<div className='ml-20 text-[#7A7A7A]'>

			{/* clear fix */}
			<div className="absolte t-0 h-[80px]"></div>


			<div className='flex space-x-[55px]'>
				<div>
					<Image unoptimized alt='' className="rounded-[20px]  w-[396px] object-cover h-[486px]" width={500} height={200} src='/images/Cyberpunk2077_1.png' />
					<div className='bg-[#FCFCFC] flex rounded-b-[20px] pt-3 w-[270px] h-[62px] mt-[-15px]'>

						<div className='flex space-x-3 m-auto'>
							<div className='flex items-center'>
								<Icon classes='mr-2 ' name='Heart.svg' size={20} />
								<p className='text-[14px]'>244 Likes</p>
							</div>
							<div className='flex items-center'>
								<Icon classes='mr-2' name='share.svg' size={20} />
								<p className='text-[14px]'>12 shares</p>
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='w-[742px] h-[313px] p-[30px] bg-[#FFFFFF] rounded-[24px] flex '>
						<div className='flex-1 space-y-3'>
							<p className="font-meduim text-[14px] text-[#000000]">Created By: <span className='text-[#6039CF]'>Dimension Studios</span></p>
							<p className="font-semibold text-[32px] text-[#000000]">CyberPunk 2077</p>
							<p className='text-[14px]'>The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM. <span className='text-[#6039CF]'>Show more</span></p>

							<div className='flex space-x-6 items-center'>
								<div className='flex flex-col items-center'>
									<div className='flex items-center'>
										<p className='text-[32px] text-[#000000] font-semibold '>4.0</p>
										<Icon classes='ml-1 w-[25px] h-[25px]' name='star-filled.png' size={20} />
									</div>
									<p className='text-[12px]'>Average</p>
								</div>

								<div className='h-[62px] w-0 border border-black'></div>

								<div className='flex flex-col items-center'>
									<div className='flex items-center'>
										<p className='text-[32px] text-[#000000] font-semibold '>17k</p>
									</div>
									<p className='text-[12px]'>Ratings</p>
								</div>

								<div className='h-[62px] w-0 border border-black'></div>

								<div className='flex items-center'>
									<div className='flex items-center'>
										<Icon classes='mr-2 object-contain w-[40px] h-[60px]' name='teenesrb.svg' size={20} />
									</div>

									<div className='flex flex-col '>
										<p className='text-[12px]'>Diverse Content: discretion is advised </p>
										<p className='text-[12px]'>In App Purchases</p>
									</div>
								</div>

							</div>
						</div>

						<div>
							<div className='flex ml-3 space-y-2 flex-col m-auto'>
								<div className='flex items-center'>
									<Icon classes='mr-2 ' name='truck.svg' size={20} />
									<p className='text-[14px]'>2555 Supply</p>
								</div>
								<div className='flex items-center'>
									<Icon classes='mr-2' name='receive-square.svg' size={20} />
									<p className='text-[14px]'>1000 Downloads</p>
								</div>
							</div>
						</div>

					</div>


					<div className='w-[742px] h-[217px] space-y-3 bg-[#FCFCFC] border border-[#e6e6e6] rounded-[16px] flex flex-col overflow-hidden'>

						<div className='flex border-b border-[#E6E6E6] h-[48px] items-center w-[100%] justify-between'>
							<div className='flex-1 text-[16px] uppercase p-5 flex'>
								<Icon classes='mr-2 ' name='notification-icon.svg' size={20} />
								<p>Sale ends February 28, 2023 at 8:55 AM GMT-8</p>
							</div>

							<div className='bg-[#FFC005] items-center flex justify-center w-[42px] h-[48px]'>
								<Icon classes='' name='notification-icon-white.svg' size={20} />
							</div>
						</div>

						<div className='px-5 py-2 justify-between flex'>
							<div className=''>
								<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>Current Price</p>
								<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>15.25 ETH</p>
							</div>
							<div className=''>
								<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>24H Volume</p>
								<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>15.25 ETH</p>
							</div>
							<div className=''>
								<p className='text-[#FF9CBF] tracking-tight  font-medium text-[14px] '>Total Volume</p>
								<p className='text-[#4d4d4d] tracking-tight font-semibold text-[24px] '>15.25 ETH</p>
							</div>
						</div>

						<div className='px-5 flex space-x-3'>
							<div className='bg-[#6039CF] rounded-[12px] w-[280px] h-[48px] flex items-center justify-center'>
								<Icon classes='mr-5' name='document.svg' size={20} />
								<p className='text-[#FFFFFF] text-[16px] font-semibold'>Relist</p>
							</div>

							<div className='bg-[#D3D3D3] rounded-[12px] w-[280px] h-[48px] flex items-center justify-center'>
								<Icon classes='mr-5' name='document.svg' size={20} />
								<p className='text-[#A6A6A6] text-[16px] font-semibold'>Relist</p>
							</div>
						</div>

					</div>

				</div>

			</div>

			<div className='mt-[30px]'>
				<div className='bg-[#FCFCFC] flex space-x-[23px] p-[28px] rounded-[20px] w-[1194px] h-[287px] '>

					<Image unoptimized alt='' className="rounded-[20px]  w-[367px] object-cover h-[230px]" width={500} height={200} src='/images/Cyberpunk2077 8.png' />

					<Image unoptimized alt='' className="rounded-[20px]  w-[367px] object-cover h-[230px]" width={500} height={200} src='/images/Cyberpunk2077 13.png' />

					<Image unoptimized alt='' className="rounded-[20px]  w-[367px] object-cover h-[230px]" width={500} height={200} src='/images/Cyberpunk2077 17.png' />

				</div>
			</div>

			<div className='mt-[30px] space-x-[35px] flex'>

				{/* chart section  */}
				<div className='bg-[#FFFFFF] w-[690px] h-[345px] border border-[#e6e6e6] rounded-[12px] '>

					<div className='w-full flex px-5 h-[50px] border-b border-[#e6e6e6]'>

						<div className='flex-1 items-center flex'>
							<Icon classes='mr-2 ' name='chart.svg' size={20} />
							<p className='text-[16px] font-semibold text-[#212121]'>Price History</p>
						</div>

						<Icon classes='' name='vector 91.svg' size={20} />
					</div>

					<div className='p-5'>

						<div className='bg-[#F0F0F0] p-[4px]  rounded-[6px] items-center ml-auto w-[72px] h-[27px] flex'>

							<p className='text-[16px] text-center font-medium text-[#666666] '>Week</p>

							<Icon classes='ml-2 w-[12px] h-[12px]' name='vector 91.svg' size={20} />

						</div>

						<Icon classes='mt-5 w-[668px] h-[200px]' name='chart-det.svg' size={20} />
					</div>

				</div>
				{/* end of chart section  */}

				{/* listing section  */}
				<div className='bg-[#FFFFFF] w-[470px] h-[345px] border border-[#e6e6e6] rounded-[12px] '>

					<div className='w-full flex px-5 h-[50px] border-b border-[#e6e6e6]'>

						<div className='flex-1 items-center flex'>
							<Icon classes='mr-2 ' name='document-black.svg' size={20} />
							<p className='text-[16px] font-semibold text-[#212121]'>Listing</p>
						</div>

						<Icon classes='' name='vector 91.svg' size={20} />
					</div>


					<div className='bg-[#F5F5F5] w-[424px] h-[239px] flex flex-col items-center justify-center rounded-[12px] m-[23px]'>

						<div>
							<div className='rounded-full flex items-center m-auto w-[64px] h-[64px] bg-[#FFCC37] '>
								<Icon classes='w-[30px] mx-auto' name='group 81.svg' size={20} />
							</div>
							<p className='mt-2'>No Official Listing Yet</p>
						</div>

					</div>

				</div>

			</div>

			{/* ratins and reviews section  */}
			<div>
				<div className='bg-[#FFFFFF] mt-[30px] w-[1197px] h-[470px] border border-[#e6e6e6] rounded-[12px] '>

					<div className='w-full flex px-5 h-[50px] border-b justify-between items-center border-[#e6e6e6]'>

						<p className='text-[16px] font-semibold text-[#212121]'>Ratings and Reviews</p>
						<Icon classes='rotate-[-90deg] ' name='vector 91.svg' size={20} />
					</div>

					{/* rating  */}
					<div className='p-5 px-10 space-x-[33px] flex'>
						<div>
							<p className='text-[50px] text-[#000000] font-semibold '>4.0</p>
							<p className='text-[12px]'>17,567 Ratings</p>
						</div>

						<div className='items-center  flex flex-col'>
							<div className='flex items-center space-x-3 '>
								<p className='flex text-[12px] items-center'>
									5
									<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
								</p>
								<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
									<div className='bg-[#FFC005] w-[150px] h-[8px] rounded-[6px] '></div>
								</div>
							</div>

							<div className='flex items-center space-x-3 '>
								<p className='flex text-[12px] items-center'>
									4
									<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
								</p>
								<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
									<div className='bg-[#FFC005] w-[174px] h-[8px] rounded-[6px] '></div>
								</div>
							</div>

							<div className='flex items-center space-x-3 '>
								<p className='flex text-[12px] items-center'>
									3
									<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
								</p>
								<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
									<div className='bg-[#FFC005] w-[74px] h-[8px] rounded-[6px] '></div>
								</div>
							</div>

							<div className='flex items-center space-x-3 '>
								<p className='flex text-[12px] items-center'>
									2
									<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
								</p>
								<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
									<div className='bg-[#FFC005] w-[31px] h-[8px] rounded-[6px] '></div>
								</div>
							</div>

							<div className='flex items-center space-x-3 '>
								<p className='flex text-[12px] items-center'>
									1
									<Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
								</p>
								<div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
									<div className='bg-[#FFC005] w-[18px] h-[8px] rounded-[6px] '></div>
								</div>
							</div>

						</div>

					</div>

					<div className='flex p-5'>
						{Array(5).fill(true).map((_, i) => (
							<Icon key={i} classes='ml-1 w-[20px] h-[20px]' name='star-nofill.svg' size={20} />
						))}
						<p className='ml-5 text-[#000000] text-[14px]'>How Would you Rate CyberPunk 2077 - Apps and Games</p>
					</div>

					<div className='px-5'>
						<div className='flex items-center'>
							<Icon classes='w-[13px] h-[13px]' name='cup.svg' size={20} />
							<p className='ml-1 text-[12px] text-[#6039CF]'>Most helpful Review</p>
						</div>
					</div>

				</div>
			</div>

		</div>
	)
}

export default AppDetails