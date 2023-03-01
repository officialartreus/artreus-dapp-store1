import React from 'react'
import { HotListCard } from '../Utils'


type Props = {
    len: number
}

export const HotLists = (props: Props) => {
    return (
        <div>
            <section className="">
                <div className="flex flex-wrap">
                    {Array(props.len).fill(true).map((val, i) => {
                        return (
                            <HotListCard key={i} />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
