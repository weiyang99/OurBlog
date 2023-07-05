"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from 'next/navigation'

const Nav = () => {
    const { data: session } = useSession();
    const path = usePathname();

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <nav className="navbar" style={{ borderBottom: path === '/' ? 'white 1px solid' : 'black 1px solid', background: path === '/' ? 'none' : 'white' }}>
            <Link href='/' className='font-euphoria' style={{ color: path === '/' ? 'white' : 'black' }}>
                Our Blog
            </Link>
            <div className="absolute right-5" >
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-post' className='gray_btn'>
                            Create Post
                        </Link>

                        <button type='button' onClick={signOut} className='gray_btn'>
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='gray_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav