# Hello, I'm Muhammad Syifa Surya Saputra 👋

As a Front-End Developer with a strong passion for Software Engineering, I focus on creating visually appealing and highly functional digital experiences. My work emphasizes the use of cutting-edge web technologies to deliver user-centered solutions. Through this website, I share my projects, as well as valuable insights and knowledge in the field. I am always open to new collaborations and connections, so please feel free to reach out to me through the contact options below :

- **Email**: syifamuhammad3139@example.com
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/muhammadsyifasuryasaputra/)
- **GitHub**: [GitHub Profile](https://github.com/Muhammadsyifasurya)

---

## 🌐 About This Website

**ShopSmart** is a responsive online store built with React and Next.js. It features a modern design with various interactive sections, including a product listing page, user authentication (login/register), product categories, and a shopping cart. The website is optimized for a seamless experience across devices, ensuring users can browse, filter, and manage products with ease.

Key features include:

- A dynamic product listing fetched from an API
- User authentication (login and registration)
- Category-based product filtering
- Detailed product pages
- Shopping cart management

The application leverages modern web technologies for enhanced performance, using **server-side rendering (SSR)** with Next.js for fast loading times and improved SEO.

[View the live version here](https://mampirshopv2.vercel.app/)

## New Features Implemented

- **Next.js Integration**: Integrated Next.js for optimized routing and efficient server-side rendering (SSR).
- **User Authentication**: Implemented login and registration functionalities using a provided API, allowing users to securely access their accounts.
- **Product Listings**: Developed pages to display products fetched from the API with detailed images, descriptions, and prices.
- **Category Filtering**: Enabled product filtering based on categories to improve product discoverability.
- **Shopping Cart**: Created a cart system where users can add products, view their selections, and manage the cart.
- **Unit Testing**: Wrote unit tests for key components using Jest and the Next.js Testing Library to ensure functionality and reliability.

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🧪 Testing Methodologies Used

### Types of Testing:

1. **Unit Testing**:
   - Focuses on testing individual functions or components to ensure they behave as expected.
   - Example: Verifying that the login function correctly validates user credentials.
2. **Integration Testing**:
   - Ensures that components work together seamlessly.
   - Example: Testing the interaction between the product listing and shopping cart.

### Tool Used:

- **Jest**: A JavaScript testing framework designed for simplicity and support for React applications.

### 🛠️ Setting Up Jest

Jest is a powerful testing framework for JavaScript applications. This guide explains how to install Jest, configure it, and write your first tests.

1.  **Quickstart**:
    To quickly set up Jest, run the following command to generate a new project with Jest pre-configured:

    ```bash
    npx create-next-app@latest --example with-jest with-jest-app
    ```

2.  **Manual Setup**:
    If you prefer setting up Jest manually, follow these steps:

    a. Install Jest and Dependencies

    Install jest and related packages as development dependencies:

    ```bash
    npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
    ```

    b. Generate a Jest Configuration File

    ```bash
    npm init jest@latest
    ```

    c. Update the Jest Configuration

    ```typescript
    import type { Config } from "jest";
    import nextJest from "next/jest";

    const createJestConfig = nextJest({
      // Provide the path to your Next.js app to load next.config.js and .env files
      dir: "./",
    });

    const config: Config = {
      coverageProvider: "v8", // Specify coverage provider
      testEnvironment: "jsdom", // Use jsdom for testing browser-like environments
      // Optional: Add setup scripts to run before each test
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    };

    export default createJestConfig(config);
    ```

    d. Write Your First Test
    Create a test file, for example: `__tests__/example.test.js`, and add the following code:

    ```typescript
    import { render, screen } from "@testing-library/react";
    import Home from "../pages/index";
    test("renders the home page", () => {
      render(<Home />);
      const heading = screen.getByText(/welcome to next\.js/i);
      expect(heading).toBeInTheDocument();
    });
    ```

3.  **Run Test**:

    ```bash
    npm test
    ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

````

```

```

```

```

```

```

```

```
````
