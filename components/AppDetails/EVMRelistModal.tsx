
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import contract from '../../contracts-connector/evm/addresses.json'


import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { getMarketAddress } from '@/hooks/selectChain'
import { ethers } from 'ethers'


export default function EVMRelistModal({ setIsOpen, isOpen, data }: any) {

	const { address, isConnected } = useAccount();
	const { chain } = useNetwork();
	const [price, setPrice] = useState("0")
	const [enableList, setenableList] = useState(false)

	const { config: evmListConfig } = usePrepareContractWrite({
		address: getMarketAddress(chain),
		abi: contract.marketAbi,
		functionName: 'List',
		args: [data?.token_id, ethers.utils.parseEther(price.toString()), data?.nftAddress],
		overrides: {
			value: ethers.utils.parseEther('0.02'),
		},
		enabled: enableList
	})

	const { data: ListTx, write: ListEVMDapps } = useContractWrite(evmListConfig)

	useEffect(() => {
		console.log(ListTx)
	}, [ListTx])


	async function approve() {
		if (price != '') {
			if (isConnected) {
				setenableList(true)
				setTimeout(() => {
					ListEVMDapps?.()
				}, 1000);
			} else {

			}
		} else {
			alert('Enter Listing Price')
		}
	}

	function closeModal() {
		setIsOpen(false)
	}


	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Relist Your App/Game
									</Dialog.Title>
									<div className="mt-2">
										<div className='flex flex-col mt-5'>
											<p>Relisting</p>

											<input type="number" name="" id="" placeholder='Enter Listing Price' className='ring ring-[#6039CF] outline-none rounded-lg p-1 my-2'
												onChange={(e) => {
													setPrice(e.target.value)
												}} />

											<button className='w-fit bg-[#6039CF] p-2 rounded-lg' onClick={approve}>Relist</button>
										</div>

									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Close Modal
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
