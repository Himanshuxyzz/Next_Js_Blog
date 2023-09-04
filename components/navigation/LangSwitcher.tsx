"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const LangSwitcher = ({ locale }: {
    locale: string;
}) => {
    // console.log(locale)


    const targetLanguage = locale === "en" ? "de" : "en";
    const pathName = usePathname()

    const redirectTarget = () => {
        if (!pathName) return "/"
        const segments = pathName.split("/");
        // console.log(segments)
        segments[1] = targetLanguage;
        return segments.join("/")
    }

    return (
        // <Link href={locale === "en" ? "/de" : "/en"}>{targetLanguage.toUpperCase()}</Link >
        <Link href={redirectTarget()} locale={targetLanguage}>{targetLanguage.toUpperCase()}</Link >


    )
}

export default LangSwitcher