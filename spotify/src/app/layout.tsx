import "./globals.css";
import { Inter } from "next/font/google";
import { UserContextProvider } from "@/app/context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone | Intizam",
  description: "Portofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
          </UserContextProvider>
      </body>
    </html>
  );
}
