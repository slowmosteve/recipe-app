# Recipe App

This app is based on the starter template for [Learn Next.js](https://nextjs.org/learn) and it has been modified to use Docker based on the example here https://github.com/vercel/next.js/blob/canary/docs/deployment.md 

# Run the app with Nextjs dev server

Run the app using development server `npm run dev`

# Build and run with Docker

Build the app using `docker build . -t recipe-app`

Run the app using `docker run -p 3000:3000 recipe-app`

# Build and run on GCP Cloud Run

Build the app using `gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/recipe_app`

Deploy the app using `gcloud run deploy recipe-app --image gcr.io/$GCP_PROJECT_ID/recipe_app`