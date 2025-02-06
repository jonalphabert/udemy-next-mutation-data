import Header from '@/components/header';
import './globals.css';
import {Merriweather, Montserrat} from "next/font/google";

export const metadata = {
  title: 'NextPosts',
  description: 'Browse and share amazing posts.',
};

const merryweather = Merriweather({
    variable: "--font-merryweather",
    weight: ['300', '400', '700', '900'],
    subsets: ["latin"],
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${merryweather.variable} ${montserrat.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
