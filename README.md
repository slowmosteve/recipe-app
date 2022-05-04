# Recipe App

This app is based on the starter template for [Learn Next.js](https://nextjs.org/learn) which has been modified to use Docker in order to containerize the app and run it on GCP Cloud Run. In addition, it uses Contentful as a content management system instead of using markdown files in the repo like the original template.

Some helpful references:
- Dockerfile based on the example here: https://github.com/vercel/next.js/blob/canary/docs/deployment.md 
- Contentful integration based on the example here: https://bholmes.dev/blog/nextjs-contentful-cms-graphql-oh-my/ 
- Markdown formatting in NextJS example: https://github.com/hashicorp/next-mdx-remote 

# Run the app with Nextjs dev server

Run the app using development server `npm run dev`

# Build and run with Docker

Build the app using `docker build . -t recipe-app --build-arg SPACE_ID=${_NEXT_PUBLIC_CONTENTFUL_SPACE_ID} --build-arg TOKEN=${_NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`

Run the app using `docker run -p 3000:3000 recipe-app`

# Build and run on GCP Cloud Run

Note: GCP Cloud Run approach currently doesn't work because changes need to be made to enable Contentful auth

Build the app using `gcloud builds submit --config=cloudbuild.yaml --substitutions=_NEXT_PUBLIC_CONTENTFUL_SPACE_ID=$NEXT_PUBLIC_CONTENTFUL_SPACE_ID,_NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=$NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`

Deploy the app using `gcloud run deploy recipe-app --image gcr.io/$GCP_PROJECT_ID/recipe_app --update-env-vars CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN`