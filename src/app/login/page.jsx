"use client";

import { AuthContext } from "@/context/AuthContext";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoEye } from "react-icons/io5";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      setUser(data);
      router.push("/profile");
    } catch (error) {
      console.log(error);

      alert("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-12">
              <h3 className="text-gray-800 text-4xl font-extrabold">Login</h3>
              <p className="text-sm mt-4 text-gray-800">
                Don't have an account?{"     "}
                <a
                  href="/register"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </div>

            <div>
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

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="w-full aspect-[12/12] object-contain"
            alt="login-image"
          />
        </div>
      </div>
    </div>
  );
}
