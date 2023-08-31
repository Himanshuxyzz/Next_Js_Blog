import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./PostContent";
import { getDictionary } from "@/lib/getDictionary";

interface PostProps {
    post: Post;
    layout?: "vertical" | "horizontal";
    reverse?: boolean;
    locale: string;
}

const PostCard = ({ post, layout = "horizontal", reverse = false, locale }: PostProps) => {
    // const dictionary = await getDictionary(locale);
    // console.log(post)
    return (
        <Link className={`@container ${layout == 'horizontal' ? "grid md:grid-cols-2 grid-cols-1 items-center gap-10" : "space-y-10"}`} href={`/${locale}/post/${post.slug}`}>
            {/* {post image} */}
            <Image className={`rounded-md w-full object-cover max-h-[300px] h-full ${reverse ? "md:order-last" : " "}`} alt={post.title} src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`} width={600} height={300} priority />
            {/* post content */}
            <PostContent locale={locale} post={post} />
        </Link>
    )
}

export default PostCard