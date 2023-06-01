export const Secured = () => {
    const dapps = [{}, {}, {}, {}];
    const rates = new Array(5).fill("");
    return (
        <>
            <div className="secured-section">
                <div className="flex relative flex-col justify-center items-center h-fit pt-10">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h1 className="hero-h1 text-[#FFFFFF] text-[20px] md:text-[40px] text-center leading-[23.42px] md:leading-[46.84px] md:w-[723px]">SECURE YOUR APPLICATIONS</h1>
                        <p className="text-[#FFFFFF] font-inter font-[400] text-[15px] md:text-[16px] leading-[20.04px] md:leading-[21.38px] text-center w-[300px] md:w-[597px]">A decentralized Appstore will offer greater security than a traditional Appstore as it would be built using smart contract and store in the blockchain.</p>
                    </div>

                    <div className="card flex flex-row justify-start items-center overflow-x-hidden">
                        <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center w-fit">
                            <div>
                                <img className="md:w-[168px] object-contain w-full" src="/full-dapp.svg" alt="full-dapp" draggable={false} />
                            </div>
                            <div className="sub-card">
                                <div className="flex flex-row justify-between items-center md:w-[500px]">
                                    <div className="flex flex-col justify-start items-start gap-3">
                                        <p className="text-[#000000] font-inter font-[500] text-[12px] leading-[15px] text-center">Created By: <span className="text-[#6039CF]">Dimension Studieos</span></p>
                                        <h1 className="font-inter font-[600] text-[#000000] text-[24px] text-left leading-[30px] w-[188px]">CyberPunk 2077</h1>
                                    </div>
                                    <div className="flex flex-col gap-3 justify-center items-center">
                                        <div className="flex flex-row gap-3 justify-between items-center w-[113px]">
                                            <img src="/truck.svg" alt="truck" draggable={false} />
                                            <p className="text-[#7A7A7A] font-inter font-[400] text-[14px] leading-[17.5px] text-left">{2555} Supply</p>
                                        </div>
                                        <div className="flex flex-row gap-3 justify-between items-center w-[113px]">
                                            <img src="/receive-square.svg" alt="receive-square" draggable={false} />
                                            <p className="text-[#7A7A7A] font-inter font-[400] text-[14px] leading-[17.5px] text-left">{1000} Downloads</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-row gap-3 justify-between items-center pb-12">
                                    <div className="flex flex-row gap-3 justify-between items-center">
                                        <div className="line"></div>
                                        <div className="flex flex-col gap-1 justify-center items-center ">
                                            <div className="flex flex-row md:gap-3 justify-between items-center">
                                                <p className="text-[#000000] font-inter font-[600] text-[32px] leading-[40px]">4.0</p>
                                                <img src="/stared.svg" alt="stared" draggable={false} />
                                            </div>
                                            <p className="text-[#7A7A7A] font-inter font-[400] text-[16px] leading-[15px]">Average</p>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                    <div>
                                        <img src="/teen.svg" alt="teen" draggable={false} />
                                    </div>
                                    <div className="flex flex-col gap-1 justify-start items-start">
                                        <p className="text-[#7A7A7A] font-inter font-[400] text-[12px] leading-[15px]">Diverse Content: discretion is advised</p>
                                        <p className="text-[#7A7A7A] font-inter font-[400] text-[12px] leading-[15px]">In App Purchases</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-2 relative left-[-78px] w-screen">
                            {dapps.map((dapp, i) => (
                                <img key={i} className="object-cover" src="/game-dapp.svg" draggable={false} alt="" />
                            ))}
                        </div>











                        <div className="flex flex-col justify-center items-center w-full gap-6">
                            <div className="scard pt-4 px-10">
                                <h1 className="font-inter font-[600] text-[#000000] text-[16px] leading-[20px]">Ratings and Reviews</h1>





                                <div className="flex flex-row items-center justify-between gap-14 md:gap-2 relative">
                                    <div>
                                        <h1 className="font-inter font-[700] text-[#F49354] text-[64px] leading-[75.14px]">4.0</h1>
                                        <div className="flex flex-row items-center gap-2 relative">
                                            {rates.map((rate, i) => (
                                                <img key={i} className="object-cover" src="/outlined-star.svg" draggable={false} alt="star" />
                                            ))}
                                        </div>
                                    </div>


                                    <div>
                                        <div className="flex flex-col-reverse items-center gap-2 relative">
                                            {rates.map((rate, i) => (
                                                <div key={i} className="flex flex-row items-center gap-2 justify-between">
                                                    <p className="text-[#000000] font-inter font-[400] text-[12px] leading-[15px] text-left">{i + 1}</p>
                                                    <img className="object-cover w-[12px] h-[12px]" src="/stared.svg" draggable={false} alt="star" />
                                                    <div className="rate"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>




                            </div>
                            <div className="price px-5 py-10">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        <div className="block"></div>
                                        <p className="text-[#1B1B1B] font-inter font-[400] text-[13px] leading-[15.px] text-left">Price History</p>
                                    </div>

                                    <div className="weeks">
                                        <p className="text-[#666666] font-inter font-[400] text-[14px] leading-[16.44px] text-center">Week</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#666666" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="/sdapps.png" alt="sdapp" draggable={false} className="secured-sdapp opacity-[.5] absolute top-48" />
                </div>
            </div>



            <div className="relative z-[999] h-[540px] flex flex-col justify-center items-center w-full mt-24 md:mt-0 overflow-hidden">

                <p className="text-[#000000] font-lexend font-[400] text-[20px] md:text-[40px] leading-[23.42px] md:leading-[46.84px]">INTEGRATIONS SUPPORTED BY</p>

                <div className="flex flex-col md:flex-row justify-center md:justify-between gap-6 items-center">
                    <img className="object-cover" src="/zetachain.svg" draggable={false} alt="star" />
                    <img className="object-cover" src="/Caduceus.svg" draggable={false} alt="star" />
                    <img className="object-cover" src="/near.svg" draggable={false} alt="star" />
                </div>

                <img className="absolute -left-12 md:left-0 top-[35.18%]" src="/features-strands-left.svg" alt="features-strands-left" draggable={false} />
                <img className="absolute -right-12 md:right-0 top-[35.18%]" src="/feature-strand-right.svg" alt="feature-strand-right" draggable={false} />
            </div>
        </>
    )
}