import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./PostContent";

interface PostProps {
    post: Post;
}

const PostCard = ({ post }: PostProps) => {
    return (
        <Link className="grid grid-cols-2 items-center gap-10" href={`/post/${post.slug}`}>
            {/* {post image} */}
            <Image className="rounded-md w-full object-cover max-h-[300px]" alt={post.title} src={post.image} width={600} height={300} />
            {/* post content */}
            <PostContent post={post} />
        </Link>
    )
}

export default PostCard