import React from 'react'
import Image from 'next/image'

const Error404 = ({ message = "" }: {
  message: string;
}) => {
  return (
    <div className='@container'>
      <div className='mb-10 mx-auto max-w-[640px] max-h-[180px]'>
        <Image className='w-full object-cover ' priority alt='404 image' width={"640"} height={"180"} src={"/sukuna.png"} />
      </div>
      <div className='mb-10 h-20 text-center '>
        <h2 className='font-semibold text-base @md:text-1xl @lg:text-2xl'>{message}</h2>
        <div className='font-semibold mt-2 text-base @md:text-1xl @lg:text-2xl'>ERROR 404!</div>
      </div>
    </div>
  )
}

export default Error404