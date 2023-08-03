import React from 'react'
import PaddingContainer from '../layout/PaddingContainer'
import siteConfig from '@/config/siteConfig'
import Link from 'next/link'
import SociaLink from '../elements/SociaLink'

const Footer = () => {
    return (
        <div className='py-8 mt-10 border-t'>
            <PaddingContainer>
                <div>
                    <h2 className='text-3xl font-bold'>{siteConfig.siteName}</h2>
                    <p className='max-w-md mt-2 text-neutral-700'>{siteConfig.description}</p>
                </div>
                {/* social and currently at */}
                <div className='mt-6 flex flex-wrap justify-between gap-4 '>
                    <div>
                        <div className='font-medium text-lg'>#exploretheworld</div>
                        <div className='flex gap-4 items-center text-neutral-600 mt-2'>
                            <SociaLink platform='twitter' link={siteConfig.socialLinks.twitter} />
                            <SociaLink platform='instagram' link={siteConfig.socialLinks.instagram} />
                            <SociaLink platform='linkedin' link={siteConfig.socialLinks.linkedin} />
                            <SociaLink platform='github' link={siteConfig.socialLinks.github} />
                        </div>
                    </div>
                    <div>
                        <div className='text-sm text-neutral-400'>
                            Currently At
                        </div>
                        <div className='bg-white shadow-md rounded-md py-2 px-3 flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-emerald-400' />
                            {siteConfig.currentlyAt}</div>
                    </div>
                </div>
                {/* bottom section */}
                <div className='border-t py-3 flex justify-between gap-4 flex-wrap mt-16'>
                    <div className='text-sm text-neutral-400'>
                        All rights are reserved | Copyright {new Date().getFullYear()}
                    </div>
                    <div className='font-semibold'>Made with love by <Link className='underline underline-offset-4' href={siteConfig.socialLinks.github}>@Himanshuxyzz</Link> ❤️</div>
                </div>
            </PaddingContainer>
        </div>
    )
}

export default Footer