# AffProp 🏠 — Modern Real Estate & Property Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/Auth.js-v5-purple?style=flat-square&logo=next.js)](https://authjs.dev/)

**AffProp** is a full-stack real estate property listing and management application built with Next.js 16 (App Router), React 19, TypeScript, MongoDB, and Tailwind CSS. It enables users to browse, search, list, and manage residential and commercial properties seamlessly.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Project Structure](#-architecture--project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Development Server](#running-development-server)
- [Core Data Models](#-core-data-models)
- [Server Actions & API](#-server-actions--api)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## ✨ Features

- 🏠 **Property Management**: Create, edit, update, and delete real estate listings (Apartments, Houses, Villas, Commercial, Land).
- 🔍 **Search & Filtering**: Filter properties by listing type (Sale/Rent), location (city/state), price range, bedrooms, bathrooms, and property status.
- 👤 **User Authentication**: Secure credentials-based authentication powered by NextAuth.js (v5) with encrypted password storage (`bcryptjs`).
- 📊 **User & Admin Dashboard**: Personal dashboard for property owners to view listed properties, view counts, and profile metrics.
- 🖼️ **Cloudinary Image Uploads**: Integrated image uploads and optimization using `next-cloudinary`.
- ⚡ **Next.js 16 Server Actions**: Fast, type-safe data operations with automatic page revalidation (`revalidatePath`).
- 🛡️ **Validation & Type Safety**: Schema validation powered by Zod and React Hook Form.
- 🎨 **Responsive & Modern UI**: Built with Tailwind CSS v4, Lucide icons, glassmorphism cards, and interactive UI components.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org)
- **Library**: [React 19](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Database**: [MongoDB](https://www.mongodb.com) via [Mongoose 9](https://mongoosejs.com)
- **Authentication**: [NextAuth.js v5 (Auth.js)](https://authjs.dev)
- **Image Hosting**: [Cloudinary](https://cloudinary.com) (`next-cloudinary`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), Lucide React, Shadcn / Base UI
- **Form Management**: React Hook Form & Zod validation

---

## 📁 Architecture & Project Structure

```text
affprop/
├── actions/                  # Next.js Server Actions
│   ├── auth.actions.ts       # Authentication server actions
│   ├── property.actions.ts   # Property CRUD server actions
│   └── user.actions.ts       # User profile server actions
├── app/                      # Next.js App Router pages & API routes
│   ├── (auth)/               # Authentication route group (login/register)
│   ├── api/                  # API routes (Auth handlers, uploads)
│   ├── dashboard/            # Dashboard page & sub-routes
│   ├── profile/              # User profile page
│   ├── properties/           # Property listings & details pages
│   ├── globals.css           # Global CSS and Tailwind directives
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing homepage
├── components/               # React UI Components
│   ├── dashboard/            # Dashboard specific UI components
│   ├── forms/                # Form components (property & auth forms)
│   ├── ui/                   # Reusable UI primitives
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Hero section
│   ├── PropertyCard.tsx      # Property card item
│   └── PropertyDetailsPage.tsx # Detailed property view
├── constants/                # Enums and application constants
├── lib/                      # Core configuration and database connections
│   ├── db.ts                 # MongoDB connection handler
│   ├── cloudinary.ts         # Cloudinary SDK configuration
│   └── utils.ts              # Utility functions
├── models/                   # Mongoose Database Models
│   ├── property.model.ts     # Property schema & indexes
│   └── user.model.ts         # User schema & roles
├── services/                 # Database access layer / Data services
├── validations/              # Zod validation schemas
├── auth.ts                   # NextAuth core configuration
└── auth.config.ts            # NextAuth route protection config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- A [MongoDB](https://www.mongodb.com/cloud/atlas) cluster connection string
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/k1ngniizar/affprop.git
   cd affprop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables:

```env
# MongoDB Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/affprop?retryWrites=true&w=majority"

# NextAuth Secret Key (Generate using `npx auth secret` or `openssl rand -hex 32`)
AUTH_SECRET="your-nextauth-secret-key"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME="your-cloudinary-upload-preset"
```

### Running Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🗄️ Core Data Models

### Property Model ([property.model.ts](file:///c:/Users/Ebenezer/Desktop/affprop/models/property.model.ts))
- **Fields**: Title, Description, Price, Property Type (Apartment, House, Villa, Commercial, Land), Listing Type (Rent/Sale), Status (Available, Pending, Sold, Rented), Bedrooms, Bathrooms, Parking, Area ($sqft/m^2$), Location (Address, City, State, Country, Geo-coordinates), Images (Cloudinary public ID & URL), Owner reference, View count.
- **Indexes**: Full-text index on `title` & `description`, compound index on `location.city` & `location.state`, single index on `price` and `createdAt`.

### User Model ([user.model.ts](file:///c:/Users/Ebenezer/Desktop/affprop/models/user.model.ts))
- **Fields**: First Name, Last Name, Email, Password (bcrypt hash), Avatar URL, Phone Number, Role (User, Agent, Admin), Verification Status.

---

## ⚡ Server Actions & Services

The application implements type-safe Next.js Server Actions for database operations:
- [`auth.actions.ts`](file:///c:/Users/Ebenezer/Desktop/affprop/actions/auth.actions.ts) — Sign up, Login, Logout operations.
- [`property.actions.ts`](file:///c:/Users/Ebenezer/Desktop/affprop/actions/property.actions.ts) — Create property, update listing details, delete property, fetch properties by owner, search and filter listings.
- [`user.actions.ts`](file:///c:/Users/Ebenezer/Desktop/affprop/actions/user.actions.ts) — Profile updates and user metadata retrieval.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode on `http://localhost:3000` |
| `npm run build` | Builds the app for production deployment |
| `npm run start` | Starts the production server after building |
| `npm run lint` | Runs ESLint to check for code style and syntax issues |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

