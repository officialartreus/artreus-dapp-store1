import Head from 'next/head'
import Image from 'next/image'

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div>
				<Head>
					<title>Artreus Dapp Store</title>
					<meta name="description" content="Artreus Dapp Store" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div>

			<header>
				<nav className='relative'>
					<div className='navbar w-[100%] py-2 fixed space-x-16 flex a-center justify-end'>

						<div className='flex justify-between bg-[#4D4D4D]  w-[30%] a-center p-2 rounded-xl'>
							<input className='input outline-none bg-transparent' type="text" placeholder='Games / Apps / Assets' />

							<Image src="/images/icons/search-icon.png" alt="search icon" height={20} width={20} />
						</div>

						<div className='flex space-x-5 pr-5 flex a-center'>
							<Image src="/images/icons/profile-circle.png" alt="search icon" height={20} width={20} />
							<Image src="/images/icons/shopping-cart.png" alt="search icon" height={20} width={20} />
							<Image src="/images/icons/chart.png" alt="search icon" height={20} width={20} />
							<Image src="/images/icons/frame 1073.png" alt="search icon" height={20} width={70} />
						</div>
					</div>


					<div className='fixed z-54 w-[65px] h-[100vh] bg-[#212121]'>
						<div className='justify-center'>
							<img src="../images/icons/vector.png" alt="" className='pt-3 w-15 h-15 m-auto' />

						</div>

						<div className="flex mt-16 flex-col">
							<div className='space-y-4'>

								<Image src="/images/icons/Frame 1090.png" alt="search icon" height={40} className='rounded-md shadow-md shadow-brandpink0 w-15  m-auto' width={40} />

								<Image src="/images/icons/Frame 1090_1.png" alt="search icon" height={40} className='w-15 hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' width={40} />

								<Image src="/images/icons/Frame 1091.png" alt="search icon" height={40} className='w-15 hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' width={40} />
							</div>

							<div className='absolute bottom-4 left-5'>
								<Image src="/images/icons/Frame 185.png" alt="search icon" height={26} className='w-15 m-auto' width={26} />
							</div>
						</div>


					</div>
				</nav>
			</header>


			<div>{children}</div>
		</>
	)
}

export default LayoutWrapper