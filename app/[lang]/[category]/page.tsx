import React, { cache } from 'react'
import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PostList from '@/components/post/PostList';
import DirectusClient from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Error404 from '@/components/404/Error404';
import { Post } from '@/types/collection';

// export const generateStaticParams = async () => {
//     // return DUMMY_CATEGORIES.map((category) => {
//     //     return {
//     //         category: category.slug,
//     //     }
//     // })

//     try {
//         const categories = await DirectusClient.request(readItems("category", {
//             filter: {
//                 status: {
//                     _eq: "published",
//                 },
//             },
//             fields: ["slug"],
//         }))

//         const params = categories?.map((category) => {
//             return {
//                 category: category.slug as string,
//                 lang: "en",
//             }
//         });

//         const localisedParams = categories?.map((category) => {
//             return {
//                 category: category.slug as string,
//                 lang: "de"
//             }
//         });

//         // const allParams = [...params, ...localisedParams]
//         const allParams = params.concat(localisedParams ?? [])

//         return allParams || []
//     } catch (error) {
//         console.log(error)
//         throw new Error("Error fetching categories");
//     }
// }


export const generateMetadata = async ({ params: { category, lang } }: {
    params: {
        category: string;
        lang: string;
    }
}) => {
    // get data from directus
    const categoryData = await getCategoryData(category, lang)
    return {
        title: {
            absolute: categoryData?.title
        },
        description: categoryData?.description,
        openGraph: {
            title: categoryData?.title,
            description: categoryData?.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
            siteName: categoryData?.title,
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
    }

}


// get category data
const getCategoryData = cache(async (categorySlug: string, locale: string) => {
    try {
        const category = await DirectusClient.request(readItems("category", {
            filter: {
                slug: {
                    _eq: categorySlug,
                }
            },
            fields: ["*", "translations.*", "posts.*", "posts.author.id", "posts.author.first_name", "posts.author.last_name", "posts.category.id", "posts.category.title", "post.translations.*"]
        }))

        return category?.[0]

        // if (locale === "en") {
        //     return category?.[0];
        // } else {
        //     const fetchedCategory = category?.[0];
        //     const localisedCategory = {
        //         ...fetchedCategory,
        //         title: fetchedCategory.translations[0].title,
        //         description: fetchedCategory.translations[0].description,
        //         posts: fetchedCategory.posts.map((post: any) => {
        //             return {
        //                 ...post,
        //                 title: post.translations[0].title,
        //                 description: post.translations[0].description,
        //                 body: post.translations[0].body,
        //                 category: {
        //                     ...post.category,
        //                     title: fetchedCategory.translations[0].title,
        //                 },
        //             };
        //         }),
        //     };
        //     return localisedCategory;
        // }
    } catch (error) {
        console.log(error)
        throw new Error("Error fetching category");
    }
})



const page = async ({ params }: {
    params: {
        category: string;
        lang: string;
    }
}) => {
    // const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category)

    // const category = DUMMY_CATEGORIES.find((category) => category.slug === params.category)

    const locale = params.lang

    const categorySlug = params.category;

    const category = await getCategoryData(categorySlug, locale);

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
            <PostList posts={typeCorrectedCategory?.posts} locale={locale} />
        </PaddingContainer >
    )
}

export default page