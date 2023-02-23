import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from './Utils/Icon'

const icons = [
	'profile-circle.png',
	'shopping-cart.png',
	'chart.png',
]

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
							<Icon classes='' name='search-icon.png' size={20} />
						</div>

						<div className='flex space-x-5 pr-5 flex a-center'>
							{icons.map((a, b) => (
								<Icon key={b} classes='' name={a} size={20} />
							))}

							<Icon classes='' name={'wallet.png'} size={[20, 70]} />

						</div>
					</div>


					<div className='fixed side-nav z-5104 w-[55px] h-[100vh] bg-[#212121]'>
						<div className='justify-center'>
							<Link href={'/'}>
								<Icon classes='pt-3 m-auto' name={'logo.png'} size={35} />
							</Link>
						</div>

						<div className="flex mt-16 flex-col">
							<div className='space-y-4'>

								<Icon classes='rounded-md shadow-md shadow-brandpink0 w-15  m-auto' name={'market.png'} size={40} />

								<Icon classes='hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' name={'profiles.png'} size={40} />

								<Icon classes='hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' name={'dev.png'} size={40} />

							</div>

							<div className='absolute bottom-4 left-5'>
								<Icon classes='w-15 m-auto' name={'comment.png'} size={26} />
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