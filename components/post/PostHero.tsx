import React from 'react'
import { Post } from '@/types/collection';
import PostContent from './PostContent';
import Image from 'next/image';
interface PostHeroProps {
    post: Post;
}


const PostHero = ({ post }: PostHeroProps) => {
    return (
        <div>
            <PostContent post={post} isPostPage />
            <Image className='rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6' priority alt='hero-image' src={post.image} width={1280} height={500} />
        </div>
    )
}

export default PostHero