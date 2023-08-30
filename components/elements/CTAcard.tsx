import DirectusClient from '@/lib/directus'
import { getDictionary } from '@/lib/getDictionary'
import { createItem } from '@directus/sdk'
import { revalidatePath, revalidateTag } from 'next/cache'
import Image from 'next/image'
import next from 'next/types'
import React from 'react'

const CTAcard = async ({ locale }: {
  locale: string;
}) => {
  const dictionary = await getDictionary(locale);

  const formAction = async (formData: FormData) => {
    'use server'
    try {
      const email = formData.get("email");
      await DirectusClient.request(createItem("subscribers", {
        email,
      }))
      revalidateTag("subscribers-count")
    } catch (error) {
      console.log(error)
    }
  }

  const subscribersCount = await fetch(`${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`, {
    next: {
      tags: ["subscribers-count"],
    },
    cache: 'no-store',

  }).then((res) => res.json()).then((res) => res.meta.total_count).catch((error) => console.log(error))

  // console.log(subscribersCount)

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
        <h3 className='text-4xl font-semibold mt-3'>{dictionary.ctaCard.title}</h3>
        <p className='mt-2 text-lg max-w-lg'>{dictionary.ctaCard.description}</p>
        {/* form */}
        <form key={subscribersCount + "subscribers-form"} action={formAction} className='mt-6 flex items-center gap-2 w-full'>
          <input placeholder={dictionary.ctaCard.placeholder} className='bg-white/80 text-base rounded-md py-2 px-3 outline-none focus:ring-2 ring-neutral-600 placeholder:text-sm w-full md:w-auto' name='email' type='email' />
          <button className='bg-neutral-900 rounded-md py-2 px-3 text-neutral-200 whitespace-nowrap'>{dictionary.ctaCard.button}</button>
        </form>
        {/* subscriber count */}
        <div className='mt-5 text-neutral-700'>
          {dictionary.ctaCard.subscriberText1} {" "}  <span className='bg-neutral-700 px-2 py-1 text-neutral-100 rounded-md text-sm'>{subscribersCount}</span> {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  )
}

export default CTAcard;