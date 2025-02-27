import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

const AvatarDropdown = () => {
    const { logout } = useAuth()
    // const { user } = useAuth()
    // const router = useRouter()

    // const handleProfileRedirect = () => {
    //     router.push('/profile')
    // }

    return (
        <div className="flex items-center z-50">
            <Dropdown
                align="right"
                width="48"
                trigger={
                    <div className="avatar-user">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 35 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17.4998 31.5L29.6242 24.5V10.5L17.4998 3.5L5.37549 10.5V24.5L17.4998 31.5ZM17.4998 31.5V18.375M17.4998 18.375L6.12484 11.375M17.4998 18.375L28.8748 11.375"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                }
            >
                {/* Authentication */}
                <div className="p-2 box-avatar">
                    <DropdownButton onClick={logout} className="button">
                        <span>Logout</span>
                    </DropdownButton>
                </div>
            </Dropdown>
        </div>
    )
}

export default AvatarDropdown
