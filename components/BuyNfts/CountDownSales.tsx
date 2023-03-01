import React from 'react'
import { CountDownCard, HotListCard } from '../Utils'


type Props = {
    len: number
}

export const CountDownSales = (props: Props) => {
    return (
        <div>
            <section className="">
                <div className="flex flex-wrap">
                    {Array(props.len).fill(true).map((val, i) => {
                        return (
                            <CountDownCard key={i} />
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
