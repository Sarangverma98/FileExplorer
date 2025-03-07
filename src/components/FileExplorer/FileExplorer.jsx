import React, { useState } from "react";
import FileTree from "./FileTree";
import fileSystem from "../../data/fileSystem.json";
import "../../styles/FileExplorer.css";

const FileExplorer = () => {
  const [fileData, setFileData] = useState(fileSystem)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  };

  const handleUpdate = () => {
    setFileData({ ...fileData })
  };

  return (
    <div className="file-explorer">
      <div className="sidebar">
        <FileTree
          data={fileData}
          onSelect={handleFileSelect}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default FileExplorer;