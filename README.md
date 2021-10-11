# Recipe App

This app is based on the starter template for [Learn Next.js](https://nextjs.org/learn) which has been modified to use Docker in order to containerize the app and run it on GCP Cloud Run. In addition, it uses Contentful as a content management system instead of using markdown files in the repo like the original template.

Some helpful references:
- Dockerfile based on the example here: https://github.com/vercel/next.js/blob/canary/docs/deployment.md 
- Contentful integration based on the example here: https://bholmes.dev/blog/nextjs-contentful-cms-graphql-oh-my/ 

# Run the app with Nextjs dev server

Run the app using development server `npm run dev`

# Build and run with Docker

Build the app using `docker build . -t recipe-app`

Run the app using `docker run -p 3000:3000 recipe-app`

# Build and run on GCP Cloud Run

Note: GCP Cloud Run approach currently doesn't work because changes need to be made to enable Contentful auth

Build the app using `gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/recipe_app`

Deploy the app using `gcloud run deploy recipe-app --image gcr.io/$GCP_PROJECT_ID/recipe_app`