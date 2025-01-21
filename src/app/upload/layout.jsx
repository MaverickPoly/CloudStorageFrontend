import AuthGuard from "@/components/AuthGuard";

export default function UploadLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
