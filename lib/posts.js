import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// export function getSortedPostsData1() {
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

export function getSortedPostsData() {
  // instantiate GCP storage client
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage({keyFilename: '.certs/recipe-app-sa.json'});
  const recipeBucket = storage.bucket(process.env.RECIPE_BUCKET);
  const recipePosts = new Map();

  async function listFiles() {
    // Lists files in the bucket
    const [files] = await recipeBucket.getFiles();
    

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
      const fileInstance = recipeBucket.file(file.name);
      let fileContents = fileInstance.download(function(err, contents) {
        // console.log("file err: "+err);  
        // console.log("file data: "+contents);   
        return contents;
      }); 

      // let matterResult = matter(fileContents);
      recipePosts.set(
          {
            id: file.name.replace(/\.md$/, ''),
            content: fileContents
          }
        )
    });
  }
  listFiles();
  return JSON.stringify(recipePosts);
}

  // const filenames = listFiles().catch(console.error);

//   // Get file names under /posts
//   const allPostsData = filenames.map(filename => {
//     // Remove ".md" from file name to get id
//     const id = file.name.replace(/\.md$/, '')

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, filename)
//     // const fileContents = fs.readFileSync(fullPath, 'utf8')
//     const file = recipeBucket.file(filename);

//     fileContents = file.get();

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

export function getAllPostIds() {
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage({keyFilename: '.certs/recipe-app-sa.json'});
  const recipeBucket = storage.bucket(process.env.RECIPE_BUCKET);

  async function listFiles() {
    // Lists files in the bucket
    const [files] = await recipeBucket.getFiles();
    return [files];
  }

  const fileNames = listFiles();
    
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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

// export function getAllPostIds2() {
//     const fileNames = fs.readdirSync(postsDirectory)
  
//     // Returns an array that looks like this:
//     // [
//     //   {
//     //     params: {
//     //       id: 'ssg-ssr'
//     //     }
//     //   },
//     //   {
//     //     params: {
//     //       id: 'pre-rendering'
//     //     }
//     //   }
//     // ]
//     return fileNames.map(fileName => {
//       return {
//         params: {
//           id: fileName.replace(/\.md$/, '')
//         }
//       }
//     })
//   }

  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }