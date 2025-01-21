import { AuthContext, AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { FilesProvider } from "@/context/FilesContext";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "File Storage App",
  description: "Ultimate storage destination for your files.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FilesProvider>
            {children}
          </FilesProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
