import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./PostContent";

interface PostProps {
    post: Post;
    layout?: "vertical" | "horizontal";
    reverse?: boolean;
}

const PostCard = ({ post, layout = "horizontal", reverse = false }: PostProps) => {
    return (
        <Link className={`@container ${layout == 'horizontal' ? "grid md:grid-cols-2 grid-cols-1 items-center gap-10" : "space-y-10"}`} href={`/post/${post.slug}`}>
            {/* {post image} */}
            <Image className={`rounded-md w-full object-cover max-h-[300px] h-full ${reverse ? "md:order-last" : " "}`} alt={post.title} src={post.image} width={600} height={300} priority />
            {/* post content */}
            <PostContent post={post} />
        </Link>
    )
}

export default PostCard