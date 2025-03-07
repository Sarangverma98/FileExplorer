import React, { useState } from "react";

const FileTree = ({ data, onSelect, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState("");

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  };

  const handleCreate = (type) => {
    if (newName.trim()) {
      const newItem = {
        name: newName,
        type: type,
        children: type === "folder" ? [] : null,
      };
      data.children.push(newItem);
      onUpdate();
      setIsCreating(false)
      setNewName("")
    }
  };

  const handleDelete = () => {
    onUpdate(data.name)
  };

  const handleRename = () => {
    if (newName.trim()) {
      data.name = newName
      onUpdate();
      setIsRenaming(false)
      setNewName("")
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div onClick={handleToggle} style={{ cursor: "pointer" }}>
          {data.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄"} {data.name}
        </div>
        {data.type === "folder" && (
          <button onClick={() => setIsCreating("file")}>+ File</button>
        )}
        {data.type === "folder" && (
          <button onClick={() => setIsCreating("folder")}>+ Folder</button>
        )}
        <button
          onClick={() => {
            setIsRenaming(true)
            setNewName(data.name)
          }}
        >
          Rename
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {(isCreating || isRenaming) && (
        <div style={{ marginLeft: "20px" }}>
          <input
            type="text"
            placeholder={isCreating ? `Enter ${isCreating} name` : "Enter new name"}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={isCreating ? () => handleCreate(isCreating) : handleRename}>
            {isCreating ? "Create" : "Rename"}
          </button>
        </div>
      )}
      {isExpanded && data.children && (
        <div style={{ marginLeft: "20px" }}>
          {data.children.map((child, index) => (
            <FileTree
              key={index}
              data={child}
              onSelect={onSelect}
              onUpdate={(name) => {
                if (name) {
                  data.children = data.children.filter((c) => c.name !== name);
                }
                onUpdate()
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTree;