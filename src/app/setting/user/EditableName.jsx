import { useState } from "react";

const EditableName = ({ name, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSave = () => {
    if (onNameChange) {
      onNameChange(editedName);
    }
    setIsEditing(false);
  };

  const handleBlur = (e) => {
    if (e.relatedTarget && e.relatedTarget.id === "save-button") return;
    setIsEditing(false);
    setEditedName(name);
  };

  return (
    <div className="mt-2 text-lg">
      {isEditing ? (
        <div className="flex space-x-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="w-32 z-50 p-1 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            autoFocus
          />
          <button
            id="save-button"
            className="px-2 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <p
          className="text-2xl cursor-pointer hover:underline flex items-center gap-1"
          onClick={() => setIsEditing(true)}
        >
          {name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
          >
            <path d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-45.26 91q-19.15 0-32.33-13.17-13.17-13.18-13.17-32.33v-102.26q0-18.15 6.84-34.69 6.83-16.53 19.51-29.2l501.17-500.41q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L324-138.22q-12.67 12.68-29.21 19.51-16.53 6.84-34.68 6.84H157.37Zm597.37-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z" />
          </svg>
        </p>
      )}
    </div>
  );
};

export default EditableName;
