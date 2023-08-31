import React from 'react'
import { Post } from '@/types/collection';
import PostContent from './PostContent';
import Image from 'next/image';
interface PostHeroProps {
    post: Post | any;
    locale: string;
}


const PostHero = ({ post, locale }: PostHeroProps) => {
    return (
        <div>
            <PostContent post={post} isPostPage locale={locale} />
            <Image className='rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6' priority alt='hero-image' src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`} width={1280} height={500} />
        </div>
    )
}

export default PostHero