import React from 'react'
import {MiniCards} from '../Cards'
function HotList() {
     
  return (
    <div className='ml-20 mt-[70px]'>
        <p className='font-[600] font-inter text-[32px] leading-[40px] text-[#4D4D4D]'>Hotlist NFTs</p>
       <div className='border border-[#E6E6E6] p-[40px] rounded-[24px] mt-[20px]'>
        <div></div>
       <div className="grid grid-cols-4 gap-[10px]">
            {Array(12).fill(true).map((val, i) => {
              return (
                <MiniCards key={i} />
              )
            })}
          </div>
       </div>
    </div>
  )
}

export default HotList