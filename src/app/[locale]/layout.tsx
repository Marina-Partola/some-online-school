import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer/Footer";

import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>SOnS: О нашей школе</title>
        <meta
          name="description"
          content="Онлайн школа, предлагающая гибкие курсы по веб-разработке, JavaScript, Node.js и многим другим."
        />
        <meta
          name="keywords"
          content="образование, онлайн-школа, курсы, веб-разработка, JavaScript, Node.js"
        />
        <meta property="og:title" content="О нашей школе" />
        <meta
          property="og:description"
          content="Онлайн школа, предлагающая гибкие курсы по веб-разработке, JavaScript, Node.js и многим другим."
        />
        <meta property="og:type" content="website" />
      </head>
      <body className="flex flex-col">
        <Header />
        <main className="flex-1 pl-6 pr-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
