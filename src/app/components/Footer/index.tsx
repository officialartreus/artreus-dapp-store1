export const Footer = () => {
    return (
        <>
            <div className="bg-white flex flex-col gap-20 w-full h-[1011px] md:h-[579px] px-5 md:px-20 py-20">
                <img src="/logo.png" className="w-[227px] h-[35px] object-contain" alt="logo" draggable={false} />


                <div className="flex flex-col md:flex-row gap-14 md:gap-40 w-full justify-start md:justify-between items-start md:items-center">
                    <div>
                        <div className="flex flex-col gap-4 mt-2 md:mt-10">
                            <p className="font-[600] text-[16px] leading-[20px] font-inter w-[306px] text-[#4D4D4D]">Get the latest Artreus updates</p>
                            <div className="w-[335px] h-[44px] bg-[#2121211A] rounded-[12px] flex flex-row items-center">
                                <input className="bg-transparent w-fit text-black h-[44px] px-4 focus:outline-none" placeholder="Your email" />
                                <button className="bg-[#6039CF] w-[87px] h-[36px] rounded-[8px] flex flex-row items-center p-[8px_12px_8px_12px]">
                                    <p>I'm in</p>
                                    <img src="/arrow-right.svg" alt="arrow-right" draggable={false} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-5 md:mt-10">
                            <p className="font-[600] text-[16px] leading-[20px] font-inter w-[302px] text-[#4D4D4D]">Join Artreus Community</p>
                            <div className="w-[335px] h-[44px] flex flex-row gap-4 items-center">
                                <img src="/twitter.svg" alt="twitter" draggable={false} />
                                <img src="/instagram.svg" alt="instagram" draggable={false} />
                                <img src="/discord.svg" alt="discord" draggable={false} />
                                <img src="/telegram.svg" alt="telegram" draggable={false} />
                                <img src="/youtube.svg" alt="youtube" draggable={false} />
                            </div>
                        </div>
                    </div>





                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-8">
                            <p className="font-[600] text-[24px] leading-[32.4px] font-inter w-[302px] text-[#4D4D4D]">Marketplace</p>
                            <ul className="flex flex-col gap-5">
                                <li><a href="#explore" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Explore</a></li>
                                <li><a href="#blog" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Blog</a></li>
                                <li><a href="#how-it-works" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">How it works</a></li>
                                <li><a href="#jobs" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Jobs</a></li>
                                <li><a href="#help" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Help Center</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-8">
                            <p className="font-[600] text-[24px] leading-[32.4px] font-inter w-[302px] text-[#4D4D4D]">Dapp Store</p>
                            <ul className="flex flex-col gap-5">
                                <li><a href="#apps" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Apps</a></li>
                                <li><a href="#games" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Games</a></li>
                                <li><a href="#blog" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Blog</a></li>
                                <li><a href="#jobs" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Jobs</a></li>
                                <li><a href="#help" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Help Center</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-8">
                            <p className="font-[600] text-[24px] leading-[32.4px] font-inter text-[#4D4D4D]">Creators</p>
                            <ul className="flex flex-col gap-5">
                                <li><a href="#quick-start" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Quick Start</a></li>
                                <li><a href="#sdk" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">JS Sdk</a></li>
                                <li><a href="#ui-kits" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">UI kits</a></li>
                                <li><a href="#graph" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">The Graph</a></li>
                                <li><a href="#resources" className="font-[400] text-[16px] leading-[21.92px] font-inter w-[302px] text-[#6039CF]">Resources</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/*  */}
                {/*  */}
                <div className="flex flex-col items-center gap-2">
                    <img src="/break.svg" alt="break" />
                    <div className="flex flex-row items-center gap-8">
                        <p className="font-[400] text-[12px] leading-[15px] font-inter text-[#5D50C6]">Copyright 2022 Artreus.</p>
                        <p className="font-[400] text-[12px] leading-[15px] font-inter text-[#5D50C6]">All right reserved</p>
                        <p className="font-[400] text-[12px] leading-[15px] font-inter text-[#5D50C6]">Terms</p>
                        <p className="font-[400] text-[12px] leading-[15px] font-inter text-[#5D50C6]">Privacy policy</p>
                    </div>
                </div>
            </div>
        </>
    )
}