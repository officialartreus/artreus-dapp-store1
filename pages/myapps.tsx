import { GridView, ListView } from '@/components/MyApps/Views'
import { Icon } from '@/components/Utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { nearWallet, nft_tokens_for_owner } from '@/contracts-connector/near/near-interface'


const Myapps = () => {
  const [view, setView] = useState('grid')
  const [data, setData] = useState('')

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
      let newerData = l.map(async (e) => {
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

  useEffect(() => {
    main()
  }, [])

  console.log(data)


  const handleViewChange = (view: string) => {
    setView(view)
  }


  return (
    <div className='ml-[128px]'>

      {/* clear fix */}
      <div className="absolte t-0 h-[140px]"></div>

      <div className="cloud-section p-[26px] pb-[39px] relative w-[1192px] h-[270px] flex">
        <Image className='w-[690px] absolute left-[-10px] top-[-60px] h-[322px] mb-[20px]' width={20} height={40} src={'/images/Splashes.svg'} alt='Splashes.svg' />
        <p className='text-[#FFFFFF] flex mt-auto ml-auto text-[50px] font-bold '>My Art Space</p>
      </div>

      <div className='relative h-[520px]'>
        <div className='myappballs absolute top-[20px] h-[388px] mt-[40px] w-[388px] rounded-full ml-[-170px]'>
        </div>

        <div className='myappballs absolute left-[70px] top-[330px] h-[215px] w-[215px] rounded-full '>
        </div>

        <div className='myappballs absolute top-[20px] right-[-90px] h-[388px] mt-[40px] w-[388px] rounded-full '>
        </div>

      </div>




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







      <div className="p-16 h-[150px]"></div>

    </div>
  )
}

export default Myapps