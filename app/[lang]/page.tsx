import Error404 from "@/components/404/Error404";
import CTAcard from "@/components/elements/CTAcard";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostCard from "@/components/post/PostCard";
import PostList from "@/components/post/PostList";

import { DUMMY_POSTS } from "@/DUMMY_DATA";
import DirectusClient from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk/rest";
import { notFound } from "next/navigation"

export default async function Home({ params }: {
  params: {
    lang: string;
  }
}) {
  console.log(params)
  const getAllPosts = async () => {
    try {
      const posts = await DirectusClient.request(readItems("post", {
        fields: ["*", "author.id", "author.first_name", "author.last_name", "category.id", "category.title"],
      }));

      return posts as any;
    }
    catch (err) {
      console.log(err)
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts()

  // console.log(posts)

  if (!posts) {
    return <Error404 message="Error fetching posts" />
    // notFound()
  }



  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} />
        <PostList posts={posts.filter((_post: any, index: any) => index > 0 && index < 3)} />
        <CTAcard />
        <PostCard post={posts[3]} reverse={true} />
        <PostList posts={posts.filter((_post: any, index: any) => index > 3 && index < 6)} />
      </main>
    </PaddingContainer>

  )
}
