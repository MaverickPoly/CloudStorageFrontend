"use client";

import AuthGuard from "@/components/AuthGuard";
import ProfileHeader from "@/components/ProfileHeader";
export default function Profile() {
  return (
    <AuthGuard>
      <ProfileHeader />
    </AuthGuard>
  );
}
