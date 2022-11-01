<a name="readme-top"></a>

[![Next][Next.js]][Next-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Vercel][Vercel]][Vercel-url]
[![Apache License][license-shield]][license-url]

# ⚡ ️Tigris example app on Next.js - Todo list

A simple todo app built on [Next.js 13][Next-url] and [Tigris](https://docs.tigrisdata.com/) 
using [TypeScript client](https://docs.tigrisdata.com/typescript/), deployed on [Vercel][Vercel-url].

#### Project demo

<a href="https://tigris-nextjs-13-todo-list.vercel.app/">
    <img src="public/readme/todo_app_screenshot.jpg" alt="Todo web app">
</a>

https://tigris-nextjs-13-todo-list.vercel.app/

# ⚙️ Deploying the app

You have two options to run this Next.js app:
<details>
<summary>1. Deploy on Vercel using Tigris Cloud (Recommended)</summary>

## 📖 Vercel & Tigris Cloud (Recommended)

### Prerequisites

1. A GitHub account. [Sign up here for a free account](https://github.com) if you don't have one.
2. A Vercel account for deploying app. [Sign up here for a free account][Vercel-url] if you don't have one.
3. A Tigris account. [Sign up here for a free account](https://www.tigrisdata.com/beta#signup-form) if you don't have one.

### Instructions
1. [Tigris integration](https://vercel.com/integrations/tigris) with Vercel will automatically fetch 
access keys to populate [Environment Variables](.env.example) when deploying app. Now just hit "Deploy"
and follow instructions to fork this repo and deploy app to your Vercel account

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftigrisdata%2Ftigris-vercel-starter&project-name=todo-list-app-tigris&repo-name=todo-list-webapp-tigris&demo-title=My%20To-do%20list%20webapp&demo-description=A%20To-do%20list%20webapp%20using%20NextJS%20and%20Tigris&integration-ids=oac_Orjx197uMuJobdSaEpVv2Zn8)

:tada: All done. You should be able to use app on the URL provided by Vercel. Feel free to play around
or do a [code walkthrough](#code-walkthrough) next :tada:
</details>

<details>
<summary>2. Running Next.js server & Tigris dev environment on your local computer</summary>

## 📖 Running Next.js server & Tigris locally

### Prerequisites

1. Tigris installed on your dev computer
   1. For **macOS**: `brew install tigrisdata/tigris/tigris-cli`
   2. Other operating systems: [See installation instructions here](https://docs.tigrisdata.com/cli/installation)
2. Node.js version 16+

### Instructions

1. Clone this repo on your computer
```shell
git clone https://github.com/tigrisdata/tigris-vercel-starter
```
2. Install dependencies
```shell
cd tigris-vercel-starter
npm install
```
3. Run the Next.js server
```shell
npm run dev
```
>Note: This step will also initialize Tigris database and collection for app.

:tada: All done. You should be able to use app on `localhost:3000` in browser. Feel free to play 
around or do a [code walk-through](#code-walkthrough) next :tada:
</details>

# 👀 Code walkthrough

<details>
<summary> 📂 File structure</summary>

```text
├── package.json
├── lib
│   ├── todoItems.ts
│   ├── tigris.ts
└── pages
    ├── index.tsx
    └── api
        ├── item
        │   ├── [id].ts
        └── items
            ├── index.ts
            └── search.ts
```
</details>

<details>
<summary> 🗄️ Tigris schema definition</summary>

[lib/todoItems.ts](models/tigris/nextjsTodoApp/todoItems.ts) - The to-do list app has a single collection `todoItems` that stores the to-do items.
</details>

<details>
<summary> 🌐 Connecting to Tigris</summary>

[lib/tigris.ts](lib/tigris.ts) - Loads the environment variables you specified previously in creating a Vercel project
section and uses them to configure the Tigris client.
</details>

<details>
<summary> ❇️ API routes to access data in Tigris collection</summary>

All the Next.js API routes are defined under `pages/api/`. We have three files exposing endpoints: 

#### [`pages/api/items/index.ts`](pages/api/items/index.ts)

- `GET /api/items` to get an array of to-do items as Array<TodoItem>
- `POST /api/items` to add an item to the list

#### [`/pages/api/items/search.ts`](/pages/api/items/search.ts)

- `GET /api/items/search?q=query` to find and return items matching the given query

#### [`pages/api/item/[id].ts`](pages/api/item/[id].ts)

- `GET /api/item/{id}` to fetch an item
- `PUT /api/item/{id}` to update the given item
- `DELETE /api/item/[id]` to delete an item

</details>

# 🚀 Next steps

In a few steps, we learnt how to bootstrap a Next.js app using Tigris and deploy it on Vercel. Feel
free to add more functionalities or customize App for your use-case and learn more about 
[Tigris data platform](https://docs.tigrisdata.com/overview/) 

# 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. 
You can also simply open an issue. Don't forget to give the project a star! 
Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vercel]: https://img.shields.io/badge/vercel-F22F46?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/blog/next-13
[license-shield]: https://img.shields.io/github/license/tigrisdata/tigris-vercel-starter.svg?style=for-the-badge
[license-url]: LICENSE
