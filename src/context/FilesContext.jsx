"use client";

import { uploadFile, fetchProfile } from "@/services/api";
import { createContext, useState, useEffect } from "react";

export const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [usedStorage, setUsedStorage] = useState("");

  const loadFiles = async () => {
    try {
      const { data } = await fetchProfile();

      setFiles(data.files);
      setUsedStorage(data.usedStorage);
    } catch {
      setFiles(null);
      setUsedStorage(null);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <FilesContext.Provider
      value={{ files, setFiles, usedStorage, setUsedStorage }}
    >
      {children}
    </FilesContext.Provider>
  );
};
