import { Facebook, Github, Instagram, Linkedin, LucideFacebook, LucideGithub, LucideInstagram, LucideLinkedin, LucideTwitter, Twitter } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const SociaLink = ({ platform, link }: {
    platform: string,
    link: string
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
            {getIcon(platform)}
        </Link>
    )
}

export default SociaLink