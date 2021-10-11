// CONTENTFUL APPROACH
export async function getSortedPostsData() {
  // grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // send a request to Contentful (using the same URL from GraphiQL)
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
	const resData = await res.json()
  const sortedPosts = resData.data.recipeCollection.items
  console.log('posts.js getSortedPostsData sortedPosts: '+JSON.stringify(sortedPosts))
  return {
    sortedPosts: sortedPosts
  }
}

export async function getAllPostIds() {
  // grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // send a request to Contentful (using the same URL from GraphiQL)
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
                slug
              }
            }
          }
				`,
        })
      }
    );
  // grab the data from our response
	const resData = await res.json()
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
  const allPostIds = resData.data.recipeCollection.items
  console.log('posts.js getAllPostIds allPostIds: '+JSON.stringify(allPostIds))
  return allPostIds.map(postId => {
    return {
      params: {
        id: postId.slug
      }
    }
  })
}

export async function getPostData(id) {
  console.log('posts.js getPostData id: '+id)

  // grab our Contentful keys from the .env file
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
	const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  // send a request to Contentful (using the same URL from GraphiQL)
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
            recipeCollection (where: 
              { slug: "${id}" }
            )
            {
              items 
              {
                title
                slug
                date
                recipeText
              }
            }
          }
				`,
        })
      }
    );
  // grab the data from our response
	const resData = await res.json()
  // console.log('getPostData resData: '+JSON.stringify(resData))

  const postData = resData.data.recipeCollection.items[0]
  // console.log('getPostData postData: '+ JSON.stringify(postData))
  return {
    postData: postData
  }
}