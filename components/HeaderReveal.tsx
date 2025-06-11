'use client';

import { useState } from 'react';

export default function HeaderReveal({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: 40,
                    zIndex: 1000,
                }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            />
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    zIndex: 1001,
                    transition: 'opacity 0.1s',
                    opacity: show ? 1 : 0,
                    pointerEvents: show ? 'auto' : 'none',
                }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
        </>
    );
}