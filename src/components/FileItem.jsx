"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaRegFile } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { deleteFile, downloadFile } from "@/services/api";

export default function FileItem({ file }) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleFileDownload = async () => {
    try {
      const response = await downloadFile(file.id);

      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error downloading file: " + error.message);
      return;
    }
  };

  const handleFileDelete = async () => {
    try {
      const response = await deleteFile(file.id);
      alert(response.data.message);
    } catch (error) {
      alert(
        "Error deleting file: " + error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="relative w-72 p-3 bg-neutral-100 shadow-md">
      <div className="flex justify-between mb-5 items-start">
        <Link
          href={`http://127.0.0.1:5000/${file.filepath}`.replace(`\\`, "/")}
        >
          <div className="bg-white rounded-xl p-4 hover:bg-blue-50 border border-transparent hover:border-neutral-200">
            <FaRegFile size={30} />
          </div>
        </Link>

        <button className="" onClick={() => setOpen(!open)}>
          {open ? <IoMdClose size={25} /> : <IoMdMore size={25} />}
        </button>
        {open && (
          <div className="absolute shadow-md right-1/2 translate-x-1/2 p-2 bg-neutral-50 rounded ">
            <button
              className="flex gap-2 items-center hover:bg-white w-full p-2"
              onClick={handleFileDelete}
            >
              <MdDelete size={22} />
              Delete
            </button>

            <button
              className="flex gap-2 items-center hover:bg-white w-full p-2"
              // href={`http://127.0.0.1:5000/${file.filepath}`.replace(`\\`, "/")}
              // download
              onClick={handleFileDownload}
            >
              <MdOutlineFileDownload size={22} />
              Download
            </button>
          </div>
        )}
      </div>
      <h3 className="text-lg truncate max-w-full overflow-hidden whitespace-nowrap">
        {file.title}
      </h3>
      <h4 className="text-sm text-neutral-700">
        {(file.size / 1000000).toFixed(1)} MB
      </h4>
    </div>
  );
}
