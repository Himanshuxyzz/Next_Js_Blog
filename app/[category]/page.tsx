import React from 'react'
import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PostList from '@/components/post/PostList';
import DirectusClient from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Error404 from '@/components/404/Error404';
import { Post } from '@/types/collection';

export const generateStaticParams = async () => {
    // return DUMMY_CATEGORIES.map((category) => {
    //     return {
    //         category: category.slug,
    //     }
    // })

    try {
        const categories = await DirectusClient.request(readItems("category", {
            filter: {
                status: {
                    _eq: "published",
                },
            },
            fields: ["slug"],
        }))

        const params = categories?.map((category) => {
            return {
                category: category.slug as string
            }
        })

        return params || []
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching categories");
    }
}

const page = async ({ params }: {
    params: {
        category: string;
    }
}) => {
    // const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category)

    // const category = DUMMY_CATEGORIES.find((category) => category.slug === params.category)

    const getCategoryData = async () => {
        try {
            const category = await DirectusClient.request(readItems("category", {
                filter: {
                    slug: {
                        _eq: params.category,
                    }
                },
                fields: ["*", "posts.*", "posts.author.id", "posts.author.first_name", "posts.author.last_name", "posts.category.id", "posts.category.title"]
            }))

            return category?.[0];
        } catch (error) {
            console.log(error)
            throw new Error("Error fetching category");
        }
    }
    const category = await getCategoryData();

    // console.log(category)

    if (!category) {
        return <Error404 message='Error fetching category' />
    }

    const typeCorrectedCategory = category as unknown as {
        id: string;
        title: String;
        description: string;
        slug: string;
        posts: Post[];
    }

    return (
        < PaddingContainer >
            <div className='mb-10'>
                <h1 className='text-4xl font-semibold'>{typeCorrectedCategory?.title}</h1>
                <p className='text-lg text-neutral-600'>{typeCorrectedCategory?.description}</p>
            </div>
            <PostList posts={typeCorrectedCategory?.posts} />
        </PaddingContainer >
    )
}

export default page