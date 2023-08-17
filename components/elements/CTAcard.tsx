import Image from 'next/image'
import React from 'react'

const CTAcard = () => {
  return (
    <div className='rounded-md bg-slate-100 py-10 px-6 relative overflow-hidden'>
      {/* overlay */}
      {/* inset-0 is short form of top-0 right-0 left-0 bottom-0*/}
      <div className='absolute inset-0 bg-gradient-to-br from-white via-white/70 to-white/30 z-10' />
      {/* image */}
      <Image alt='CTA card image' className='object-center object-cover' src={"https://images.unsplash.com/photo-1448906654166-444d494666b3?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHwyNXx8bG9uZG9ufGVufDB8fHx8MTY3MDI3MzM3Ng&ixlib=rb-4.0.3"} fill />
      {/* container */}
      <div className='relative z-10'>
        <div className='font-medium text-lg'>#exploretheworld</div>
        <h3 className='text-4xl font-semibold mt-3'>Explore the world with me!</h3>
        <p className='mt-2 text-lg max-w-lg'>Explore the world with me ! I'm travelling around the 🌍. I've visited most of the great cities of 🇮🇳 and currently I'm travelling in 🇰🇷 Join me! </p>
        {/* form */}
        <form className='mt-6 flex items-center gap-2 w-full'>
          <input placeholder='Write your email' className='bg-white/80 text-base rounded-md py-2 px-3 outline-none focus:ring-2 ring-neutral-600 placeholder:text-sm w-full md:w-auto' />
          <button className='bg-neutral-900 rounded-md py-2 px-3 text-neutral-200 whitespace-nowrap'>Sign up</button>
        </form> 
      </div>
    </div>
  )
}

export default CTAcard