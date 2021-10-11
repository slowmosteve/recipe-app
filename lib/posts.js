import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// export function getSortedPostsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(postsDirectory)
//   const allPostsData = fileNames.map(fileName => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, '')

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, fileName)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data
//     }
//   })
//   // Sort posts by date
//   return allPostsData.sort(({ date: a }, { date: b }) => {
//     if (a < b) {
//       return 1
//     } else if (a > b) {
//       return -1
//     } else {
//       return 0
//     }
//   })
// }

// CONTENTFUL APPROACH
export async function getSortedPostsData() {
  // first, grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // then, send a request to Contentful (using the same URL from GraphiQL)
  const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}`,
      {
        method: 'POST', // GraphQL *always* uses POST requests!
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`, // add our access token header
        },
        // send the query we wrote in GraphiQL as a string
        body: JSON.stringify({
          // all requests start with "query: ", so we'll stringify that for convenience
          query: `
          {
            recipeCollection(limit: 5) {
              items {
                title
                slug
                date
              }
            }
          }
				`,
        })
      }
    );
	// grab the data from our response
	const postData = await res.json()
  console.log('Posts getSortedPostsData: '+JSON.stringify(postData.data.recipeCollection.items))
  const sortedPosts = postData.data.recipeCollection.items
  return {
    sortedPosts: sortedPosts
  }
}

// export function getSortedPostsData2() {
//   // instantiate GCP storage client
//   const {Storage} = require('@google-cloud/storage');
//   const storage = new Storage({keyFilename: '.certs/recipe-app-sa.json'});
//   const recipeBucket = storage.bucket(process.env.RECIPE_BUCKET);

//   async function listFiles() {
//     // Lists files in the bucket
//     const [files] = await recipeBucket.getFiles();
//     const allPostsData = new Map();

//     files.forEach(file => {
//       // console.log(file.name);
//       const fileInstance = recipeBucket.file(file.name);
//       const fileContents = fileInstance.download(function(err, contents) {
//         // console.log("file err: "+err);  
//         // console.log("file data: "+contents);   
//         return contents;
//       }); 
//       // console.log("file data: "+fileContents);   
//       const matterResult = matter(fileInstance)
//       allPostsData.set(
//                 {
//                   id: file.name.replace(/\.md$/, ''),
//                   // // content: fileContents,
//                   // content2: 'test content',
//                   // ...matterResult.data
//                 }
//               )
//     });
//     console.log(allPostsData);
//     return allPostsData;
//   };

//   const allPostsData = listFiles();
//   return JSON.stringify(allPostsData);
// };


export async function getAllPostIds() {
  // first, grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // then, send a request to Contentful (using the same URL from GraphiQL)
  const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}`,
      {
        method: 'POST', // GraphQL *always* uses POST requests!
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`, // add our access token header
        },
        // send the query we wrote in GraphiQL as a string
        body: JSON.stringify({
          // all requests start with "query: ", so we'll stringify that for convenience
          query: `
          {
            recipeCollection {
              items {
                slug
              }
            }
          }
				`,
        })
      }
    );
  // grab the data from our response
	const postData = await res.json()
  console.log('getAllPostIds: '+JSON.stringify(postData))
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const slugs = postData.data
  return {slugs}
}

export async function getPostData(id) {
  // first, grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // then, send a request to Contentful (using the same URL from GraphiQL)
  const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}`,
      {
        method: 'POST', // GraphQL *always* uses POST requests!
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`, // add our access token header
        },
        // send the query we wrote in GraphiQL as a string
        body: JSON.stringify({
          // all requests start with "query: ", so we'll stringify that for convenience
          query: `
          {
            recipeCollection {
              items {
                slug
                id
                recipeText
              }
            }
          }
				`,
        })
      }
    );
  // grab the data from our response
	const postData = await res.json()
  console.log('getPostData: '+ JSON.stringify(postData))
  // // Use gray-matter to parse the post metadata section
  // const matterResult = matter(postData.recipeText)

  // // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)
  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml

  const post = postData.data
  return {
    post
  }
}