import { Inter } from "next/font/google";
import "/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expenses Tracker",
  description:
    "Take charge of your finances effortlessly with our Expenses Tracker. Easily monitor your spending, set budgets, and achieve your financial goals. Sign up now and start managing your expenses with ease!",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full w-full" lang="en-US">
      <body className={`${inter.className} h-full w-full`}>{children}</body>
    </html>
  );
}
