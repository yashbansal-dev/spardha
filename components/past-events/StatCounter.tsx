'use client';

import React from 'react';

interface Props {
    value: string;
}

export default function StatCounter({ value }: Props) {
    return (
        <div className="text-2xl md:text-3xl font-black font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {value}
        </div>
    );
}
