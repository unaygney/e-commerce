import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/db";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
const noto_sans = Noto_Sans({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cart_id")?.value;
  let basketLength = 0;

  if (cartId) {
    const basket = await db.cart.findUnique({
      where: { cart_id: cartId },
      include: { items: true },
    });
    if (basket && basket.items) basketLength = basket.items.length;
  }

  return (
    <html lang="en">
      <body
        className={`${noto_sans.className} scroll-smooth bg-gray-200 p-4 antialiased`}
      >
        <ReactQueryProvider>
          <Navbar basketLength={basketLength} />
          {children}
          <Toaster />
          <Footer />
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
