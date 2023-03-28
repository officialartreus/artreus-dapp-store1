import React, { useState } from 'react'

type prop = React.HTMLProps<HTMLButtonElement> & {
  handleChange: (e: {} | null) => void,
}

export function UploadButton({ handleChange, ...props }: prop) {

  const [files, setfiles] = useState({
    'icon': undefined,
    'banner': undefined,
    'image1': undefined,
    'appFile': undefined
  })
  const [icon, seticon] = useState('')
  const [banner, setbanner] = useState('')
  const [image1, setimage1] = useState('')
  const [image2, setimage2] = useState('')
  const [image3, setimage3] = useState('')
  const [appFile, setappFile] = useState('')
  const [appFileType, setappFileType] = useState('')


  const handleFileChange = () => {
    if (files.icon != undefined && files.banner != undefined
      && files.image1 != undefined && files.appFile != undefined) {
      handleChange(files)
      alert('Files Uploaded Succesfully')
    } else alert('Please Uplaod compulsory files')

  }

  const handleClear = () => {
    if (files.icon == undefined) {
      alert('Selection is empty')
      return
    }
    setfiles({
      'icon': undefined,
      'banner': undefined,
      'image1': undefined,
      'appFile': undefined
    })
    seticon('')
    setbanner('')
    setappFile('')
    setimage1('')
    setimage2('')
    setimage3('')
    setappFileType('')
    alert('Selection Cleared')
  }

  const iconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('image')) {
      alert('only svg, jpeg or jpg or image is required')
      return
    }
    seticon(file[0].name)
    setfiles(olddata => ({ ...olddata, icon: file }))
  }

  const bannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('image')) {
      alert('only svg, jpeg or jpg or image is required')
      return
    }
    setbanner(file[0].name)
    setfiles(olddata => ({ ...olddata, banner: file }))
  }

  const image1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('image')) {
      alert('only svg, jpeg or jpg or image is required')
      return
    }
    setimage1(file[0].name)
    setfiles(olddata => ({ ...olddata, image1: file }))
  }

  const image2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('image')) {
      alert('only svg, jpeg or jpg or image is required')
      return
    }
    setimage2(file[0].name)
    setfiles(olddata => ({ ...olddata, image2: file }))
  }

  const image3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('image')) {
      alert('only svg, jpeg or jpg or image is required')
      return
    }
    setimage3(file[0].name)
    setfiles(olddata => ({ ...olddata, image3: file }))
  }

  const appFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (!file[0].type.includes('application')) {
      alert('only apk or exe is required')
      return
    }

    if (file[0].type.includes('android.package')) setappFileType('.Apk Uploaded')
    else if (file[0].type.includes('x-msdownload')) setappFileType('.Exe Uploaded')
    setappFile(file[0].name)
    setfiles(olddata => ({ ...olddata, appFile: file }))
  }


  return (
    <div className='md:order-2 mt-6 md:mt-5'>

      <p className='mb-2 font-bold'>Upload files</p>
      <div className='border-4 rounded-md border-[#2F2F2F80] border-dashed p-0  md:p-8 flex flex-col justify-center'>
        <p className='text-center mb-5'>File Types -: Png, Jpg, Jpeg, Apk & Exe. <br /> Max File Size -: 100Mb</p>

        <div className='space-y-2'>
          <p>App Icon (540px x 540px) *</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={icon} disabled />
            <input type="file" onChange={iconChange} name="file" className='hidden' id="icon-upload" />
            <label htmlFor='icon-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>

          <p>App Image banner (600px x 960px) *</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={banner} disabled />
            <input type="file" onChange={bannerChange} name="file" className='hidden' id="banner-upload" />
            <label htmlFor='banner-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>

          <p>App Image 1 (1200px x 800px) *</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={image1} disabled />
            <input type="file" onChange={image1Change} name="file" className='hidden' id="image1-upload" />
            <label htmlFor='image1-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>

          <p>App Image 2 (1200px x 800px)</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={image2} disabled />
            <input type="file" onChange={image2Change} name="file" className='hidden' id="image2-upload" />
            <label htmlFor='image2-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>

          <p>App Image 3 (1200px x 800px)</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={image3} disabled />
            <input type="file" onChange={image3Change} name="file" className='hidden' id="image3-upload" />
            <label htmlFor='image3-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>

          <p>App file (Apk or Exe) * {appFileType}</p>
          <div className='bg-[#4D4D4D] rounded-lg overflow-hidden h-10 flex'>
            <input type="text" className='flex flex-1 pl-3 text-[16px] text-[#5D50C6]' placeholder={appFile} disabled />
            <input type="file" onChange={appFileChange} name="file" className='hidden' id="appFile-upload" />
            <label htmlFor='appFile-upload' role='button' className='bg-brandpink0 flex font-bold capitalize px-2'>
              <p className='my-auto'>choose file</p>
            </label>
          </div>
        </div>



        <div className="flex space-x-6">
          <button {...props as any} onClick={handleFileChange} tabIndex={0} className='rounded-md bg-brandpink0 font-bold capitalize mt-4 md:mt-6 py-2 px-4 w-fit'>Upload All Files</button>

          <button {...props as any} onClick={handleClear} tabIndex={0} className='rounded-md bg-brandpink0 font-bold capitalize mt-4 md:mt-6 py-2 px-4 w-fit'>Clear Selection</button>
        </div>
      </div>

    </div>
  )

}
