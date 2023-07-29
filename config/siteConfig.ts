export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "Welcome to my minimal and travel blog, where i share my journey to explore the places.",
  currentlyAt: "Bhilai",
  socialLinks: {
    twitter: "https://twitter.com/himanshu_toppo",
    github: "https://github.com/Himanshuxyzz",
    linkedin: "https://www.linkedin.com/in/himanshu-toppo",
    instagram: "https://instagram.com/savage_launda__",
  },
};

export default siteConfig;
