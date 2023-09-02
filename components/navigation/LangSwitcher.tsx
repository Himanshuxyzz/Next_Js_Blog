"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const LangSwitcher = ({ locale }: {
    locale: string;
}) => {
    // console.log(locale)
    const pathName = usePathname()

    const targetLanguage = locale === "en" ? "de" : "en";
    return (
        <Link href={locale === "en" ? "/de" : "/en"}>{targetLanguage.toUpperCase()}</Link >
    )
}

export default LangSwitcher