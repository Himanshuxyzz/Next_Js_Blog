import Link from "next/link";
import React from "react";

// component

import PaddingContainer from "../layout/PaddingContainer";
import { getDictionary } from "@/lib/getDictionary";
import LangSwitcher from "./LangSwitcher";

const Navigation = async ({ locale }: {
    locale: string
}) => {
    const dictionary = await getDictionary(locale);
    return (
        <div className="border-b sticky top-0 lef t-0 right-0 bg-opacity-50 backdrop-blur-md z-[999]">
            <PaddingContainer>
                <div className="py-5 flex items-center justify-between">
                    {/* Logo */}
                    <Link className="font-bold text-lg" href={`/${locale}`}>Explorer</Link>
                    {/* Nav_items */}
                    <nav>
                        <ul className="flex items-center gap-4 text-neutral-600 font-semibold">
                            <li>
                                {/* <langSwitcher /> */}
                                <LangSwitcher locale={locale} />
                            </li>
                            <li>
                                <Link href={`/${locale}/cities`}>{dictionary.navigation.links.cities}</Link>
                            </li>

                            <li>
                                <Link href={`/${locale}/experiences`}>{dictionary.navigation.links.experience}</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </PaddingContainer>
        </div>
    );
};

export default Navigation;
