
import React, { useEffect } from 'react'
import { Web3Storage } from 'web3.storage'
import { nft_mint, nft_total_supply, nearWallet } from '../contracts-connector/near/near-interface';

import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

import { utils } from 'near-api-js';
import { Input, UploadButton } from '@/components/Utils';
import { Contract } from 'ethers/lib/ethers';

import contract from '../contracts-connector/evm/addresses.json'

import { ContractFactory } from 'ethers';

export default function Dev() {

  const [fileObject, setFileObject] = React.useState({})
  const [supply, setSupply] = React.useState(0)
  const [tsupply, settSupply] = React.useState({})
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [mintText, setMintText] = React.useState('Create Item')
  const [uploadStatus, setUploadStatus] = React.useState(0)
  const [nftContract, setNftContract] = React.useState<Contract>()

  const { address, isConnected } = useAccount()

  const zetaContractMarket = '0x894e97fEbBAfB2beaF8d3f207520Ca81047DD471'
  const zetaContractNFT = '0x9A93a2f45AC4aDcA85CC9dF8539eB50eECf87708'
  const cmpContract = '0xea781635AC8bDdAca2BDC7C2043A7573C7092786'

  const { data: Signer, error: err, isLoading, refetch } = useSigner()



  const querContract = async () => {

    // console.log((await nftContract?.totalSupply()).toString())
    console.log(nftContract?.address)

  }

  querContract()


  const { config } = usePrepareContractWrite({
    address: zetaContractMarket,
    abi: contract.marketAbi,
    functionName: 'getTokenURI',
    args: [nftContract?.address],
    enabled: true
  })



  const { write, error, isSuccess } = useContractWrite(config)


  const { data } = useContractRead({
    address: zetaContractMarket,
    abi: contract.marketAbi,
    functionName: 'getAllDappsListed'
  })


  console.log(data)


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const txhash = urlParams.get('transactionHashes')

    if (txhash !== null) {
      window.location.replace(window.location.origin + '/myapps')
    }
  }, [])


  // console.log(data)


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
      setMintText(`Minting ... ${uploadStatus}%`)
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
    setName(val)
  }

  const handleDescChange = (e: any) => {
    const val: any = e.target.value
    setDesc(val)
  }

  const evmChainMint = async (name: string, maxSupply: number, uri: string) => {


    console.log(err)
    console.log(uri)
    if (Signer != undefined) {
      const factory = new ContractFactory(contract.minterAbi, contract.nftContractByteCode, Signer);

      const nftCon = await factory.deploy(name, maxSupply, uri, zetaContractMarket);
      setNftContract(nftCon)
    }

  }

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
      evmChainMint(name, supply, data[2].toString())
    } else {
      alert('Not Connected')
    }

  }


  return (
    <div className='ml-20'>
      <div className='pt-20'></div>
      <section className='md:mx-10 px-16 md:px-0'>
        <h1 className='text-2xl text-center md:text-3xl font-bold mb-4'>Create New Apps or Games
        </h1>

        <div className='flex flex-col mt-6'>
          <p>Kindly fill the form below to list your App</p>
          <p> <strong>*</strong>  fields are compulsory</p>
          <div>


            <div className='mt-4'>
              <Input placeholder='Enter Your App or Game Name' label="Name *" type='text' onChange={handleNameChange} />

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
                  }} />
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
