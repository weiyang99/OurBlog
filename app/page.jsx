"use client";

// import { Mouse } from '@components'
import { useSession } from 'next-auth/react'
import Link from 'next/link';

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      <section className='hero'>

        {session?.user ?
          <h1 className='hero_head'>
            Welcome Back!
          </h1>
          :
          <h1 className='hero_head'>
            Share Your Stories Today
          </h1>
        }

        <p className='hero_desc'>
          Join us in this journey & share your life experiences with everyone
        </p>

        <Link href='/feed' className='feed_btn'>
          Feeds
        </Link>

        {/* <Mouse /> */}
      </section>
    </>
  )
}

export default Home