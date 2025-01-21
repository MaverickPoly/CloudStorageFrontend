"use client";

import { register } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);
    formData.append("image_file", file);
    try {
      await register(formData);
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-5 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="w-full h-full flex items-center bg-[#000842] rounded-xl overflow-hidden p-1">
          <img
            src="/signup_img.jpg"
            className="w-full object-cover h-full"
            alt="Register Image"
          />
        </div>

        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-12">
              <h3 className="text-gray-800 text-4xl font-extrabold">
                Register
              </h3>
              <p className="text-sm mt-4 text-gray-800">
                Already have an account?{"     "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
                <FaRegUser
                  fill="#aaa"
                  stroke="#aaa"
                  className="w-[23px] h-[23px] absolute right-2"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
                <CiMail
                  fill="#aaa"
                  stroke="#aaa"
                  className="w-[23px] h-[23px] absolute right-2"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <IoEye
                  fill="#aaa"
                  className="w-[20px] h-[20px] absolute right-2"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Confirm  password"
                  onChange={handleChange}
                />
                <IoEye
                  fill="#aaa"
                  className="w-[20px] h-[20px] absolute right-2"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  name="image_file"
                  type="file"
                  accept="image/png, image/jpeg"
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none"
                  placeholder="Profile Image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <FaImage
                  fill="#aaa"
                  stroke="#aaa"
                  className="w-[23px] h-[23px] absolute right-2"
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
