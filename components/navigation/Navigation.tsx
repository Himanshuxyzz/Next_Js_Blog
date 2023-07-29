import Link from "next/link";
import React from "react";

// component

import PaddingContainer from "../layout/PaddingContainer";

const Navigation = () => {
    return (
        <div className="border-b sticky top-0 left-0 right-0 bg-opacity-50 backdrop-blur-md">
            <PaddingContainer>
                <div className="py-5 flex items-center justify-between">
                    {/* Logo */}
                    <Link className="font-bold text-lg" href="/">Explorer</Link>
                    {/* Nav_items */}
                    <nav>
                        <ul className="flex items-center gap-4 text-neutral-600 font-semibold">
                            <li>
                                <Link href="/cities">Cities</Link>
                            </li>

                            <li>
                                <Link href="/experiences">Experiences</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </PaddingContainer>
        </div>
    );
};

export default Navigation;
