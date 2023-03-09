import { nearWallet } from '@/contracts-connector/near/near-interface'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Icon } from './Utils/Icon'

const icons = [
	'profile-circle.png',
	'shopping-cart.png',
	'chart.png',
]

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

	useEffect(() => {
		nearWallet.startUp()
	}, [])

	const handleConnectButton = () => {
		try {
			!nearWallet.connected ? nearWallet.signIn() : nearWallet.signOut()
		} catch (err) {
			console.log(err)
		}
	}

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
					<div className='navbar w-[100%] fixed '>

						<div className='space-x-16 flex a-center justify-end bg-[#212121] py-2'>

							<div className='flex justify-between bg-[#4D4D4D]  w-[30%] a-center p-2 rounded-xl'>
								<input className='input outline-none bg-transparent' type="text" placeholder='Games / Apps / Assets' />
								<Icon classes='' name='search-icon.png' size={20} />
							</div>

							<div className='flex space-x-5 pr-5 flex a-center'>
								{icons.map((a, b) => (
									<Icon key={b} classes='' name={a} size={20} />
								))}

								<div onClick={handleConnectButton}>

									<Icon classes='' name={'wallet.png'} size={[20, 70]} />
								</div>

							</div>
						</div>
					</div>


					<div className='fixed side-nav z-5104 w-[55px] h-[100vh] bg-[#212121]'>
						<div className='justify-center'>
							<Link href={'/'}>
								<Icon classes='pt-3 m-auto' name={'logo.svg'} size={35} />
							</Link>
						</div>

						<div className="flex mt-16 flex-col">
							<div className='space-y-4'>

								<Icon classes='rounded-md shadow-md shadow-brandpink0 w-15  m-auto' name={'market.png'} size={40} />

								<Link href={'/myapps'} className='' >
									<Icon classes='hover:rounded-md hover:shadow-md mt-[10px] hover:shadow-brandpink0 m-auto' name={'profiles.png'} size={40} /></Link>

								<Icon classes='hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' name={'dev.png'} size={40} />

							</div>

							<div className='absolute space-y-[20px] bottom-4 left-3'>
								<Icon classes='w-[24px] m-auto' name={'comment.png'} size={26} />
								<Icon classes='w-[24px] m-auto' name={'information.svg'} size={26} />
							</div>
						</div>


					</div>
				</nav>
			</header>


			<div>{children}</div>


			<div className="bg-[#FFFFFF] pt-[69px] w-[1440px] ">
				<div className="border-t ml-20 border-[#FF0660] w-[1270px]" />

				<div className="flex items-center h-[48px] justify-center space-x-[15px]">
					<p className="text-[#5D50C6] text-[12px]">Copyright 2022 Artreus.</p>
					<p className="text-[#5D50C6] text-[12px]">All right reserved</p>
					<p className="text-[#5D50C6] text-[12px]">Terms</p>
					<p className="text-[#5D50C6] text-[12px]">Privacy policy</p>

				</div>

			</div>
		</>
	)
}

export default LayoutWrapper