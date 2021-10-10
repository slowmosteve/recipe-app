import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'


export async function getStaticProps() {
  const jsonAllPostsData = await getSortedPostsData()
  const allPostsData = JSON.stringify(jsonAllPostsData.sortedPosts)
  console.log('getStaticProps: '+allPostsData)
  return {
    props: {
      allPostsData
    }
  }
}

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>This website is a way for me to keep track of recipes while learning Next.js</p>
        <p>
          (Based on the tutorial {' '}
          <a href="https://nextjs.org/learn/basics/create-nextjs-app">here</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recipes</h2>
        <ul className={utilStyles.list}>
          {allPostsData}
          
          {/* ARRAY APPROACH */}
          {/* {allPostsData.array.forEach(element => {
            <li className={utilStyles.listItem} key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          })} */}
          {/* ORIGINAL APPROACH */}
          {/* {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))} */}
        </ul>
      </section>
    </Layout>
  )
}