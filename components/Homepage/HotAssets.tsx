import React from 'react'
import { MiniCards } from '../Utils'


type Props = {
    len: number
}

export const HotAssets = (props: Props) => {
    return (
        <div>
            <section className="">
                <div className="flex flex-wrap gap-[15px]">
                    {Array(props.len).fill(true).map((val, i) => {
                        return (
                            <MiniCards key={i} />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
