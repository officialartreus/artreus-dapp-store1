
import React, { useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import { nft_mint, nft_total_supply, nearWallet } from '../contracts-connector/near/near-interface';

import contract from '../contracts-connector/evm/addresses.json'

import { useAccount, useNetwork, useContractWrite, usePrepareContractWrite, useSigner, useWaitForTransaction } from 'wagmi'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link';

import { utils } from 'near-api-js';
import { Input, UploadButton } from '@/components/Utils';

import { ethers } from 'ethers';
import { getMarketAddress } from '@/hooks/selectChain';
import useDebounce from '@/hooks/useDebounce';


export default function Dev() {

  const [fileObject, setFileObject] = React.useState({})
  const [supply, setSupply] = React.useState(0)
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [mintText, setMintText] = React.useState('Upload Items')
  const [uploadStatus, setUploadStatus] = React.useState(-1)
  const [uri, seturi] = useState('')
  const [textCount, settextCount] = useState(0)

  const { address, isConnected } = useAccount()
  const { chain } = useNetwork();

  const dbName = useDebounce(name, 1000)
  const dbSupply = useDebounce(supply, 1000)
  const dbUri = useDebounce(uri, 10)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const txhash = urlParams.get('transactionHashes')

    if (txhash !== null) {
      window.location.replace(window.location.origin + '/myapps')
    }
  }, [])

  useEffect(() => {
    nearWallet.startUp()
  }, [])


  // const UploadToDb: any = async (name: any, description: any, jsonUrl: any, image_url: any, owner: any, categories: any) => {
  //   var axios = require('axios');
  //   var data = {
  //     "socialLinks": [
  //       "Fb.com"
  //     ],
  //     "name": name,
  //     "description": description,
  //     "jsonUrl": jsonUrl,
  //     "imageUrl": image_url,
  //     "listed": "false",
  //     "auctioned": "false",
  //     "owner": owner,
  //     "categories": categories,
  //     "collectionAddress": ""
  //   };

  //   var config = {
  //     method: 'post',
  //     url: 'https://artreuss.herokuapp.com/v1/nft/',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   };

  //   axios(config)
  //     .then(function (response: any) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error: any) {
  //       console.log(error);
  //     });
  // }

  function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNBZTE3Qjk0NzE4Q0I3MDIwOTcwZjg0NTlGQTQ5ZTk2NDNlRDg2OTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4MTU5NDIyNjgsIm5hbWUiOiJhcnRlcmV1cyJ9.3yGxFeIZ8v0lsPwXsiuuRdECC76d8kly3u8D2yBsum4"
  }

  async function storeFiles(mfiles: any) {
    const client = new Web3Storage({ token: getAccessToken() })
    const cid = await client.put(mfiles)
    return cid
  }

  useEffect(() => {
    if (uploadStatus > 0)
      setMintText(`Uploading ... ${uploadStatus}%`)
  }, [uploadStatus])

  const UploadImages: any = async (files: any, item_name: any, description: any, category: any) => {

    let cid: {} = {}

    const total = Object.keys(files).length


    for (const key in files) {
      let a = await storeFiles(files[key]);
      cid = {
        ...cid,
        [key]: a + '/' + files[key][0].name
      }
      const done = Object.keys(cid).length
      setUploadStatus(Math.floor((done / total) * 100))
    }

    const obj = {
      images_url: cid,
      name: item_name,
      description: description,
      category: category,
    };

    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    let ufiles = [new File([blob], item_name + ".json")];
    let metaCid = await storeFiles(ufiles);

    return [ufiles, cid, metaCid + "/" + item_name + ".json", item_name, description, category];
  }

  const handleFilesChange = (files: {}) => {
    setFileObject(files);
  }

  const handleSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: any = +e.target.value
    setSupply(val)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: any = e.target.value
    if (val.length > 15) return
    settextCount(val.length)
    setName(val)
  }

  const handleDescChange = (e: any) => {
    const val: any = e.target.value
    setDesc(val)
  }

  const { config } = usePrepareContractWrite({
    address: getMarketAddress(chain),
    abi: contract.marketAbi,
    functionName: 'MintDapp',
    args: [dbName, dbSupply, dbUri],
    enabled: Boolean(dbUri)
  })

  const { data: MintTx, write: MintDapp, error: errr } = useContractWrite(config)

  const { data: waittx } = useWaitForTransaction({
    hash: MintTx?.hash,
  })

  const handleNearSubmit = async (data: any) => {

    try {
      let totalNfts = await nft_total_supply()
      const mintData: any = {
        token_id: totalNfts.toString(),
        metadata: {
          title: name.toString(),
          description: desc.toString(),
          media: data[2].toString()
        },
        receiver_id: nearWallet.accountId,
        deposit: utils.format.parseNearAmount('1')
      }

      const tx = nft_mint(mintData)
      return tx
    } catch (mint_error: any) {
      console.log(mint_error)
    }
  }

  const handleMint = async () => {
    if (name == '' && desc == '' && supply == 0 && Object.keys(fileObject).length < 3) {
      alert('Please fill all compulsory fields')
      return
    }

    setUploadStatus(0)
    const data: any = await UploadImages(fileObject, name, desc, "image")

    if (!data) {
      alert('Error... Please Try Again Later')
      return
    }

    if (nearWallet.connected) {
      handleNearSubmit(data)
    } else if (isConnected) {
      seturi(data[2].toString())
      setTimeout(() => {
        MintDapp?.()
        setUploadStatus(-1)
      }, 2000);
    } else {
      alert('Not Connected')
    }
  }


  return (
    <div className=''>
      <section className='md:mx-10 px-[30px] md:px-0'>
        <h1 className='text-2xl text-center md:text-3xl font-bold mb-4'>Create New Apps or Games
        </h1>

        <div className='flex pc:w-[1200px] mx-auto flex-col mt-6'>
          <p>Kindly fill the form below to list your App</p>
          <p> <strong>*</strong>  fields are compulsory</p>
          <div>

            <div className='mt-4'>
              <Input placeholder={`Enter Your App or Game Name`} label={`Name - max length ${textCount}/15 *`} type='text' maxLength={15} onChange={handleNameChange} />

              <Input placeholder='Enter Total Supply' label="Total Supply *" type='text' onChange={handleSupplyChange} />

              {/* <Input placeholder='Enter App Type' label="App Type (game or ap)*" type='text' onChange={handleSupplyChange} /> */}

              <label>Description *</label>
              <textarea className='placeholder-black/50 block bg-[#2F2F2F1A] outline-[#AEACAB] w-full p-2 mt-2 rounded-md' rows={4} placeholder='Enter a Short Description' name="Description *" onChange={handleDescChange} />

              <div className='flex flex-col'>
                <UploadButton handleChange={handleFilesChange} />
              </div>

              <div className={`my-5 shadow-md bg-brandpink0 rounded-md overflow-hidden w-fit `}>

                <div style={{ width: `${uploadStatus}%` }} className={`rounded-l-md ${uploadStatus > 0 ? 'bg-[#6039CF]' : 'bg-brandpink0'}`}>
                  <input type="submit" value={mintText} className={`cursor-pointer py-2 px-4  font-bold`} onClick={() => {
                    handleMint()
                  }} disabled={uploadStatus > 0} />
                  {waittx && <MyModal mintData={waittx} />}

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


function MyModal({ mintData }: any) {

  const [isOpen, setIsOpen] = useState(true)
  const [price, setprice] = useState(0)
  const { chain } = useNetwork()

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (mintData != undefined && !isOpen) {
      setIsOpen(true)
    }
  }, [mintData])

  const getAppPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: any = e.target.value
    if (val == '') {
      setprice(0)
      return
    }
    setprice(val)
  }

  const { config } = usePrepareContractWrite({
    address: getMarketAddress(chain),
    abi: contract.marketAbi,
    functionName: 'List',
    args: [0, ethers.utils.parseEther(price.toString()), mintData?.logs[0].address],
    overrides: {
      value: ethers.utils.parseEther('0.02'),
    },
  })
  const { data: ListTx, write } = useContractWrite(config)

  const { data: listwaittx } = useWaitForTransaction({
    hash: ListTx?.hash,
  })

  const listEVMApp = () => {
    if (price <= 0) {
      alert('price too small')
      return
    }
    write?.()
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    App Creation Successful
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      App Created!! It will show up in your profile in the next few muniutes.
                    </p>
                    <p className="text-sm mt-3 text-gray-500">
                      To view this transaction on your blockchain explorer:
                    </p>
                    <Link className="text-sm text-brandpink0 " href={`${chain?.blockExplorers?.default.url}/tx/${mintData?.logs[0].transactionHash}`} target='_blank' >Click Here</Link>
                  </div>

                  <div>
                    <p className="text-sm my-3 mt-5 text-gray-500">
                      List your app right away! If you don't it will be lost forever!
                    </p>
                    {ListTx ? (
                      <div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">
                            App Listed Successfully!!
                          </p>
                          <p className="text-sm mt-3 text-gray-500">
                            To view this transaction on your blockchain explorer:
                          </p>
                          <Link className="text-sm text-brandpink0 " href={`${chain?.blockExplorers?.default.url}/tx/${listwaittx?.transactionHash}`} target='_blank' >Click Here</Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="text-sm text-gray-500">App Price * ({price.toString()} {chain?.nativeCurrency?.symbol}) </label>
                        <Input placeholder='Enter Your App Price' label="" type='number' onChange={getAppPrice} />
                        <button className="text-sm rounded-lg text-brandpink0 mt-0 p-2 bg-blue-100 hover:bg-blue-200 " onClick={listEVMApp}>List Now!</button>
                      </div>
                    )}


                  </div>


                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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
