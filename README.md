# Voltix: Modern Tech Store

Voltix is a small e-commerce style app built with **Next.js (App Router)** and **Firebase Authentication**. Anyone can browse the gadget catalogue, search and filter products, and open a detailed product page. Signed-in users can **add new products** and **manage (view/delete) products** on protected pages.

> Live demo: _add your Netlify URL here_ · Repository: _add your GitHub URL here_

## Key features

- **Landing page with 7 sections:** sticky responsive navbar, hero, categories, featured products, why choose us, testimonials, and footer.
- **Navbar:** logo, 4 routes (Home, Products, About, Contact), and Log in / Register buttons. After login these are replaced by a user dropdown showing the user's name, email and avatar, plus links to **Add Product**, **Manage Products** and **Log out**. Includes a mobile hamburger menu.
- **Products page (`/items`):** search bar, filters for **category**, **price range** and **rating**, sorting, active filter chips, and a responsive grid. Each card has an image, title, 1–2 line description, price, rating and a **View Details** button. Filters are kept in the URL, so links such as `/items?category=audio` work.
- **Product details (`/items/[id]`):** dynamic App Router route showing the image, title, full description, key information (price, category, release date, brand), a specifications table, related products, and a back button.
- **Authentication (Firebase):** email/password login and registration, Google sign-in, user state stored with React Context, and a redirect to `/` after login.
- **Protected pages:** `/items/add` and `/items/manage` are only available to logged-in users. Everyone else is redirected to `/login`.
- **Add Product:** form with title, short description, full description, price, stock, category, brand, release date, optional image URL and optional specifications. It has inline validation, a live preview card, a loading state and a success toast.
- **Manage Products:** stats cards, search, a table on desktop and cards on mobile, with **View** and **Delete** actions (delete asks for confirmation). There's also a "Restore demo data" button.
- **Data:** 12 seeded products. Added or deleted products are saved in `localStorage` and update every page instantly.
- **UI polish:** consistent spacing, type scale and colour palette; hover and focus states on all interactive elements; skeleton loaders; toasts; small entrance animations; a custom 404 page; accessible labels and keyboard support (Escape closes menus and dialogs).

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript, Cache Components)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons, [sonner](https://sonner.emilkowal.ski/) toasts

## Setup & installation

**Requirements:** Node.js 20+ and npm.

```bash
# 1. Clone and install
git clone <your-repo-url>
cd voltix-store
npm install

# 2. Add Firebase config
cp .env.example .env.local   # then fill in the values

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

### Firebase configuration

1. Create a project at the [Firebase console](https://console.firebase.google.com/).
2. Go to **Project settings → Your apps** and add a **Web app**. Copy its config values into `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

3. Under **Authentication → Sign-in method**, enable **Email/Password** and **Google**.
4. For deployment, add your Netlify domain (e.g. `your-site.netlify.app`) under **Authentication → Settings → Authorized domains**. Google sign-in fails on domains that aren't listed there.

If the keys are missing, the app still runs. The login and register pages show a notice explaining what to configure.

### Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the static site into `out/` |
| `npm start`     | Preview the built `out/` folder locally |
| `npm run lint`  | Run ESLint                   |

## Deploying to Netlify

The app is built as a **static export** (`output: "export"` in `next.config.ts`): `npm run build` writes a plain HTML/CSS/JS site to `out/`. No server is needed.

**Option A: drag and drop**
1. Make sure `.env.local` has your Firebase keys. They are baked into the build.
2. Run `npm run build`.
3. Drag the `out` folder (or a zip of it) onto [app.netlify.com/drop](https://app.netlify.com/drop).

**Option B: from GitHub**
Connect the repo in Netlify and set the build command to `npm run build` and the publish directory to `out`. Add the six `NEXT_PUBLIC_FIREBASE_*` variables under **Site configuration → Environment variables**.

`public/_redirects` sends `/items/<id>` URLs for products added in the browser (which have no pre-built page) to a shared fallback page that reads the id from the URL. On Windows, `scripts/fix-export-segments.mjs` runs after each build to work around a Next.js export bug with prefetch file names.

## Route summary

| Route           | Access    | Description                                                      |
| --------------- | --------- | ---------------------------------------------------------------- |
| `/`             | Public    | Landing page: hero, categories, featured, why us, testimonials   |
| `/items`        | Public    | Product list with search, category/price/rating filters, sorting |
| `/items/[id]`   | Public    | Product details with specs and related products                  |
| `/about`        | Public    | About the store: story, stats and values                         |
| `/contact`      | Public    | Contact info and a validated contact form                        |
| `/login`        | Public    | Email/password and Google login (redirects to `/`)               |
| `/register`     | Public    | Create an account (name, email, optional photo URL, password)    |
| `/items/add`    | Protected | Add a new product (redirects to `/login` when logged out)        |
| `/items/manage` | Protected | Manage products: view and delete                                 |

## Project structure

```
src/
├─ app/                  # App Router pages (routes listed above), layout, 404
├─ components/
│  ├─ auth/              # Auth layout, login/register forms, ProtectedRoute
│  ├─ home/              # Landing page sections
│  ├─ items/             # Product card, browser, details, add form, manage table
│  ├─ layout/            # Navbar, Footer
│  └─ ui/                # Shared UI (Logo, Rating, PageHeader, dialogs, loaders)
├─ context/AuthContext.tsx   # Firebase auth state via React Context
├─ data/items.ts             # Categories + 12 seeded products
└─ lib/                      # Firebase init, localStorage item store, helpers
```
