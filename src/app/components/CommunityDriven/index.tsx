export const CommunityDriven = () => {
    return (
        <>
            <div className="h-[120vh] w-full relative overflow-hidden flex flex-col justify-center md:justify-start items-center">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#000000] font-lexend font-normal text-[20px] text-center md:text-[40px] leading-[23.42px] md:leading-[46.84px]">COMMUNITY DRIVEN SYSTEM</h1>
                    <p className="text-[#000000] font-lexend font-normal text-center md:w-[597px] text-[16px] leading-[21.38px]">ARTEREUS an EVM compatible blockchain for DeFi. It is fast, scalable, has low transaction costs and does no wasteful mining. It is built with Substrate Framework and comes with on-chain governance.</p>
                </div>
                <img className="hidden md:block" src="/community.svg" alt="community" draggable={false} />
                <img className="block md:hidden" src="/mob-community.svg" alt="community" draggable={false} />
            </div>
        </>
    )
}