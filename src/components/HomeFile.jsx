"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "@/context/FilesContext";
import AuthGuard from "@/components/AuthGuard";
import { CiImageOn } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import {
  MdAudiotrack,
  MdBlock,
  MdOutlineMenu,
  MdOutlineFileUpload,
} from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { IoIosDocument } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import { IoClose, IoPerson } from "react-icons/io5";
import FileItem from "@/components/FileItem";

const categories = [
  { name: "All", icon: <VscFileSubmodule size={24} /> },
  { name: "Image", icon: <CiImageOn size={24} /> },
  { name: "Video", icon: <FaVideo size={24} /> },
  { name: "Audio", icon: <MdAudiotrack size={24} /> },
  { name: "Document", icon: <IoIosDocument size={24} /> },
  { name: "Other", icon: <TbFileDescription size={24} /> },
];

export default function HomeFiles() {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { files, usedStorage } = useContext(FilesContext);

  const toggleSideBar = () => setSideBarOpen((prev) => !prev);

  useEffect(() => {
    if (!files) {
      setIsLoading(true);
      return;
    }

    if (currentCategory === "All") {
      setFilteredFiles([...files]);
    } else {
      setFilteredFiles(
        files.filter((file) => file.category === currentCategory)
      );
    }
    setIsLoading(false);
  }, [currentCategory, files]);

  // Close the sidebar when clicking somewhere outside, for mobile devices
  const handleClickOutside = (event) => {
    if (sideBarOpen && !event.target.closest(".sidebar")) {
      setSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sideBarOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading files...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`sidebar flex fixed lg:relative shadow-lg p-4 h-screen flex-col justify-between sm:w-80 w-full 
          transition-all duration-300 bg-white z-50 ${
            sideBarOpen ? "left-0" : "-left-full lg:left-0"
          }`}
      >
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-3 rounded-md flex gap-4 items-center cursor-pointer shadow-sm 
                  ${
                    currentCategory === category.name
                      ? "bg-blue-300 hover:bg-blue-400"
                      : "bg-neutral-50 hover:bg-neutral-100"
                  }`}
              onClick={() => {
                setCurrentCategory(category.name);
                if (sideBarOpen) setSideBarOpen(false);
              }}
            >
              <div
                className={`rounded-full p-2 ${
                  currentCategory === category.name ? "bg-blue-200" : "bg-white"
                }`}
              >
                {category.icon}
              </div>
              <h2 className="text-lg">{category.name}</h2>
            </div>
          ))}
        </div>

        <div>
          <Link href="/profile">
            <div className="w-full bg-blue-500 text-white p-3 text-center rounded-lg flex items-center justify-center gap-3 hover:bg-blue-600 mb-2">
              <IoPerson size={21} />
              Profile
            </div>
          </Link>
          <Link href="/upload">
            <div className="w-full bg-indigo-500 text-white p-3 text-center rounded-lg flex items-center justify-center gap-3 hover:bg-indigo-600">
              <MdOutlineFileUpload size={21} />
              Upload File
            </div>
          </Link>
        </div>
      </div>

      {/* Menu Button */}
      <div
        className="fixed top-3 right-3 block lg:hidden p-2 rounded-md bg-neutral-200 cursor-pointer z-50"
        onClick={toggleSideBar}
      >
        {sideBarOpen ? <IoClose size={33} /> : <MdOutlineMenu size={33} />}
      </div>

      {/* Main Content */}
      <div className="">
        <div className="flex gap-4 p-5 flex-wrap">
          {filteredFiles.length !== 0 ? (
            filteredFiles.map((file) => <FileItem key={file.id} file={file} />)
          ) : (
            <div className="text-xl mx-auto w-full flex items-center">
              <MdBlock size={60} className="mr-4" />
              No files for this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
