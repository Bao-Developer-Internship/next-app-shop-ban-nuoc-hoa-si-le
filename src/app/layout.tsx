import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/store/authStore";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUXE SCENT - Nước Hoa Cao Cấp | Hương Thơm Vĩnh Cửu",
  description: "Thương hiệu nước hoa cao cấp Việt Nam. Bán lẻ & sỉ với giá tốt nhất. Hương thơm sang trọng, lưu hương lâu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                style: { fontFamily: 'Inter, sans-serif', fontSize: '14px' },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
