import { AuthContext, AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { FilesProvider } from "@/context/FilesContext";

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
      </body>
    </html>
  );
}
