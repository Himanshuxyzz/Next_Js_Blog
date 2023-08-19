import { DUMMY_POSTS, ERRORMSG } from '@/DUMMY_DATA';
// import React from 'react'
// import { notFound } from "next/navigation"
import Error404 from '@/components/404/Error404';
import PaddingContainer from '@/components/layout/PaddingContainer';

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
                : (<div>{post?.title}</div>)}
        </PaddingContainer>
    )
}

export default page