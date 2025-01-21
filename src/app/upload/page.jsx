"use client";

import Link from "next/link";
import { uploadFile } from "@/services/api";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      await uploadFile(formData);
      alert("File uploaded successfully!");
    } catch (error) {
      console.log(error);

      alert("Error:", +error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Link
        href="/"
        className="fixed top-4 left-4 text-neutral-600 z-50 text-lg px-5 py-2 bg-white rounded-full flex items-center gap-4"
      >
        <FaArrowLeftLong />
        Back
      </Link>
      <form
        className="flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Upload a New File
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fileInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select File
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="titleInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="titleInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
