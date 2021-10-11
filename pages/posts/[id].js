import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'


export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    const postData2 = postData.postData[0]
    console.log('[id].js getStaticProps postData: '+JSON.stringify(postData2))
    return {
        props: {
          postData2
        }
    }
}

export async function getStaticPaths() {
    const paths = await getAllPostIds()
    // console.log('[id].js getStaticPaths paths: '+JSON.stringify(paths))
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData }) {
    console.log('[id].js Post postData: '+JSON.stringify(postData))
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            {/* <Date dateString={postData.date} /> */}
            <p> {postData.recipeText} </p>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: postData.recipeText }} /> */}
        </article>
      </Layout>
    )
  }