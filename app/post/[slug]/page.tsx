import { DUMMY_POSTS, ERRORMSG } from '@/DUMMY_DATA';
// import React from 'react'
// import { notFound } from "next/navigation"
import Error404 from '@/components/404/Error404';
import SociaLink from '@/components/elements/SociaLink';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PostHero from '@/components/post/PostHero';

export const generateStaticParams = async () => {
    return DUMMY_POSTS.map((post) => {
        return {
            slug: post.slug
        }
    })
}

const page = ({ params, }: {
    params: {
        slug: string;
    }
}) => {
    const post = DUMMY_POSTS.find((post) => post.slug === params.slug)

    return (
        <PaddingContainer>
            {!post ?
                (<Error404 message={ERRORMSG[0]} />)
                : (
                    <>
                        <PostHero post={post} />
                        <div className='mt-10 flex gap-10 '>
                            <div className='relative'>
                                <div className='flex flex-col gap-5 sticky top-20'>
                                    <SociaLink 
                                    isShareURL platform='facebook' link={`https://www.facebook.com/sharer/sharer.php?u=${ `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />

                                    <SociaLink
                                        isShareURL platform='twitter' link={`https://www.twitter.com/intent/tweet?url=${ `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />

                                    <SociaLink
                                        isShareURL platform='linkedin' link={`https://www.linkedin.com/shareArticle?mini=true&?url=${ `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />
                                </div>
                            </div>
                            <div className='h-[1200px] bg-amber-200 w-full'>Post Body</div>
                        </div>
                    </>)}
        </PaddingContainer>
    )
}

export default page