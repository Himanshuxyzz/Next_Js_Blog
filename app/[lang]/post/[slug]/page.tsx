import { DUMMY_POSTS, ERRORMSG } from '@/DUMMY_DATA';
// import React from 'react'
// import { notFound } from "next/navigation"
import Error404 from '@/components/404/Error404';
import CTAcard from '@/components/elements/CTAcard';
import SociaLink from '@/components/elements/SociaLink';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PostBody from '@/components/post/PostBody';
import PostHero from '@/components/post/PostHero';
import DirectusClient from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { error } from 'console';
import { cache } from 'react';

const getPostData = cache(async (postSlug: string, locale: string) => {
    try {
        const post = await DirectusClient.request(readItems("post", {
            filter: {
                slug: {
                    _eq: postSlug,
                },
            },
            fields: ["*", "category.id", "category.title", "author.id", "author.first_name", "author.last_name", "translations.*", "category.translations.*"]
        }))

        const postData = post?.[0]

        if (locale === "en") {
            return postData;
        } else {
            const localisedPostData = {
                ...postData,
                title: postData?.translations?.[0]?.title,
                description: postData?.translations?.[0]?.description,
                body: postData?.translations?.[0]?.body,
                slug: postData?.slug,
                category: {
                    ...postData?.category,
                    title: postData?.category?.translations?.[0]?.title,
                }
            }
            // console.log(postData)
            return localisedPostData

        }

        // return post?.[0];
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching posts");
    }
})

export const generateMetadata = async ({
    params: {
        slug, lang
    }
}: {
    params: {
        slug: string;
        lang: string;
    }
}) => {
    //get post data

    const post = await getPostData(slug, lang)

    return {
        title: post?.title,
        description: post?.description,
        openGraph: {
            title: post?.title,
            description: post?.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
            siteName: post?.title,
            images: [
                {
                    url: "https://localhost:3000/opengraph-image.png",
                    width: 1200,
                    height: 628,
                },
            ],
            locale: lang,
            type: "website",
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
            languages: {
                "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
                "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
            },
        },
    }
}



export const generateStaticParams = async () => {
    // return DUMMY_POSTS.map((post) => {
    //     return {
    //         slug: post.slug
    //     }
    // })
    try {
        const posts = await DirectusClient.request(readItems("post", {
            filter: {
                status: {
                    _eq: "published",
                },
            },
            fields: ["slug"],
        }))

        const params = posts?.map((post) => {
            return {
                slug: post.slug as string,
                lang: "en",
            }
        })

        const localisedParams = posts?.map((post) => {
            return {
                slug: post.slug as string,
                lang: "de",
            }
        })

        const allParams = params?.concat(localisedParams ?? []);
        return allParams || []
    } catch (err) {
        console.log(error)
        throw new Error("Error fetching posts");
    }

}

const page = async ({ params, }: {
    params: {
        slug: string;
        lang: string;
    }
}) => {
    // const post = DUMMY_POSTS.find((post) => post.slug === params.slug)

    const locale = params.lang

    const postSlug = params.slug

    const post = await getPostData(postSlug, locale)
    // console.log(post)

    if (!post) {
        return <Error404 message='Error fetching posts' />
    }

    return (
        <PaddingContainer>
            {/* container */}
            <div className='space-y-10'>
                {!post ?
                    (<Error404 message={ERRORMSG[0]} />)
                    : (
                        <>
                            {/* post hero and social share */}
                            <PostHero post={post} locale={locale} />
                            <div className='flex gap-10 flex-col md:flex-row'>
                                <div className='relative'>
                                    <div className='flex md:flex-col gap-5 sticky top-20 items-center'>
                                        <div className='font-semibold md:hidden'>Share this content:</div>
                                        <SociaLink
                                            isShareURL platform='facebook' link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />

                                        <SociaLink
                                            isShareURL platform='twitter' link={`https://www.twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />

                                        <SociaLink
                                            isShareURL platform='linkedin' link={`https://www.linkedin.com/shareArticle?mini=true&?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />
                                    </div>
                                </div>
                                {/* <div className='h-[1200px] bg-amber-200 w-full'>Post Body</div> */}
                                <PostBody body={post.body} />
                            </div>
                        </>)}
                <CTAcard locale={locale} />
            </div>
        </PaddingContainer>
    )
}

export default page