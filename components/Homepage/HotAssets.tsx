import React from 'react'
import { MiniCards } from '../Utils'


type Props = {
    len: number;
    data: any
}

export const HotAssets = (props: Props) => {
    const { data, len } = props
    console.log(data)
    return (
        <div>
            <section className="">
                <div className="flex flex-wrap gap-[15px]">

                    {data ? data.map((data: any, i: number) => {
                        if (i > len) return
                        return (
                            <div key={i}>
                                <MiniCards data={data} />
                            </div>
                        )
                    }) : (
                        Array(len).fill(true).map((val, i) => {
                            return (
                                <MiniCards key={i} />
                            )
                        })
                    )}

                </div>
            </section>
        </div>
    )
}
