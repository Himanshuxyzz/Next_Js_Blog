import React from 'react'
import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PostList from '@/components/post/PostList';

export const generateStaticParams = async () => {
    return DUMMY_CATEGORIES.map((category) => {
        return {
            category: category.slug,
        }
    })
}

const page = ({ params }: {
    params: {
        category: string;
    }
}) => {
    const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category)
    return (
        <PaddingContainer>
            <PostList posts={posts} />
        </PaddingContainer>
    )
}

export default page