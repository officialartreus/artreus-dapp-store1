import React from 'react'
import { Icon } from '../Utils'

type Props = {
    num: number;
    rating: string
}
const Ratings = (props: Props) => {
    return (
        <div className='flex items-center space-x-3'>
            <p className='flex text-[12px] items-center'>
                {props.num}
                <Icon classes='ml-1 w-[10px] h-[10px]' name='star-filled.png' size={20} />
            </p>
            <div className='bg-[#D3D3D3] w-[208px] h-[8px] rounded-[6px] '>
                <div className={`bg-[#FFC005] w-[${props.rating}] h-[8px] rounded-[6px] `}></div>
            </div>
        </div>
    )
}

export default Ratings