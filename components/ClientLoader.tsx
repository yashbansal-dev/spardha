"use client";

import { useState, useEffect } from "react";
import SpardhaLoader from "@/components/ui/SpardhaLoader";
import { usePathname } from "next/navigation";

export default function ClientLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Trigger loading screen on every navigation
        setIsLoading(true);

        // Scroll to top on navigation to simulate fresh page load
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
