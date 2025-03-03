'use client'
import { useState, useEffect } from 'react'
import { useAuthContext } from '@/hooks/context/AuthContext'
import Avatar from "@/components/Avatar"
const AvatarDropdown = () => {
    const { user } = useAuthContext()
    const [name, setName] = useState(user.name || "")
    const [profilePicture, setProfilePicture] = useState(user.profile_picture || "")
    useEffect(() => {
        if (user) {
            setName(user.name)
            setProfilePicture(user.profile_picture)
        }
    }, [user])
    return (
        <div className="flex items-center z-50">
                <div className="avatar-user">
                    <Avatar
                        name={name}
                        src={profilePicture}
                        size={30}
                        className=""
                    />
                </div>
        </div>
    )
}

export default AvatarDropdown
