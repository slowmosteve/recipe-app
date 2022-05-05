import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export async function getStaticProps({ params }) {
    const postDataReponse = await getPostData(params.id)
    const postData = postDataReponse.postData
    // console.log('[id].js getStaticProps postData: '+JSON.stringify(postData))
    const mdxSource = await serialize(postData.recipeText)
    // console.log('[id].js getStaticProps mdxSource: '+JSON.stringify(mdxSource))
    return {
        props: {
          postData,
          source: mdxSource
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

export default function Post({ postData, source }) {
    // console.log('[id].js Post postData: '+JSON.stringify(postData))
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head> 
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
            <Image src={postData.recipeImage.url} width={500} height={500}/>
            <MDXRemote {...source} />
          </div>
        </article>
      </Layout>
    )
  }