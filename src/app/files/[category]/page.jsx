"use client";

import { fetchProfile } from "@/services/api";
import React, { useEffect, useState } from "react";

export default function FileList(context) {
  const { category } = React.use(context.params);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      const { data } = await fetchProfile();
      setFiles(data.files);
    };
    loadFiles();
  }, [category]);

  return (
    <div className="">
      <h1>Files in {category}</h1>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.filename} - <a>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
