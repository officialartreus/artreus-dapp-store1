import React from 'react'
import { Icon } from './Icon'

export const OnlyDeskop = () => {
    return (
        <div className={`pc-only h-[100vh] w-[100vw] flex items-center justify-center`} >
            <div className="w-[45%] p-6 rounded-lg flex flex-col bg-[#000000]">
                <div>
                    <Icon classes='mx-auto w-[30%]' name={'logo-p.svg'} size={35} />
                </div>
                <div className='pt-3 flex justify-center items-center flex-col'>
                    <h3 className='text-white mx-auto text-md font-semibold'>Mobile Not Supported</h3>
                    <p className='text-[#4d4d4d] tracking-tight text-center justify-center font-semibold text-[13px]'>Kindly expand your viewport or use a desktop to use Artreus DappStore</p>
                </div>
            </div>
        </div>

    )
}
