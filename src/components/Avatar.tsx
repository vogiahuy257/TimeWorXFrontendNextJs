import { useState,ReactNode } from "react"
import Image from "next/image"


interface AvatarProps {
  name?: string
  src?: string
  size?: number
  className?: string
  onImageUpload?: (file: File) => void
  children?: ReactNode
}

const Avatar: React.FC<AvatarProps> = ({
  name = "X",
  src,
  size = 80,
  className = "",
  onImageUpload,
  children,
}) => {
  const [imageError, setImageError] = useState(false)
  const [avatarSrc] = useState<string | null>(src || null)

  const getLastNameInitial = (fullName: string) => {
    const words = fullName.trim().split(" ")
    return words.length > 0 ? words[words.length - 1].charAt(0).toUpperCase() : "?"
  }

  const initials = name.trim() ? getLastNameInitial(name) : "?"

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
      if (onImageUpload && file) {
        onImageUpload(file)
      }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Avatar */}
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <div
          className={`flex items-center justify-center rounded-full ${avatarSrc && !imageError ? null : ('bg-blue-500 text-white font-bold')} overflow-hidden ${size > 80 ? ('border-4 border-gray-300 cursor-pointer') : null} `}
          style={{ width: size, height: size, fontSize: size / 2 }}
        >
          {avatarSrc && !imageError ? (
            <Image
              src={avatarSrc}
              alt={name}
              className=" rounded-full object-cover"
              width={size}
              height={size}
              onError={() => setImageError(true)}
              unoptimized
              priority
            />          
          ) : (
            <span>{initials}</span>
          )}
        </div>
      </label>

      {/* Hidden file input */}
      {onImageUpload &&
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatar-upload"
        onChange={handleImageUpload}
      />}

      {/* Component EditableName */}
      {children}
    </div>
  )
}

export default Avatar
