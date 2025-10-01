# Booking Manager

## Table Of Contents
- [About The Project](#about-the-project)
- [Installation](#installation)
- [Features](#features)
- [Important](#important)

## About The Project
Booking manager is a proof-of-concept frontend application built with React. This project was created as part of a
job interview assignment to demonstrate frontend development knowledge.

### Built With
- **Frontend**: React + TypeScript
- **UI Library**: PrimeReact
- **Styling**: Tailwind CSS
- **Mock API**: MSW (Mock Service Worker)

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Installation
1. Clone the repository
```bash
  git clone https://github.com/BlazSerdt/Booking-Manager-Assignment
  cd Booking-Manager-Assignment
```

2. Install dependencies
```bash
  npm install
```

3. Start the development server
```bash
  npm run dev
```

4. Open the app in your browser at http://localhost:3000

## Features
- **In Memory Storage And Mock API**
  - Mock API, that handles frontend requests
  - In memory storage, meaning data is lost upon refresh
  - 3 seeded accounts: 1 super admin account, 2 tenant admin accounts
  - Each account has some seeded data, to have more data to showcase different features
- **Tenant Admin role**
  - Can create locations and manage them
  - Can create reservations per location and manage them
- **Super Admin Role**
  - Can view all locations and reservations from all users
  - Cannot create, edit or delete locations/reservations
- **User Authentication (Mocked)**
  - Register and login functionality with mock authentication
- **Location Management**
  - View, add, edit and delete locations
  - Clicking on location opens details page, which also contains reservations and QR code
- **Reservation Management**
  - View, add, edit and delete reservations, specific to location
  - Available in location details
- **Dashboard**
  - Shows basic statistics, recent locations and recent reservations
- **Chat (UI)**
  - Chat interface with seeded contacts
  - User can send messages, which get stored in memory and displayed

## Important

> ⚠️  **SEEDED ACCOUNTS**
> 1. **Tenant Admin 1**
>    - Email: tenant_admin@mail.com
>    - Password: tenantadmin

> 2. **Tenant Admin 2**
>    - Email: tenant_admin2@mail.com
>    - Password: tenantadmin2

> 3. **Super Admin**
>    - Email: super_admin@mail.com
>    - Password: superadmin
>    - Read-only access to all locations & reservations