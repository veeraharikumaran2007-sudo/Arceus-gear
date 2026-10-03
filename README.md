# ⚡ ARCEUS GEAR // Next-Gen Gaming Hardware Store

[![Live Production Store](https://img.shields.io/badge/Live_Store-arceusgear.web.app-00f0ff?style=for-the-badge&logo=firebase&logoColor=white)](https://arceusgear.web.app)
[![Security Status](https://img.shields.io/badge/Security-Production_Hardened-emerald?style=for-the-badge&logo=googlecloud&logoColor=white)](https://arceusgear.web.app)
[![AI Architecture](https://img.shields.io/badge/INFY_AI-NVIDIA_30B_Reasoning-76b900?style=for-the-badge&logo=nvidia&logoColor=white)](https://arceusgear.web.app)

> **Developed for INFYHACKATHON 2.0 (Infynux Academy)**  
> 🌐 **Live Production Website:** [https://arceusgear.web.app](https://arceusgear.web.app)  
> A complete, production-grade e-commerce application engineered with **React 19, TypeScript, Tailwind CSS, 3D Parallax Hardware Physics, Node.js, Express, Prisma ORM, and INFY AI Copilot**.

---

## 🎮 1. Live Deployment & Servers

* 🚀 **Live Production Website (Firebase Global CDN):**  
  👉 **[https://arceusgear.web.app](https://arceusgear.web.app)** 👈
* 💻 **Local Development Web App:** [http://localhost:5173](http://localhost:5173)
* ⚙️ **Backend API Server:** [http://localhost:5000](http://localhost:5000)
* 🩺 **Backend Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛡️ 2. Quick Demo Credentials (For Judges)

The application includes convenient **1-Click Judge Quick Login** buttons in the navbar header, or you can log in manually:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@arceus.com` | `Admin@123` | Full Mission Control, Product CRUD, Order Status Workflow, User Roles |
| **Customer** | `gamer@arceus.com` | `Gamer@123` | Cart, Wishlist, Reviews, 5-Step Simulated Checkout, Order History |

---

## 🚀 3. Features Aligned with Problem Statement

### A. Customer Application (Mandatory - 25% + 20% Marks)
* **Product Discovery:**
  * Categorized discovery (Gaming Laptops, Custom Rigs & GPUs, Peripherals, Consoles).
  * Real-time search with instant keyboard matching.
  * Multi-dimensional filtering: Category, Price Slider (₹5,000 to ₹3,50,000), In-Stock Only toggle, and Sort by Price / Rating / Latest.
* **Product Details:**
  * Multi-angle high-res image gallery with interactive thumbnail switcher.
  * Real-time stock status indicator (`In Stock`, `Only X Left!`, `Sold Out`).
  * Structured hardware specification tables (GPU TGP, RAM frequency, Panel response time, Switch actuation).
  * Verified Customer Reviews section with dynamic star rating and review submission.
* **Shopping & Cart:**
  * Sliding drawer cart with live item count, stock limit validation, and quantity steppers.
  * Dynamic subtotal and estimated total calculation.

### B. Simulated Checkout Flow (Problem Statement Section 7)
* Strict adherence to: **No real payment gateway needed**!
* Seamless 5-Stage Wizard:
  1. **Cart Summary:** Review line items and quantities.
  2. **Shipping Address:** Validated customer contact, street address, and PIN code.
  3. **Order Review:** Final summary breakdown.
  4. **Payment Simulation:** Choose between Instant Mock UPI (GPay/PhonePe QR), Mock Credit/Debit Card (Visa/Mastercard 4242), or Simulated COD. Includes authentic simulated sandbox transaction verification latency.
  5. **Order Confirmation:** Celebratory confetti animation (`canvas-confetti`), unique order number generation (e.g. `AG-XXXX-XXX`), and instant database stock decrement in an atomic transaction!

### C. Admin Panel (Mandatory Challenge - 25% Marks)
* Switch to Admin Control Center directly from user menu or demo login.
* **Dashboard Overview:**
  * 5 Key Performance Indicators: Total Revenue, Total Orders, Active Hardware Units, Registered Users, and Low-Stock Alerts.
  * **Low-Stock Alert Section:** Highlights all products with stock $\le 5$ with a 1-click **Refill Stock** modal.
  * Recent orders table.
* **Product Management (CRUD):**
  * Create new hardware with dynamic Key-Value Specifications builder (e.g. GPU, RAM, Switch Type).
  * Edit price, discount price, and stock levels.
  * Delete hardware with confirmation safeguards.
* **Order Status Workflow:**
  * Dropdown state transitions matching PDF requirements:  
    `Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered`
* **User Management:**
  * View registered users, their order counts, and toggle between `CUSTOMER` and `ADMIN` roles.

### D. INFY AI Copilot (15% Innovation Marks)
* Not just a generic chatbot! **Useful AI** connected to live SQLite database:
  * **Natural Language Queries:** *"Find gaming laptop under 80000 with 16GB RAM"*.
  * **Side-by-Side Product Comparison:** Select up to 3 products to compare specs in a side-by-side matrix with an instant INFY AI architectural verdict explaining why one hardware is priced higher than another.
  * **In-Chat Product Cards:** Interactive product cards render directly inside the chat with direct "Add to Cart" and "Compare" actions.

### E. Security & Reliability (15% Marks)
* Password hashing using **bcrypt** (salt rounds: 10).
* Stateless **JWT Authentication** with expiration.
* Role-based route guard middleware (`requireAdmin`, `authenticateToken`).
* Atomic transactions (`prisma.$transaction`) ensuring inventory cannot go negative.
* Input validation and graceful empty/loading states.

---

## 🛠️ 4. Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Backend:** Node.js, Express, TypeScript, tsx, CORS, dotenv
- **Database & ORM:** SQLite with Prisma ORM
- **Authentication:** JWT + bcryptjs
- **AI Integration:** Google Gemini API (`@google/generative-ai`) with intelligent local catalog fallback engine

---

## 📦 5. Running the Project Locally

### Prerequisites
- Node.js (v18+) & npm

### Starting Backend:
```bash
cd server
npm install
npx prisma db push
npm run seed
npm run dev
```

### Starting Frontend:
```bash
cd client
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!
