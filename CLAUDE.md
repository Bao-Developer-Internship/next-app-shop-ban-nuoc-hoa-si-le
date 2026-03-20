# LUXE SCENT - Website Nước Hoa Cao Cấp & Admin Dashboard

![LUXE SCENT](https://img.shields.io/badge/LUXE%20SCENT-Hương%20Thơm%20Vĩnh%20Cửu-0A3D2A?style=for-the-badge)

## 📋 Tổng Quan Dự Án

LUXE SCENT là một hệ thống thương mại điện tử cao cấp chuyên bán nước hoa, bao gồm:
- **Website công khai**: Bán lẻ và bán sỉ
- **Admin Dashboard**: Quản lý toàn diện hệ thống

**Năm phát triển:** 2026  
**Công nghệ:** Next.js 16, React 19, TypeScript, Tailwind CSS, MongoDB  
**Ngôn ngữ:** Tiếng Việt

---

## 🚀 Công Nghệ Sử Dụng

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS + Bootstrap 5
- **Fonts:** Playfair Display + Inter
- **Icons:** Material Symbols Outlined

### Backend & Database
- **Database:** MongoDB (với fallback JSON)
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Zod

### Additional Libraries
- **Charts:** Recharts
- **Notifications:** Sonner
- **State Management:** React Context API

---

## 🎨 Design System

### Bảng Màu
- **Cream White:** `#F8F4F0` - Nền sáng
- **Emerald Green:** `#0A3D2A` - Màu chủ đạo
- **Soft Gold:** `#D4AF37` - Điểm nhấn sang trọng
- **Rose Gold:** `#B76E79` - Điểm nhấn phụ
- **Background Dark:** `#0a1a14` - Nền tối (Admin)
- **Surface Dark:** `#0e1a16` - Bề mặt tối (Admin)

### Typography
- **Heading:** Playfair Display (serif) - Sang trọng, cổ điển
- **Body:** Inter (sans-serif) - Hiện đại, dễ đọc

---

## 📁 Cấu Trúc Dự Án

```
luxe-scent/
├── src/
│   ├── app/
│   │   ├── admin/                    # Admin Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Trang đăng nhập admin
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx        # Layout admin
│   │   │   │   └── page.tsx          # Dashboard tổng quan
│   │   │   ├── orders/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx          # Quản lý đơn hàng
│   │   │   ├── products/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx          # Quản lý sản phẩm
│   │   │   ├── customers/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx          # Quản lý khách hàng
│   │   │   └── collections/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx          # Quản lý bộ sưu tập
│   │   ├── api/
│   │   │   └── admin/
│   │   │       └── auth/
│   │   │           ├── login/
│   │   │           │   └── route.ts  # API đăng nhập
│   │   │           └── register/
│   │   │               └── route.ts  # API đăng ký
│   │   ├── about/
│   │   │   └── page.jsx              # Trang giới thiệu
│   │   ├── cart/
│   │   │   └── page.jsx              # Giỏ hàng & thanh toán
│   │   ├── favorite/
│   │   │   └── page.jsx              # Trang yêu thích
│   │   ├── collections/
│   │   │   ├── page.jsx              # Tổng hợp bộ sưu tập
│   │   │   ├── spring/page.jsx       # Mùa Xuân
│   │   │   ├── summer/page.jsx       # Mùa Hạ
│   │   │   ├── autumn/page.jsx       # Mùa Thu
│   │   │   └── winter/page.jsx       # Mùa Đông
│   │   ├── product/[id]/
│   │   │   └── page.jsx              # Chi tiết sản phẩm
│   │   ├── shop/
│   │   │   └── page.jsx              # Cửa hàng (lẻ)
│   │   ├── wholesale/
│   │   │   └── page.jsx              # Bán sỉ
│   │   ├── layout.tsx                # Layout chính
│   │   ├── page.jsx                  # Trang chủ
│   │   └── globals.css               # CSS toàn cục
│   ├── component/
│   │   ├── LuxuryHeader.jsx          # Header chính
│   │   ├── LuxuryFooter.jsx          # Footer chính
│   │   ├── ProductItem.jsx           # Card sản phẩm
│   │   ├── SeasonDetail.jsx          # Template trang mùa
│   │   ├── HeroSection.jsx           # Hero section
│   │   └── ScentFamilies.jsx         # Phân loại hương
│   ├── context/
│   │   └── CartContext.jsx           # Global state (Cart & Wishlist)
│   ├── lib/
│   │   ├── mongodb.ts                # MongoDB connection
│   │   └── auth.ts                   # JWT utilities
│   ├── models/
│   │   ├── User.ts                   # User model
│   │   ├── Product.ts                # Product model
│   │   └── Order.ts                  # Order model
│   └── types/
│       └── global.d.ts               # TypeScript global types
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── tailwind.config.js                # Tailwind configuration
├── package.json
├── next.config.ts
├── README.md
└── CLAUDE.md                         # File này
```

---

## 🔐 Admin Dashboard

### Trang Đăng Nhập (`/admin/login`)
**Tính năng:**
- Tab chuyển đổi Đăng nhập/Đăng ký
- JWT authentication
- Form validation
- Error handling
- Loading states
- Giao diện luxury với gradient emerald & gold

**Thông tin đăng nhập mặc định:**
```
Email: admin@luxescent.com
Password: Admin@123456
```

### Dashboard Tổng Quan (`/admin/dashboard`)
**Tính năng:**
- 4 Overview cards (Doanh thu, Đơn hàng, Sản phẩm, Khách sỉ)
- Biểu đồ doanh thu 6 tháng (Bar chart)
- Biểu đồ sản phẩm bán chạy (Pie chart)
- Bảng đơn hàng gần đây
- Real-time statistics

### Quản Lý Đơn Hàng (`/admin/orders`)
**Tính năng:**
- 2 tabs: Đơn hàng Lẻ & Đơn hàng Sỉ
- Advanced filters (Search, Status, Time, Payment method)
- Sortable table với pagination
- Status badges (Pending, Processing, Shipping, Completed, Cancelled)
- Action buttons (View, Edit)
- Summary cards (Đơn mới, Doanh thu, Chờ xử lý)

### Quản Lý Sản Phẩm (`/admin/products`)
**Tính năng:**
- Toggle view: Grid & Table
- Bulk actions (Select multiple, Hide, Delete)
- Search & filters (Season, Status)
- Product cards với:
  - Image, Name, Brand, Volume
  - Giá lẻ & Giá sỉ
  - Stock status
  - Season badge
- Edit & Delete actions

### Quản Lý Khách Hàng (`/admin/customers`)
**Tính năng:**
- 2 tabs: Khách lẻ & Khách sỉ (VIP)
- Customer cards với:
  - Avatar, Name, Email, Phone
  - Total orders & Total spent
  - Last order date
  - VIP discount tier (cho khách sỉ)
- Actions: View history, Edit, Block, Send email
- Stats cards (New customers, Average order value, Return rate)

### Quản Lý Bộ Sưu Tập (`/admin/collections`)
**Tính năng:**
- 4 seasonal cards (Xuân, Hạ, Thu, Đông)
- Product count per season
- Color-coded themes
- Quick stats
- Instructions panel

### Admin Layout
**Tính năng:**
- Sidebar navigation với active states
- Sticky header với search
- User profile dropdown
- Notification bell
- Logout button
- Protected routes (JWT verification)

---

## 🌐 Website Công Khai

### Trang Chủ (`/`)
**Sections:**
- Hero slider (3 slides tự động)
- Khám phá theo mùa (4 seasonal cards)
- Scent Families (4 nhóm hương)
- Best Sellers (8 sản phẩm)
- Customer testimonials

### Trang Cửa Hàng (`/shop`)
**Tính năng:**
- Filter sidebar (Price, Gender, Scent, Longevity, Brand)
- Toggle giá lẻ/sỉ
- Product grid (9 sản phẩm)
- Sort & pagination
- Wishlist integration

### Chi Tiết Sản Phẩm (`/product/[id]`)
**Tính năng:**
- Image gallery với zoom
- Scent Pyramid visualization
- Quantity selector
- Add to cart & wishlist
- Wholesale pricing table
- Customer reviews

### Giỏ Hàng (`/cart`)
**Tính năng:**
- Multi-step progress (4 bước)
- Cart items với quantity controls
- Shipping calculator
- Payment methods (MoMo, VNPay, Card)
- Order summary (sticky)
- Empty cart state

### Trang Yêu Thích (`/favorite`)
**Tính năng:**
- Wishlist products grid
- Toggle giá lẻ/sỉ
- Add to cart from wishlist
- Remove from wishlist
- Empty state

### Bán Sỉ (`/wholesale`)
**Tính năng:**
- Hero với gradient
- Stats section
- 3 Pricing tiers (25%, 35%, 45%)
- Quote request form
- Success stories

### Bộ Sưu Tập (`/collections`)
**Tính năng:**
- 4 seasonal collections
- Hover effects
- Product count
- Cross-linking

### Trang Giới Thiệu (`/about`)
**Tính năng:**
- Hero section
- Timeline (1992, 2005, 2020)
- Philosophy với stats
- Core values (3 cards)
- Team members (4 người)

---

## 🧩 Components Chính

### LuxuryHeader.jsx
**Props:** Không cần props (sử dụng Context)
**Tính năng:**
- Sticky header với backdrop blur
- Navigation menu responsive
- Search bar
- Cart & wishlist icons với badge count (từ Context)
- Links to cart & favorite pages

### ProductItem.jsx
**Props:**
- `id`, `name`, `price`, `brand`, `volume`, `image`, `discount`, `badge`
- `onAdd` (function): Callback thêm vào giỏ
- `product` (object): Full product object

**Tính năng:**
- Wishlist toggle button (❤️/🤍)
- Hover zoom effect
- Quick add button
- Discount badge

### CartContext.jsx
**Global State Management:**
- `cartItems`, `wishlistItems`
- `addToCart`, `removeFromCart`, `updateQuantity`
- `addToWishlist`, `removeFromWishlist`, `isInWishlist`
- `getCartTotal`, `getCartCount`
- LocalStorage persistence

---

## 🗄️ Database Models

### User Model
```typescript
{
  email: string (unique)
  password: string (hashed)
  name: string
  role: 'admin' | 'retail' | 'wholesale'
  phone?: string
  address?: string
  discountTier?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Product Model
```typescript
{
  name: string
  brand: string
  priceRetail: number
  priceWholesale: number
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all'
  scentPyramid: {
    top: string
    heart: string
    base: string
  }
  images: string[]
  volume: string
  stock: number
  isHidden: boolean
  description?: string
  gender?: string
  longevity?: number
  sillage?: number
  createdAt: Date
  updatedAt: Date
}
```

### Order Model
```typescript
{
  orderNumber: string (unique)
  customerId: ObjectId
  customerName: string
  customerEmail: string
  customerPhone?: string
  type: 'retail' | 'wholesale'
  items: [{
    productId: ObjectId
    name: string
    price: number
    quantity: number
    image?: string
  }]
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled'
  paymentMethod: 'card' | 'momo' | 'vnpay' | 'bank_transfer'
  shippingAddress?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔧 API Routes

### Authentication
- `POST /api/admin/auth/login` - Đăng nhập admin
- `POST /api/admin/auth/register` - Đăng ký admin mới

**Request Body (Login):**
```json
{
  "email": "admin@luxescent.com",
  "password": "Admin@123456"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "admin@luxescent.com",
    "name": "Admin Luxe",
    "role": "admin"
  }
}
```

---

## 📦 Cài Đặt & Chạy Dự Án

### 1. Clone Repository
```bash
git clone [repository-url]
cd luxe-scent
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Cấu Hình Environment Variables
Tạo file `.env.local`:
```env
# MongoDB (optional - will fallback to JSON)
MONGODB_URI=mongodb://localhost:27017/luxe-scent

# JWT Secret
JWT_SECRET=luxe-scent-super-secret-key-change-in-production-2024

# Admin Credentials
ADMIN_EMAIL=admin@luxescent.com
ADMIN_PASSWORD=Admin@123456

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Chạy Development Server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### 5. Build Production
```bash
npm run build
npm start
```

---

## 🌐 Danh Sách Trang

### Website Công Khai
- `/` - Trang chủ
- `/shop` - Cửa hàng
- `/wholesale` - Bán sỉ
- `/collections` - Bộ sưu tập
- `/collections/spring` - Mùa Xuân
- `/collections/summer` - Mùa Hạ
- `/collections/autumn` - Mùa Thu
- `/collections/winter` - Mùa Đông
- `/product/[id]` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/favorite` - Yêu thích
- `/about` - Giới thiệu

### Admin Dashboard
- `/admin/login` - Đăng nhập admin
- `/admin/dashboard` - Tổng quan
- `/admin/orders` - Quản lý đơn hàng
- `/admin/products` - Quản lý sản phẩm
- `/admin/customers` - Quản lý khách hàng
- `/admin/collections` - Quản lý bộ sưu tập

---

## 🎯 Tính Năng Đặc Biệt

### 1. Global State Management (Context API)
- Cart & Wishlist state toàn cục
- LocalStorage persistence
- Real-time updates across pages

### 2. JWT Authentication
- Secure admin login
- Token-based authentication
- Protected routes
- Fallback to default credentials

### 3. MongoDB với JSON Fallback
- Primary: MongoDB với Mongoose
- Fallback: JSON file storage
- Seamless switching

### 4. Responsive Admin Dashboard
- Mobile-friendly
- Sidebar navigation
- Sticky elements
- Dark luxury theme

### 5. Multi-step Checkout
- Progress indicator
- Form validation
- Multiple payment methods
- Order summary

---

## 📝 Lưu Ý Quan Trọng

### 1. Thanh Toán
- **KHÔNG** hỗ trợ COD
- Lý do: Giá trị mặt hàng cao
- Phương thức: MoMo, VNPay, Credit Card

### 2. Năm
- Tất cả copyright: **© 2026**

### 3. Hình Ảnh
- Sử dụng từ Fragrantica (fimgs.net)
- Đảm bảo URL hợp lệ

### 4. Authentication
- Default admin: `admin@luxescent.com` / `Admin@123456`
- JWT expires in 7 days
- Tokens stored in localStorage

### 5. Database
- MongoDB optional
- Fallback to JSON works seamlessly
- Models defined with Mongoose

---

## 🚀 Cải Tiến Trong Tương Lai

### Tính năng cần thêm:
- [ ] Customer authentication
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Live chat support
- [ ] Product reviews moderation
- [ ] Inventory alerts
- [ ] Sales analytics
- [ ] Export reports (CSV/Excel)
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Product comparison
- [ ] Gift wrapping option
- [ ] Loyalty program
- [ ] Referral system

### Technical improvements:
- [ ] Add more unit tests
- [ ] Optimize images with Next.js Image
- [ ] Implement Redis caching
- [ ] Add rate limiting
- [ ] Improve SEO metadata
- [ ] Add sitemap generation
- [ ] Implement error boundaries
- [ ] Add logging system
- [ ] Improve accessibility (WCAG)
- [ ] Add performance monitoring

---

## 📞 Thông Tin Liên Hệ

**LUXE SCENT**  
Hương Thơm Vĩnh Cửu

- **Hotline:** 1900-LUXE (5893)
- **Hotline B2B:** 1900 6789 (Nhánh 2)
- **Email:** hello@luxescent.vn
- **Email Wholesale:** wholesale@luxescent.vn
- **Address:** 123 Đường Lê Lợi, Q.1, TP.HCM
- **Hours:** 8:00 - 22:00 (Tất cả các ngày)

---

## 📚 Tài Liệu Tham Khảo

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [JWT Documentation](https://jwt.io)

---

## 📄 License

© 2026 LUXE SCENT. All rights reserved.

---

**Cập nhật lần cuối:** 18/03/2026  
**Version:** 2.0.0 (với Admin Dashboard)  
**Developed with ❤️ by Kiro AI Assistant**

# LUXE SCENT - Nước Hoa Cao Cấp

![LUXE SCENT](https://img.shields.io/badge/LUXE%20SCENT-Hương%20Thơm%20Vĩnh%20Cửu-0A3D2A?style=for-the-badge)

## 🌟 Giới Thiệu

LUXE SCENT là website thương mại điện tử cao cấp chuyên bán nước hoa, hỗ trợ cả bán lẻ và bán sỉ. Thiết kế sang trọng, hiện đại với trải nghiệm người dùng tối ưu.

## 🚀 Công Nghệ

- **Framework:** Next.js 14 (React)
- **Styling:** Bootstrap 5 + Custom CSS
- **Fonts:** Playfair Display + Inter
- **Year:** 2026

## 🎨 Màu Sắc Thương Hiệu

- **Cream White:** #F8F4F0
- **Emerald Green:** #0A3D2A
- **Soft Gold:** #D4AF37
- **Rose Gold:** #B76E79

## 📦 Cài Đặt

```bash
# Clone repository
git clone [repository-url]

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📁 Cấu Trúc Dự Án

```
src/
├── app/                    # Pages
│   ├── about/             # Trang giới thiệu
│   ├── cart/              # Giỏ hàng & thanh toán
│   ├── collections/       # Bộ sưu tập 4 mùa
│   ├── product/[id]/      # Chi tiết sản phẩm
│   ├── shop/              # Cửa hàng (lẻ)
│   ├── wholesale/         # Bán sỉ
│   └── page.jsx           # Trang chủ
└── component/             # Components
    ├── LuxuryHeader.jsx   # Header chính
    ├── LuxuryFooter.jsx   # Footer chính
    ├── ProductItem.jsx    # Card sản phẩm
    ├── SeasonDetail.jsx   # Template trang mùa
    └── ...
```

## 🎯 Tính Năng Chính

### Trang Chủ
- Hero slider tự động
- Scent Families (4 nhóm hương)
- Best Sellers (8 sản phẩm)
- Customer testimonials

### Trang Cửa Hàng
- Filter sidebar đa dạng
- Toggle giá lẻ/sỉ
- Sort & pagination
- 9 sản phẩm/trang

### Chi Tiết Sản Phẩm
- Image gallery với zoom
- Scent Pyramid visualization
- Wholesale pricing table
- Customer reviews

### Giỏ Hàng
- Multi-step checkout (4 bước)
- Shipping calculator
- Payment: MoMo, VNPay, Credit Card
- **NO COD** (giá trị cao)

### Bán Sỉ
- 3 pricing tiers
- Quote request form
- Success stories
- B2B focused

### Bộ Sưu Tập
- 4 mùa: Xuân, Hạ, Thu, Đông
- Mỗi mùa có 4 sản phẩm đặc trưng
- Cross-linking giữa các mùa

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap 5 grid system
- Sticky header & sidebar
- Touch-friendly interactions

## 🔧 Components Có Thể Tái Sử Dụng

### LuxuryHeader
```jsx
<LuxuryHeader cartCount={3} wishlistCount={5} />
```

### ProductItem
```jsx
<ProductItem
  name="Signature Gold"
  price={1250000}
  brand="LUXE SCENT"
  discount={15}
  volume="50ml"
  image="..."
  badge="Mới"
  onAdd={() => handleAdd()}
/>
```

### SeasonDetail
```jsx
<SeasonDetail
  season={seasonData}
  products={productList}
  otherSeasons={otherSeasonsList}
/>
```

## 📚 Tài Liệu

Xem [CLAUDE.md](./CLAUDE.md) để biết thêm chi tiết về:
- Cấu trúc components
- Props & API
- Styling guidelines
- Best practices
- Future improvements

## 🎨 Design System

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Buttons
- `.luxury-btn` - Primary button
- `.luxury-btn-outline` - Secondary button

### Animations
- `.fade-in` - Fade in effect
- `.hover-scale` - Scale on hover
- `.scent-particle` - Floating particles

## 🌐 Trang Web

### Trang Công Khai
- `/` - Trang chủ
- `/shop` - Cửa hàng
- `/wholesale` - Bán sỉ
- `/collections` - Bộ sưu tập
- `/collections/spring` - Mùa Xuân
- `/collections/summer` - Mùa Hạ
- `/collections/autumn` - Mùa Thu
- `/collections/winter` - Mùa Đông
- `/product/[id]` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/about` - Giới thiệu

## 📞 Liên Hệ

**LUXE SCENT**  
Hương Thơm Vĩnh Cửu

- **Hotline:** 1900-LUXE (5893)
- **Email:** hello@luxescent.vn
- **Address:** 123 Đường Lê Lợi, Q.1, TP.HCM
- **Hours:** 8:00 - 22:00 (Tất cả các ngày)

## 📄 License

© 2026 LUXE SCENT. All rights reserved.

---

**Developed with ❤️ by Kiro AI Assistant**
