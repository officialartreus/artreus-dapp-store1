import { nearWallet } from '@/contracts-connector/near/near-interface'
import { motion } from 'framer-motion'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import UAuth from '@uauth/js'

const pathVariants = {
    initial: {
        opacity: 0,
        pathLength: 0
    },
    final: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5
        }
    }
}


const ConnectWallet = () => {

    const [uDauth, setUDauth] = useState<UAuth>()
    const { openConnectModal } = useConnectModal();

    useEffect(() => {
        const uDauth = new UAuth({
            clientID: "37a2f337-c4b9-465d-86df-efa58498ac20",
            redirectUri: `${location.origin}`,
            scope: "openid wallet email profile:optional social:optional"
        })
        setUDauth(uDauth)
    }, [])

    const handleRainbowKit = () => {
        if (openConnectModal) {
            openConnectModal()
        } else {
            alert('Please try again')
        }
    }

    const handleNear = () => {
        try {
            nearWallet.signIn()
        } catch (err) {
            console.log(err)
        }
    }

    const handleUD = async () => {
        try {
            await uDauth?.loginWithPopup()
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-[100%] h-[100vh]">
            <div className="flex flex-col h-[100%] w-[100vw] justify-center align-center items-center">
                <div className="shadow justify-center rounded-lg items-center shadow-lg bg-opacity-[0.1] bg-black p-8 flex flex-col w-fit">
                    <motion.svg width="126" height="149" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path initial="initial"
                            animate="final" variants={pathVariants} d="M28.9212 27.4481C28.9212 29.3793 28.9425 31.3104 28.9099 33.2415C28.8999 33.8596 29.0788 34.1071 29.7404 34.0805C31.0423 34.04 32.3456 34.0805 33.6475 34.0651C34.9494 34.0497 35.8836 33.2149 35.8921 31.9676C35.9219 28.22 36.142 24.4529 35.8538 20.7249C35.0587 10.4456 27.669 2.52533 18.5331 0.0670271C18.148 -0.0328474 17.7426 -0.0275233 17.3604 0.0824155C8.21453 2.90708 2.58295 8.91206 0.465664 18.0974C0.144806 19.4957 0.0667191 20.9626 0.0397453 22.4015C-0.0241432 25.4387 0.0397453 28.4801 0.00283051 31.5173C-0.0184631 33.0555 0.836208 34.2231 2.67191 34.0861C3.79916 34.0211 4.9293 34.0211 6.05655 34.0861C6.74369 34.1141 6.96091 33.8806 6.95665 33.2107C6.93109 29.747 6.91832 26.2805 6.95665 22.8168C6.9964 18.9224 8.16626 15.393 10.6707 12.3292C12.4425 10.1673 14.6132 8.49349 17.2497 7.46431C17.7158 7.29089 18.2302 7.29089 18.6964 7.46431C24.4775 10.0568 27.9729 14.4085 28.7253 20.641C28.9951 22.8783 28.7693 25.1702 28.7693 27.4384L28.9212 27.4481Z" fill="#6039CF" />
                        <motion.path initial="initial"
                            animate="final" variants={pathVariants} d="M22.7126 34.251C22.7059 33.6326 22.5754 33.0216 22.3285 32.453C22.0817 31.8844 21.7233 31.3693 21.2739 30.9374C20.8246 30.5055 20.2931 30.1651 19.7099 29.9359C19.1268 29.7066 18.5034 29.593 17.8756 29.6015C15.3201 29.6253 13.1266 31.8025 13.128 34.3084C13.128 36.8478 15.3683 39.0208 17.9707 39.0068C18.5995 39.0026 19.2213 38.8761 19.8003 38.6346C20.3794 38.393 20.9043 38.0412 21.3449 37.5993C21.7855 37.1574 22.1331 36.6342 22.3678 36.0596C22.6025 35.485 22.7197 34.8704 22.7126 34.251Z" fill="#6039CF" />

                    </motion.svg>

                    <div className="mt-2">
                        <div>
                            <button className="flex justify-between items-center p-3 w-[100%] my-2 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => handleRainbowKit()}>
                                <p className='mx-2 flex items-center'>

                                    <span className="flex-1 ml-3 whitespace-nowrap">EVM Chains</span>
                                </p>

                                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                            </button>
                        </div>

                        <div>
                            <button className="flex justify-between items-center w-[100%] p-3 my-2 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => handleNear()}>

                                <p className='mx-2 items-center flex'>
                                    <span className="flex-1 ml-2 whitespace-nowrap">Near</span>
                                </p>
                                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Mobile Compatible</span>
                            </button>
                        </div>

                        <div>
                            <button className="flex justify-between items-center w-[100%] p-3 my-2 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => handleUD()}>

                                <p className='mx-2 items-center flex'>
                                    <span className="flex-1 ml-2 whitespace-nowrap">Unstopable Domains</span>
                                </p>
                                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Multi-Chain</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ConnectWallet