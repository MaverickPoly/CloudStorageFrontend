"use client";

import AuthGuard from "@/components/AuthGuard";
import HomeFiles from "@/components/HomeFile";

export default function Home() {
  return (
    <AuthGuard>
      <HomeFiles />
    </AuthGuard>
  );
}
