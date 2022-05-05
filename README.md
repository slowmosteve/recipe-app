# Recipe App

This app is based on the starter template for [Learn Next.js](https://nextjs.org/learn) which has been modified to use Docker in order to containerize the app and run it on GCP Cloud Run. In addition, it uses Contentful as a content management system instead of using markdown files in the repo like the original template.

Some helpful references:
- Dockerfile based on the example here: https://github.com/vercel/next.js/blob/canary/docs/deployment.md 
- Contentful integration based on the example here: https://bholmes.dev/blog/nextjs-contentful-cms-graphql-oh-my/ 
- Markdown formatting in NextJS example: https://github.com/hashicorp/next-mdx-remote 

# Run the app with Nextjs dev server

Run the app using development server `npm run dev`

# Build and run with Docker

Build the app using `docker compose build` followed by `docker compose up`. Shut down the containers with `docker compose down`.

# Build and run on GCP Cloud Run

Build the app using `gcloud builds submit --config=cloudbuild.yaml --substitutions=_SPACE_ID=$_NEXT_PUBLIC_CONTENTFUL_SPACE_ID,_TOKEN=$_NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`

Deploy the app using `gcloud run deploy recipe-app --image gcr.io/$GCP_PROJECT_ID/recipe-app-image --update-env-vars _NEXT_PUBLIC_CONTENTFUL_SPACE_ID=$_NEXT_PUBLIC_CONTENTFUL_SPACE_ID,_NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=$_NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`