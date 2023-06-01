import { lexend } from "@/utils/fonts"

export const Hero = () => {
    return (
        <>
            <div className="flex flex-col items-center overflow-hidden relative h-screen w-full bg-cover bg-no-repeat">
                <div className="blur-1"></div>
                <h1 className="hero-h1 text-black text-[24px] md:text-[48px] leading-[30px] md:leading-[60px] text-center w-[320px] md:w-[1050px]">DISCOVER & ENGAGE: ARTREUS, THE ULTIMATE WEB3 APP STORE</h1>
                <div className="flex flex-row justify-between items-center gap-3 mt-10">
                    <button className="button-dapp">
                        <img src="/arrow.svg" alt="arrow" className="w-[18.57px] h-[18.57px] md:w-[24px] md:h-[24px]" draggable={false} />
                        <p>Open DappStore</p>
                    </button>
                    <button className="button-dapp-outline">
                        <img src="/arrow-outline.svg" alt="arrow" className="w-[18.57px] h-[18.57px] md:w-[24px] md:h-[24px]" draggable={false} />
                        <p>NFT Marketplace</p>
                    </button>
                </div>
                <img className="absolute right-6 md:left-52 top-[240px] md:top-[180px] animate-bounce-slow-1" src="/image2.svg" alt="img" draggable={false} />
                <img className="absolute left-6 md:left-12 top-[490px] md:top-[320px] animate-bounce-slow-2" src="/image3.svg" alt="img" draggable={false} />
                <img className="absolute left-6 md:left-80 top-[240px] md:top-[422px] animate-bounce-slow-3" src="/image4.svg" alt="img" draggable={false} />
                <img className="absolute right-32 md:right-52 top-[360px] md:top-[180px] animate-bounce-slow-4" src="/image5.svg" alt="img" draggable={false} />
                <img className="absolute right-5 md:right-80 top-[400px] md:top-[372px] animate-bounce-slow-5" src="/image6.svg" alt="img" draggable={false} />
                {/* <img className="absolute left-3 top-[372px] object-contain" src="/spell.svg" alt="img" draggable={false} /> */}
                {/* <div className="absolute left-3 top-[372px] animate-bounce-slow">
                    <div className="spell-circle"></div>
                    <div className="spell-stick"></div>
                </div> */}
                <div className="hidden md:flex flex-col justify-end items-end absolute top-[450px] ">
                    <img className="animate-bounce-slow" src="/star.svg" alt="img" draggable={false} />
                </div>
            </div>
        </>
    )
}