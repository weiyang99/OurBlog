"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation'

const Nav = () => {
    const { data: session } = useSession();
    const path = usePathname();
    const router = useRouter();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    const handleProfileClick = () => {
        // if (post.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${session.user.id}?name=${session.user.name}`);
    };

    return (
        <nav className="navbar" style={{ borderBottom: path === '/' ? 'white 1px solid' : 'black 1px solid', background: path === '/' ? 'none' : 'white' }}>
            <Link href='/' className='font-euphoria' style={{ color: path === '/' ? 'white' : 'black' }}>
                Our Blog
            </Link>

            {/* Desktop Navigation */}
            <div className="absolute right-5 sm:flex hidden" >
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href='/create-post' className='gray_btn'>
                            Create Post
                        </Link>

                        <button type='button' onClick={signOut} className='gray_btn'>
                            Sign Out
                        </button>

                        <button type='button'>

                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                                onClick={handleProfileClick}
                            />
                        </button>
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

            {/* Mobile Navigation */}
            <div className='absolute right-5 sm:hidden flex'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <p
                                    className='dropdown_link'
                                    onClick={() => {
                                        router.push(`/profile/${session.user.id}?name=${session.user.name}`);
                                        setToggleDropdown(false);
                                    }}
                                >
                                    My Profile
                                </p>
                                <Link
                                    href='/create-post'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full gray_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
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