import { nearWallet } from '@/contracts-connector/near/near-interface'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ConnectModal, CustomButton } from './Utils'
import { Icon } from './Utils/Icon'

import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import UAuth, { UserInfo } from '@uauth/js'


const icons = [
  ['profile-circle.png', '/myapss'],
  ['shopping-cart.png', '/'],
  ['chart.png', '/'],
]

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [connected, setConnected] = useState(false)

  const [useRBK, setUseRBK] = useState(false)
  const [udUser, setUdUser] = useState<UserInfo>()
  const [nearUserText, setNearUserText] = useState('')

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { address, isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()

  const walletId = nearWallet.accountId

  const [uDauth, setUDauth] = useState<UAuth>()
  useEffect(() => {
    const uDauth = new UAuth({
      clientID: "37a2f337-c4b9-465d-86df-efa58498ac20",
      redirectUri: `${location.href}`,
      scope: "openid wallet email profile:optional social:optional"
    })
    setUDauth(uDauth)
  }, [])

  useEffect(() => {
    nearWallet.startUp()
  }, [])

  const handleConnectButton = () => {

    async function check() {
      if (!connected) {
        setSelected(null)
        setIsOpen(true)
        return
      } else if (connected) {
        if (nearWallet.connected) {
          nearWallet.signOut()
        }
        if (isConnected) {
          disconnectAsync()
        }
        if (udUser != undefined && uDauth != undefined) {
          await uDauth.logout()
          location.reload()
        }
        setConnected(false)
        setSelected(null)
        return
      }

      setSelected(null)
      setIsOpen(true)
    }

    check()
  }


  useEffect(() => {
    async function login() {
      if (selected == 'RBK' && !isConnected) {
        if (openConnectModal) {
          openConnectModal()
        } else {
          alert('Please try again')
        }
      }

      if (selected == 'UD' && udUser == undefined && uDauth != undefined) {
        try {
          await uDauth.loginWithPopup()
          location.reload()
        } catch (error) {
          console.log(error)
        }
      }

      if (selected == 'NEAR' && !nearWallet.connected) {
        try {
          nearWallet.signIn()
        } catch (err) {
          console.log(err)
        }
      }
    }

    login()
  }, [selected])


  useEffect(() => {
    if (nearWallet.connected && walletId != undefined) {
      setNearUserText(`${walletId.slice(0, 4)}...${walletId.slice(-3)}`)
    }
    if (udUser != undefined) {
      setNearUserText(`${udUser.sub.slice(0, 4)}...${udUser.sub.slice(-3)}`)
    }

    if (isConnected || udUser != undefined || nearWallet.connected) {
      setConnected(true)
    } else {
      setConnected(false)
    }
  }, [nearWallet.connected, udUser, isConnected])


  useEffect(() => {
    if (uDauth != undefined && udUser == undefined) {
      try {
        uDauth.user()
          .then((user) => {
            setUdUser(user)
          })
          .catch((e) => {
            console.log(e)
          })
      } catch (err) {
        // console.log(err)
      }
    }
  }, [uDauth])


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
                <Icon classes='' name='search-icon.png' size={20} />
                <input className='input outline-none bg-transparent' type="text" placeholder='Games / Apps / Assets' />
              </div>

              <div className='flex space-x-5 pr-5 flex a-center'>
                {icons.map((a, b) => (
                  <Link key={b} href={a[1]}>
                    <Icon classes='' name={a[0]} size={20} />
                  </Link>
                ))}

                <div >
                  {isConnected ?
                    <CustomButton /> :
                    (<button onClick={handleConnectButton} type="button" className='flex text-white bg-[#6039CF] hover:bg-[#8061D9] h-[38px] items-center rounded-[8px] gap-[8px] px-[12px] '>
                      {connected ? (
                        <Icon classes='' name={'link-square.svg'} size={[24, 24]} />
                      ) : (
                        <Icon classes='' name={'wallet-2.svg'} size={[24, 24]} />
                      )}
                      <p className="normal-case">
                        {connected ? nearUserText : 'Wallet'}
                      </p>
                    </button>)
                  }


                  {/* <Icon classes='' name={'wallet.png'} size={[20, 70]} /> */}
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

                <Link href={'/'}>
                  <Icon classes='rounded-md shadow-md shadow-brandpink0 w-15  m-auto' name={'market.png'} size={40} />
                </Link>

                <Link href={'/myapps'} className='' >
                  <Icon classes='hover:rounded-md hover:shadow-md mt-[10px] hover:shadow-brandpink0 m-auto' name={'profiles.png'} size={40} />
                </Link>

                <Link href={'/dev'}>
                  <Icon classes='hover:rounded-md hover:shadow-md hover:shadow-brandpink0 m-auto' name={'dev.png'} size={40} />
                </Link>


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
      <ConnectModal isOpen={isOpen} setSelected={setSelected} setIsOpen={setIsOpen} />
    </>
  )
}

export default LayoutWrapper