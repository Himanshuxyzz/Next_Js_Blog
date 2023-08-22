import React from 'react'
import { Post } from "@/types/collection";
import { ArrowRight } from 'lucide-react';
import { getReadingTime, getRelativeDate } from '@/lib/helpers';

interface PostContentProps {
    post: Post;
    isPostPage?: boolean;
}

const PostContent = ({ post, isPostPage = false }: PostContentProps) => {
    return (
        <div className='space-y-2'>
            {/* {TAGS} */}
            <div className={`flex gap-2 items-center flex-wrap text-neutral-400 ${isPostPage ? 'text-sm' : 'text-xs @md:text-sm'}`}>
                <div className={
                    `font-medium ${post.category.title === 'Cities' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {post.category.title}
                </div>
                <div className='w-2 h-2 rounded-full bg-neutral-200' />
                <div >{`${post.author.first_name} ${post.author.last_name}`}</div>
                <div className='w-2 h-2 rounded-full bg-neutral-200'></div>
                <div>{getReadingTime(post.body)}</div>
                <div className='w-2 h-2 rounded-full bg-neutral-200'></div>
                <div>{getRelativeDate(post.date_created)}</div>
            </div>
            {/* title  */}
            <h2 className={`${isPostPage ? "lg:text-4xl text-2xl md:text-3xl font-bold" : "@lg:text-3xl text-xl @md:text-2xl font-medium"}`}>{post.title}</h2>
            {/* description */}
            <p className='text-base @lg:text-lg text-neutral-600 leading-snug'>{post.description}</p>
            {/* read more */}
            {/* {isPostPage ? "" : (<div className='flex items-center gap-2 pt-3'>Read More <ArrowRight size={14} /></div>)} */}
            {!isPostPage && (<div className='flex items-center gap-2 pt-3'>Read More <ArrowRight size={14} /></div>)}
        </div >
    )
}

export default PostContent