# 🌫️ Mistery Scent

> *Where every fragrance tells a story.*

A premium fragrance e-commerce platform built for scent enthusiasts and collectors. Mistery Scent offers a curated selection of niche, designer, and oriental perfumes with a seamless shopping experience.

---

## ✨ Features

- 🛍️ **Product Catalog** — Browse fragrances by family, brand, gender, and occasion
- 🔍 **Smart Search & Filters** — Filter by notes, family (Oriental, Woody, Fresh, Floral), price range, and badge type
- 🧴 **Fragrance Profiles** — Detailed breakdowns of top, heart, and base notes for every scent
- 💳 **Secure Checkout** — Fast and secure payment flow with multiple payment options
- ❤️ **Wishlist** — Save your favourite scents for later
- 📦 **Order Tracking** — Real-time updates from dispatch to delivery
- 🎁 **Gift Wrapping** — Premium packaging option available at checkout
- 📱 **Fully Responsive** — Optimised for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js / Next.js |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT + bcrypt |
| Payments | Stripe |
| Image Storage | Cloudinary |
| Deployment | Vercel (frontend) + Railway (backend) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mistery-scent.git
cd mistery-scent
```

2. **Install dependencies**

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Run the development servers**

```bash
# Run backend
cd server
npm run dev

# Run frontend (in a new terminal)
cd client
npm run dev
```

5. **Open in your browser**

```
http://localhost:3000
```

---

## 📁 Project Structure

```
mistery-scent/
├── client/                   # Frontend (Next.js)
│   ├── components/           # Reusable UI components
│   │   ├── layout/           # Header, Footer, Navbar
│   │   ├── product/          # Product cards, detail view
│   │   └── ui/               # Buttons, inputs, modals
│   ├── pages/                # Next.js pages
│   │   ├── index.js          # Home page
│   │   ├── shop/             # Product listing
│   │   ├── product/[id].js   # Product detail
│   │   ├── cart.js           # Shopping cart
│   │   └── checkout.js       # Checkout flow
│   ├── styles/               # Global styles
│   └── utils/                # Helpers and API calls
│
├── server/                   # Backend (Node.js + Express)
│   ├── controllers/          # Route handlers
│   ├── models/               # MongoDB schemas
│   │   ├── Product.js        # Fragrance model
│   │   ├── User.js           # User model
│   │   └── Order.js          # Order model
│   ├── routes/               # API routes
│   ├── middleware/           # Auth, error handling
│   └── config/               # DB connection, Cloudinary
│
└── README.md
```

---

## 🌸 Fragrance Data Model

Each product in the catalog follows this structure:

```javascript
{
  name: "Dior Sauvage EDP",
  brand: "Dior",
  family: "Aromatic Fougère",
  badge: "Bestseller",         // e.g. New, Limited, Bestseller
  gender: "Men",
  concentration: "EDP",        // EDT, EDP, Parfum
  notes: {
    top: ["Bergamot", "Pepper"],
    heart: ["Lavender", "Geranium", "Sichuan Pepper"],
    base: ["Ambroxan", "Cedarwood", "Vetiver"]
  },
  sizes: [30, 60, 100],        // in ml
  price: 225000,               // in local currency (UGX)
  stock: 12,
  images: ["url1", "url2"],
  description: "...",
  rating: 4.8,
  reviews: []
}
```

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Add new product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:id` | Get order by ID |
| GET | `/api/orders/my-orders` | Get user's orders |
| PUT | `/api/orders/:id/status` | Update order status (Admin) |

---

## 🧪 Running Tests

```bash
cd server
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For inquiries, partnerships, or support:

- 📧 Email: hello@misteryscent.com
- 🌍 Website: [www.misteryscent.com](https://www.misteryscent.com)
- 📸 Instagram: [@misteryscent](https://instagram.com/misteryscent)

---

<p align="center">
  Made with 🖤 by the Mistery Scent Team
</p>