import { useState } from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  className?: string;
  onImageUpload?: (file: File) => void;
  onNameChange?: (newName: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name = "X", 
  src, 
  size = 80, 
  className = "", 
  onImageUpload, 
  onNameChange 
}) => {
  const [imageError, setImageError] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(src || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const getLastNameInitial = (fullName: string) => {
    const words = fullName.trim().split(" ");
    return words.length > 0 ? words[words.length - 1].charAt(0).toUpperCase() : "?";
  };

  const initials = name.trim() ? getLastNameInitial(name) : "?";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
      setImageError(false);

      if (onImageUpload) {
        onImageUpload(file);
      }
    }
  };

  const handleSave = () => {
    if (onNameChange) {
      onNameChange(editedName);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false); // Nếu chưa lưu mà blur thì hủy
    setEditedName(name); // Reset lại giá trị cũ
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Avatar */}
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <div 
          className="flex items-center justify-center rounded-full bg-blue-500 text-white font-bold overflow-hidden border-4 border-gray-300 cursor-pointer"
          style={{ width: size, height: size, fontSize: size / 2 }}
        >
          {avatarSrc && !imageError ? (
            <img
              src={avatarSrc}
              alt={name}
              className="rounded-full object-cover"
              style={{ width: size, height: size }}
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
      </label>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatar-upload"
        onChange={handleImageUpload}
      />

      {/* Chỉnh sửa trực tiếp tên */}
      <div className="mt-2 text-lg font-medium text-gray-700">
        {isEditing ? (
          <div className="flex space-x-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleBlur} // Khi mất focus thì hủy nếu chưa lưu
              onKeyDown={(e) => e.key === "Enter" && handleSave()} // Enter để lưu
              className="w-32 p-1 border rounded-md focus:ring focus:ring-blue-300 outline-none"
              autoFocus
            />
            <button 
              className="px-2 py-1 bg-black text-white rounded-md hover:bg-gray-700"
              onClick={handleSave}
            >
              save
            </button>
          </div>
        ) : (
          <p 
            className="text-2xl cursor-pointer hover:underline flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            {name}
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-45.26 91q-19.15 0-32.33-13.17-13.17-13.18-13.17-32.33v-102.26q0-18.15 6.84-34.69 6.83-16.53 19.51-29.2l501.17-500.41q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L324-138.22q-12.67 12.68-29.21 19.51-16.53 6.84-34.68 6.84H157.37Zm597.37-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z"/></svg>
          </p>
          
        )}
      </div>
    </div>
  );
};

export default Avatar;
