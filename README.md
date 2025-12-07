This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Architecture notes

Node is full featured but slower compared to Edge,

if you need performance, choose Edge, if you need the access to all npm packages, choose Node

App Router is the modern routing system for Next, it default to Server Components, the result is less client side bundles, and better performance
because of its server-centeric nature compares to Pages Router

App router uses folder-based structure while Pages Router uses file-based structure

If you want performance and modern way approach, use App Router

If you want a simple website/application, Use Pages Router

## Validation approach

I used zod for validating user inputs in forms

## Libraries used and rationale

shadcnui for UI components, to develop faster

zod for validation

## Trade-offs and shortcuts taken

I've used shadcnui for UI components to develop the features even faster, shadcnui uses TailwindCSS for styling.

alse used zod for validation

## Time Spent

15+ Hours
