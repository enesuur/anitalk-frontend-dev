# 👋 Anitalk Frontend Dev

This guide will help you set up your Anitalk Frontend development environment and introduce you to the essential scripts for working with the project. Let's get started!

## 🛠️ Setting Up Your Development Environment

To ensure a smooth and efficient development experience with Anitalk, please align your local environment with the following core versions:

```bash
Node.js: v20.18.0^
Yarn: yarn@4.6.0^
Typescript Version: 5.1.3^
Next.js Version: 15.3.1^
```

PS: If you have a different Node.js version installed, don't worry — you can easily manage and switch between Node versions using nvm (Node Version Manager).

Using these versions will help avoid compatibility issues and guarantee the best performance while working on the project.

#### ✨ Important Note: We highly recommend using Yarn v4.6.0 for the most seamless setup. If you encounter any issues during installation, double-check your Yarn version!

## ⚙️ Project Setup

Clone the Project:

First, clone the Anitalk repository to your local machine using Git. Replace <project_repository_url> with the actual URL of the Anitalk repository.

```bash
git clone https://github.com/enesuur/anitalk-frontend-dev.git
cd anitalk
```

## Install Dependencies:

Once you've navigated into the project directory, you need to install the necessary dependencies. Anitalk uses either Yarn, npm, or pnpm as a package manager. Choose your preferred one and run the corresponding command:

```
yarn install
# or
npm install
# or
pnpm install
```

This command will download and install all the packages listed in the package.json file.

## 📜 Understanding the Scripts (package.json)

The package.json file contains a set of handy scripts to automate common development tasks. Here's a breakdown of what they do:

```bash
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "clean-start": "rimraf .next && next dev --turbopack",
  "test:unit": "jest --testPathPattern=tests/unit",
  "test:integration": "jest --testPathPattern=test/integration",
  "test:e2e": "playwright test",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## 🚀 Using the Scripts

Here's how to use these scripts with your preferred package manager:

| Command                 | Yarn                    | npm                        | pnpm                    | Description                                                            |
| ----------------------- | ----------------------- | -------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| Development Server      | `yarn dev`              | `npm run dev`              | `pnpm dev`              | Start the development server with Turbopack (http://localhost:3000) 🔥 |
| Build Production        | `yarn build`            | `npm run build`            | `pnpm build`            | Create a production-ready build of the application 📦                  |
| Start Production Server | `yarn start`            | `npm run start`            | `pnpm start`            | Launch the production server 🚀                                        |
| Lint Code               | `yarn lint`             | `npm run lint`             | `pnpm lint`             | Run ESLint to keep code clean 🧼                                       |
| Clean Start             | `yarn clean-start`      | `npm run clean-start`      | `pnpm clean-start`      | Clean `.next` folder and restart dev server ✨                         |
| Run All Tests           | `yarn test`             | `npm run test`             | `pnpm test`             | Run all unit and integration tests ✅                                  |
| Run Unit Tests          | `yarn test:unit`        | `npm run test:unit`        | `pnpm test:unit`        | Run only unit tests 🧪                                                 |
| Run Integration Tests   | `yarn test:integration` | `npm run test:integration` | `pnpm test:integration` | Run only integration tests 🧩                                          |
| Run E2E Tests           | `yarn test:e2e`         | `npm run test:e2e`         | `pnpm test:e2e`         | Run end-to-end tests with Playwright 🎭                                |
| Run Tests in Watch Mode | `yarn test:watch`       | `npm run test:watch`       | `pnpm test:watch`       | Run tests in watch mode to re-run on file changes 👀                   |

---

## 🚀 Running the Application

Now that you've set up your environment and installed the dependencies, you can finally run the Anitalk application!

Start the Development Server:

Use the dev script to start the development server. This will typically start the server at http://localhost:3000.

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
```

## ✨ View in Your Browser:

Open your web browser and navigate to http://localhost:3000 or http://127.0.0.1:3000 . You should now see the Anitalk application up and running. Any changes you make to the code will typically be reflected in the browser automatically, thanks to hot reloading.

### ❗ License

This project is publicly accessible for use and collaboration; however:

- You may NOT sell, resell, or redistribute this project or any part of it commercially without explicit written permission from Anitalk.
- Usage, modification, and personal or educational use are permitted.
- The software is provided "as is," without any warranty.

Please respect these terms to maintain fair use and protection of the project.
