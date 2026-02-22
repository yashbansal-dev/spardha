"use client";

import { useState, useEffect } from "react";
import SpardhaLoader from "@/components/ui/SpardhaLoader";
import { usePathname } from "next/navigation";

export default function ClientLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(pathname === "/");

    useEffect(() => {
        // Strictly show loader ONLY on homepage
        if (pathname === "/") {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

        // Scroll to top on navigation
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <SpardhaLoader
                    onComplete={handleComplete}
                    className="z-[9999]"
                />
            )}
            {children}
        </>
    );
}
