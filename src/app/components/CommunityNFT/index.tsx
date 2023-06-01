export const CommunityNFT = () => {
    return (
        <>
            <div className="community-NFT -mt-10 overflow-hidden">
                <div className="card">
                    <div className="md:px-20 relative flex flex-col md:flex-row justify-center md:justify-between items-center gap-20">
                        <div className="w-[320px] md:w-[485px] flex flex-col gap-4 items-center justify-center md:items-start md:justify-start">
                            <h1 className="text-white font-lexend text-left md:text-center font-normal text-[20px] md:text-[40px] leading-[23.42px] md:leading-[46.84px]">Buy and sell
                                Community backed NFTs</h1>
                            <p className="text-white text-left md:text-center font-lexend font-normal w-fit md:w-[464px] text-[15px] md:text-[16px] leading-[20.04px] md:leading-[21.38px]">A decentralized Appstorewill offer greater security than a traditional Appstoreas it would be built using smart contract and store inthe blockchain.</p>
                            <button className="button-dapp-nft">
                                <img src="/shop.svg" alt="shop" />
                                <p>Buy NFTs</p>
                            </button>
                        </div>
                        <div className="w-[219px] md:w-[333px] h-[208px] md:h-[317px] absolute -left-5 top-[289px] md:top-0 md:bottom-0 md:relative">
                            <img className="mt-2" src="/head.svg" alt="head" draggable={false} />
                        </div>
                    </div>

                    <div className="sub-card"></div>
                </div>
            </div>
        </>
    )
}