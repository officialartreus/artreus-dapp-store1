import { GridView, ListView } from '@/components/MyApps/Views'
import { Icon } from '@/components/Utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import contract from '../contracts-connector/evm/addresses.json'
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { getMarketAddress } from "@/hooks/selectChain";

import { nearWallet, nft_tokens_for_owner } from '@/contracts-connector/near/near-interface'


const Myapps = () => {
  const [view, setView] = useState('grid')
  const [devData, setDevData] = useState('')
  const [userData, setUserData] = useState('')
  const [data, setData] = useState('')

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount()

  useEffect(() => {
    nearWallet.startUp()
  }, [])

  async function main() {
    let l = []
    if (nearWallet.connected) {
      l = await nft_tokens_for_owner(
        {
          account_id: nearWallet.accountId,
          from_index: "0",
          limit: 10
        }
      )
    }

    try {
      let newerData = l.map(async (e: any) => {
        let a = await fetch("https://ipfs.io/ipfs/" + e.metadata.media, {
          method: 'GET',
          redirect: 'follow'
        })
          .then(response => response.json())
          .catch(error => console.log('error', error));
        // console.log("metadata=>", a)
        return {
          token_id: e.token_id,
          data: a || null
        }
      })

      newerData = await Promise.all(newerData)
      setData(newerData)
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleViewChange = (view: string) => {
    setView(view)
  }

  const { data: readUserData } = useContractRead({
    address: getMarketAddress(chain),
    abi: contract.marketAbi,
    functionName: 'getUserDapps',
    args: [address]
  })

  const { data: readDevData } = useContractRead({
    address: getMarketAddress(chain),
    abi: contract.marketAbi,
    functionName: 'getADevDapps',
    args: [address]
  })

  const getAllDevDapps = async (limit: number) => {
    let newerData = readDevData?.map(async (data: any, index: number) => {
      if (data.uri != '') {
        let a;
        await fetch("https://ipfs.io/ipfs/" + data.uri, {
          method: 'GET',
          redirect: 'follow'
        })
          .then(response => response.json().then(res => {
            a = res
          }))
          .catch(error => console.log('error', error));
        return {
          owner: data.owner,
          nft_contract: data.nft,
          data: a,
          id: data.id
        };
      }
    })

    if (newerData != undefined) {
      newerData = await Promise.all(newerData)
      newerData = newerData.filter((data: any) => data != undefined)
      setDevData(newerData)
    }
  }

  const getAllUserDapps = async (limit: number) => {
    let newerData = readUserData?.map(async (data: any, index: number) => {
      if (data.uri != '') {
        let a;
        await fetch("https://ipfs.io/ipfs/" + data.uri, {
          method: 'GET',
          redirect: 'follow'
        })
          .then(response => response.json().then(res => {
            a = res
          }))
          .catch(error => console.log('error', error));
        return {
          owner: data.owner,
          nft_contract: data.nft,
          data: a,
          id: data.id
        };
      }
    })

    if (newerData != undefined) {
      newerData = await Promise.all(newerData)
      newerData = newerData.filter((data: any) => data != undefined)
      setUserData(newerData)
    }
  }

  console.log(userData)
  useEffect(() => {
    if (nearWallet.connected)
      setTimeout(() => {
        main()
      }, 2000);
    else if (isConnected) {
      getAllUserDapps(20)
      getAllDevDapps(20)
    }
    // else alert("You're not connected")
  }, [readDevData, readUserData, getMarketAddress(chain), isConnected, address])

  return (
    <div className=' border-4 border-red-700 h-[200px]'>
      <div className=' ml-[128px] h-fit mb-[4rem]'>

        <div className="cloud-section p-[26px] mt-[140px] pb-[39px] relative w-[1192px] h-[270px] flex">
          <Image className='w-[690px] absolute left-[-10px] top-[-60px] h-[322px] mb-[20px]' width={20} height={40} src={'/images/Splashes.svg'} alt='Splashes.svg' />
          <p className='text-[#FFFFFF] flex mt-auto ml-auto text-[50px] font-bold '>My Art Space</p>
        </div>

        <div className='relative'>
          <div className='myappballs absolute top-[20px] h-[388px] mt-[40px] w-[388px] rounded-full ml-[-170px]'>
          </div>

          <div className='myappballs absolute left-[70px] top-[330px] h-[215px] w-[215px] rounded-full '>
          </div>

          <div className='myappballs absolute top-[20px] right-[-90px] h-[388px] mt-[40px] w-[388px] rounded-full '>
          </div>

        </div>

        {!data ?
          (
            <div className="absolute flex flex-col top-[440px] myapp w-[1190px] h-fit p-[32px] border-[3px] border-[#FF0660]">

              <div className='bg-[#212121] rounded-[25px] mb-6 w-auto flex h-[40px] items-center justify-center '>
                <p className='text-white'>Listed Dapps</p>
              </div>
              {/* <p className='text-2xl'>Dev Listed Dapps</p> */}
              <div className="flex">
                <div className='bg-[#212121] rounded-[55px] flex h-[40px] w-[108px] items-center justify-center '>
                  <Icon classes='w-[24px] h-[24px] ml-[-10px] mr-[5px]' name='add.svg' size={20} />
                  <p className='text-white'>Add</p>
                </div>

                <div className="flex ml-auto space-x-3 items-center">
                  <button onClick={() => handleViewChange('grid')}>
                    <Icon classes='w-[24px] h-[24px] ' name='element-3.svg' size={20} />
                  </button>

                  <button onClick={() => handleViewChange('list')}>
                    <Icon classes='w-[24px] h-[24px] ' name='row-vertical.svg' size={20} />
                  </button>
                </div>
              </div>

              {view == 'grid' ?
                (devData.length > 0 ? <GridView data={devData} /> : <GridView />) :
                (devData.length > 0 ? <ListView data={devData} /> : <ListView />)
              }

              <div className='bg-[#212121] mt-[4rem] rounded-[25px] mb-6 w-auto flex h-[40px] items-center justify-center '>
                <p className='text-white'>Bought Dapps</p>
              </div>


              {view == 'grid' ?
                (devData.length > 0 ? <GridView data={devData} /> : <GridView />) :
                (devData.length > 0 ? <ListView data={devData} /> : <ListView />)
              }




            </div>
          )
          :
          (
            <div className="absolute flex flex-col top-[440px] myapp w-[1190px] h-[598px] p-[32px] border-[3px] border-[#FF0660]">
              <div className="flex">
                <div className='bg-[#212121] rounded-[55px] flex h-[40px] w-[108px] items-center justify-center '>
                  <Icon classes='w-[24px] h-[24px] ml-[-10px] mr-[5px]' name='add.svg' size={20} />
                  <p className='text-white'>Add</p>
                </div>

                <div className="flex ml-auto space-x-3 items-center">
                  <button onClick={() => handleViewChange('grid')}>
                    <Icon classes='w-[24px] h-[24px] ' name='element-3.svg' size={20} />
                  </button>

                  <button onClick={() => handleViewChange('list')}>
                    <Icon classes='w-[24px] h-[24px] ' name='row-vertical.svg' size={20} />
                  </button>
                </div>
              </div>

              {view == 'grid' ?
                (data.length > 0 ? <GridView data={data} /> : <GridView />) :
                (data.length > 0 ? <ListView data={data} /> : <ListView />)
              }

              <div className='mt-auto ml-auto'>
                <Icon classes='w-[24px] h-[24px]' name='trash.svg' size={20} />
              </div>

            </div>
          )}

        {/* <div className="p-16 h-[1550px]"></div>  */}

      </div>

    </div>
  )
}

export default Myapps