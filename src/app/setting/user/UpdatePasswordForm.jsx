import { useState } from "react"

const UpdatePasswordForm = ({savePassword}) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.")
      return
    }

    setIsLoading(true)
    savePassword(currentPassword, newPassword,confirmPassword)
    .then((response) => {
      setSuccess(response?.message || "Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    })
    .catch((err) => {
      setError(err?.message) // Nhận lỗi từ backend
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <form 
      className="w-full flex flex-col"
      onSubmit={handleSubmit}
    >
      {/* Current Password */}
      <div className="flex flex-col mt-2">
        <label className=" text-sm font-medium mb-2">Current Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
          required
          disabled={isLoading}
        />
      </div>

      {/* New Password */}
      <div className="flex flex-col mt-2">
        <label className="text-sm font-medium mb-2">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
          required
          disabled={isLoading}
        />
      </div>

      {/* Confirm New Password */}
      <div className="flex flex-col mt-2">
        <label className=" text-sm font-medium mb-2">Confirm New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
          required
          disabled={isLoading}
        />
      </div>

      {/* Show Password Checkbox */}
      <div className="flex items-center space-x-2 mt-2">
        <input 
          type="checkbox" 
          id="show-password" 
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          className=" rounded-xl cursor-pointer"
        />
        <label htmlFor="show-password" className="text-sm cursor-pointer">Show Password</label>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      {/* Submit Button */}
      <button 
        type="submit" 
        className={`ml-auto px-5 py-2 flex items-center rounded-lg transition mt-2 ${
          isLoading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-black text-white hover:bg-gray-700"
        } `}
        disabled={isLoading}
      >
        <span className="font-medium text-xs">{isLoading ? "Updating..." : "Save"}</span>
      </button>
    </form>
  )
}

export default UpdatePasswordForm
