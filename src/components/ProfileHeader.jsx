"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ProfileHeader() {
  const { user, handleLogout } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <section className="relative pt-32 pb-24">
      <Link
        href="/"
        className="fixed top-2 left-2 text-neutral-600 z-50 text-lg px-5 py-2 bg-white rounded-full flex items-center gap-4"
      >
        <FaArrowLeftLong />
        Back
      </Link>
      <img
        src="/profile_header.png"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5 w-64 h-64">
          <img
            src={`https://cloudstoragebackend.onrender.com/${user.profile_image}`.replace(
              `\\`,
              "/"
            )}
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full object-cover w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1">
              {user.username}
            </h3>
            <p className="font-normal text-md leading-7 text-gray-500">
              {user.email}
            </p>
            <p className="text-lg mt-2">
              Storage: {(user.usedStorage / 1000000).toFixed(1)}/2000 MB
            </p>
          </div>
          <div className="space-x-4">
            {/* <button className="py-3 px-5 rounded-full bg-indigo-600 text-white font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100 hover:bg-indigo-700">
              Edit Profile
            </button> */}
            <button
              className="py-3 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
    </section>
  );
}
// http://127.0.0.1:5000/uploads\profile_images\2025\01\17\drawing_logo.png
// <img alt="user-avatar-image" class="border-4 border-solid border-white rounded-full object-cover w-full" src="">
