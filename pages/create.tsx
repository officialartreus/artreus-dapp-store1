
import React, { useEffect } from 'react'
import { Web3Storage } from 'web3.storage'
import { nft_mint, nft_total_supply, nearWallet } from '../contracts-connector/near/near-interface';

import { utils } from 'near-api-js';
import { ImagePreview, Input, UploadButton } from '@/components/Utils';


export default function Create() {


  const [fileObject, setFileObject] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  const [amount, setAmount] = React.useState(0)
  const [name, setName] = React.useState(0)
  const [desc, setDesc] = React.useState(0)


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const txhash = urlParams.get('transactionHashes')

    if (txhash !== null) {
      window.location.replace(window.location.origin + '/profile/me')
    }
  }, [])


  useEffect(() => {
    nearWallet.startUp()
  }, [])

  ////////////
  const UploadToDb: any = async (name: any, description: any, jsonUrl: any, image_url: any, owner: any, categories: any) => {
    var axios = require('axios');
    var data = {
      "socialLinks": [
        "Fb.com"
      ],
      "name": name,
      "description": description,
      "jsonUrl": jsonUrl,
      "imageUrl": image_url,
      "listed": "false",
      "auctioned": "false",
      "owner": owner,
      "categories": categories,
      "collectionAddress": ""
    };

    var config = {
      method: 'post',
      url: 'https://artreuss.herokuapp.com/v1/nft/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response: any) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
  ////////////
  ////
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

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }
  async function storeFiles(mfiles: any) {
    const client = makeStorageClient()
    const cid = await client.put(mfiles)
    console.log('stored files with cid:', cid)
    return cid
  }
  const UploadImages: any = async (image: any, item_name: any, description: any, category: any, size: any) => {
    // console.log(image[0].name);
    let cid: any
    cid = await storeFiles(image);

    const obj = {
      image_url: cid + "/" + image[0].name,
      name: item_name,
      description: description,
      size: size,
      category: category,
    };

    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    let ufiles = [new File([blob], item_name + ".json")];
    let metaCid = await storeFiles(ufiles);

    return [ufiles, cid + "/" + image[0].name, metaCid + "/" + item_name + ".json", item_name, description, category];
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    setFileObject(file);
    if (file) {
      let src = URL.createObjectURL(file[0])
      setImageUrl(src);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: any = +e.target.value
    setAmount(val)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: any = e.target.value
    setName(val)
  }

  const handleDescChange = (e: any) => {
    const val: any = e.target.value
    setDesc(val)
  }



  const handleNearSubmit = async () => {
    if (!nearWallet.connected) {
      alert('Not Connected')
      return
    }

    const data: any = await UploadImages(fileObject, name, desc, "image", fileObject.size)

    if (!data) {
      alert('Please Enter All The Fields To Mint Your Nfts')
      return
    }



    try {
      const metadata = data[2].toString()
      let totalNfts = await nft_total_supply()
      totalNfts
      const mintData: any = {
        token_id: totalNfts.toString(),
        metadata: {
          title: "My Non Fungible Team Token",
          description: "The Team Most Certainly Goes",
          media: data[2].toString()
        },
        receiver_id: nearWallet.accountId,
        deposit: utils.format.parseNearAmount('1')
      }

      const tx = nft_mint(mintData)

      console.log("receipt", tx);
      UploadToDb(name, desc, data[2], data[1], nearWallet.accountId, "Nft")


      return tx
    } catch (mint_error: any) {
      console.log(mint_error)
    }
  }

  return (
    <div className='ml-20'>
      <div className='pt-20'></div>
      <section className='md:mx-10 px-16 md:px-0'>
        <h1 className='text-2xl text-center md:text-3xl font-bold mb-4'>Create New Apps or Games
        </h1>

        <ImagePreview classes='md:hidden' imageUrl={imageUrl} />

        <div className='md:flex justify-between'>
          <div>
            <div className='flex flex-col'>
              <UploadButton handleChange={handleImageUrlChange} />
            </div>

            <div className='mt-6'>
              <Input placeholder='Enter Your App or Game Name' label="Name" type='text' onChange={handleNameChange} />

              <label>Description</label>
              <textarea className='placeholder-black/50 block bg-[#2F2F2F1A] outline-[#AEACAB] w-full p-2 mt-2 rounded-md' rows={4} placeholder='Enter a Short Description' name="Description" onChange={handleDescChange} />

              {/* <Input placeholder='Enter Total Supply' label="Name" type='text' onChange={handleNameChange} />

              <Input placeholder='Enter Your App or Game Name' label="Name" type='text' onChange={handleNameChange} /> */}

              <input type="submit" value="Create Item" className='cursor-pointer py-2 px-4 mt-8 font-bold rounded-md bg-brandyellow' onClick={() => {
                handleNearSubmit()
              }} />
              <div>
              </div>
            </div>
          </div>
          <div className='w-[50%] md:ml-5'>
            <ImagePreview classes='hidden md:block' imageUrl={imageUrl} />
          </div>
        </div>
      </section>
    </div>
  )
}