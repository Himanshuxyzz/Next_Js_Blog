import { Facebook, Github, Instagram, Linkedin, LucideFacebook, LucideGithub, LucideInstagram, LucideLinkedin, LucideTwitter, Twitter } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const SociaLink = ({ platform, link, isShareURL = false }: {
    platform: string,
    link: string
    isShareURL?: boolean
}) => {
    const getIcon = (platform: string) => {
        switch (platform) {
            case 'facebook':
                return <LucideFacebook size={18} />;
            case 'twitter':
                return <LucideTwitter size={18} />;
            case 'instagram':
                return <LucideInstagram size={18} />;
            case 'github':
                return <LucideGithub size={18} />;
            case 'linkedin':
                return <LucideLinkedin size={18} />;
        }
    }
    return (
        <Link href={link}>
            <div className={`${isShareURL ? 'py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-800 hover:text-neutral-100 duration-100 ease-in-out transition-colors' : ''}`}>{getIcon(platform)}</div>
        </Link>
    )
}

export default SociaLink