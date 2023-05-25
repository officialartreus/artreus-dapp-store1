import React from 'react'
import { MiniCards } from '../Utils'


type Props = {
    len: number;
    data: any
}

export const HotAssets = (props: Props) => {
    const { data, len } = props
    let count = 0
    return (
        <div>
            <section className="">
                <div className="grid grid-cols-3 xl:grid-cols-4 pc:grid-cols-5 gap-[15px]">

                    {data ? data.map((data: any, i: number) => {
                        if (!data?.data?.images_url?.icon) return
                        if (count == len) return
                        count++
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
