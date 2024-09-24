Features
User Authentication: Sign up and sign in via email & password or with a provider using NextAuth
Recipe Management: Create, modify, and delete recipes.
Each recipe includes a name, image, description, ingredients, and instructions.
Recipe Filtering: Filter recipes by name, ingredients, or tags.
Responsive UI: Designed using TailwindCSS for mobile and desktop views.
Form Validation: Ensured through react-hook-form and zod.
Tech Stack
Core Technologies
Next.js: Version 14.2.13 (App Router) with server-side rendering and React Server Components.
TypeScript: Ensuring strong typing throughout the app.
Prisma: Used with a database (PostgreSQL, MySQL, or others).
Authentication: Handled by supabase-auth or next-auth with @next-auth/prisma-adapter.
TailwindCSS: Version 3.4.12 for utility-first CSS design.
react-hook-form: Version 7.53.0 for form handling and validation.
zod: Version 3.23.8 for schema validation in forms and API responses.
shadcn/ui: Custom UI components built with Radix and Tailwind.
Additional Libraries
Axios: For HTTP requests.
@tanstack/react-query: Used for data fetching and caching.
Lucide-React: Icon library.
Lodash: For utility functions (although native TypeScript is preferred).
Bcrypt: For password hashing.
Getting Started
Prerequisites
Node.js (v16 or higher)
A database (e.g., PostgreSQL, MySQL) with Prisma configured.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/recipe-management-app.git
Install dependencies:

bash
Copy code
cd recipe-management-app
npm install
Set up your environment variables: Create a .env file in the root of your project and include the following:

bash
Copy code
npx prisma migrate dev --name init
Run the development server:

bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser to view the application.

Available Scripts
npm run dev: Runs the development server.
npm run build: Builds the app for production (disables linting).
npm run start: Starts the app in production mode.
npm run lint: Lints the project using ESLint.
npm run lint:fix: Fixes linting issues automatically.
npm run format: Formats the codebase using Prettier.
Deployment
This app can be deployed using:

Vercel
Netlify
Firebase
GitHub Pages
For deployment instructions, follow the respective platform guides.

Demo
You can view the deployed app at: https://your-deployed-app-url.com

Code Quality
This project includes:

ESLint: For linting and enforcing code standards.
Prettier: For code formatting.
TypeScript Config: Ensures type safety throughout the project.
Git Guidelines
This project follows Conventional Commits for commit messages.
