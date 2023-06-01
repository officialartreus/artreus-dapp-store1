export const Faqs = () => {
    const faqs = [
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
        {
            title: "Can I use Artreus for free?",
            ans: ""
        },
    ]
    return (
        <>
            <div className="faq flex flex-col justify-center items-center relative overflow-hidden">
                <p className="text-[#ff] font-lexend font-[400] text-[20px] md:text-[40px] text-center leading-[23.42px] md:leading-[46.84px]">FREQUENTLY ASKED QUESTIONS</p>

                <img src="/Vectary.svg" draggable={false} className="absolute -bottom-1 md:bottom-3 -left-[7px] w-[143px] h-[122px] md:w-[351px] md:h-[301px]" />


                <div className="mt-12 flex flex-col justify-center items-center gap-4">
                    {faqs.map((faq,i) => (
                        <div key={i} className="faqq flex flex-col md:flex-row justify-center md:justify-between items-center">
                            <p className="text-[#000] font-opensans text-center font-[400] text-[16px] md:text-[20px] leading-[21.79px] md:leading-[27.24px]">{faq.title}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden md:block text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}