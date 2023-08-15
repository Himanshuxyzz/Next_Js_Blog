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
        <Link className={`${layout == 'horizontal' ? "grid grid-cols-2 items-center gap-10" : "space-y-10"}`} href={`/post/${post.slug}`}>
            {/* {post image} */}
            <Image className={`rounded-md w-full object-cover max-h-[300px] ${reverse ? "order-last" : " "}`} alt={post.title} src={post.image} width={600} height={300} />
            {/* post content */}
            <PostContent post={post} />
        </Link>
    )
}

export default PostCard