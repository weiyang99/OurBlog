import { Feed, Mouse } from '@components'

const Home = () => {
  return (
    <>
      <section className='hero'>
        <h1 className='hero_head'>
          Share Your Stories Today
        </h1>
        <p className='hero_desc'>
          Join us in this journey & share your life experiences with everyone
        </p>
        <Mouse />
      </section>
      <Feed />
    </>
  )
}

export default Home