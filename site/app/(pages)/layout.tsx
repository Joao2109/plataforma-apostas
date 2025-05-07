import Footer from "@/components/shared/footer";
import "./globals.css";
import Header from "@/components/shared/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggler } from "@/components/theme-toggler";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <ThemeToggler />
        </ThemeProvider>
      </body>
    </html>
  );
}
