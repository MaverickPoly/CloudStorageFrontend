"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AuthGuard({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && Object.keys(user).length === 0) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
