import { useState, useRef, useMemo } from 'react'
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} from '@/services/notificationService'
import { useClickAway } from 'react-use'
import useSWR from 'swr'

interface Notification {
  id: number
  user_id: string
  notification_type: string
  message: string
  link: string | null
  read_status: boolean
  notification_date: string
}

const useNotifications = (user: any) => {
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const notificationRef = useRef<HTMLDivElement | null>(null)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)

  useClickAway(notificationRef, () => {
    if (openNotification) setOpenNotification(false)
  })

  // ✅ Fetch thông báo với useSWR (tự động cập nhật mỗi 5 giây)
  const { data: notifications = [], error: fetchError, mutate } = useSWR(
    user ? '/api/notifications' : null,
    getNotifications,
    {
      refreshInterval: 5000, // Kiểm tra thông báo mới mỗi 5 giây
      revalidateOnFocus: true, // Tự động fetch lại khi quay lại tab
      revalidateOnReconnect: true, // Fetch lại khi có mạng
    }
  )

  if (fetchError && !error) setError('Lỗi khi tải thông báo')

  // 🔹 Đếm số thông báo chưa đọc
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read_status).length
  }, [notifications])

  // ✅ Giữ nguyên logic: Khi người dùng gọi hàm này mới gửi API
  const handleMarkAsRead = async () => {
    if (selectedNotifications.length === 0) return
    try {
      await markAsRead(selectedNotifications) // Gửi API đánh dấu tất cả đã đọc
      mutate() // ✅ Fetch lại danh sách mới từ API
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra'
      setError(`Lỗi khi đánh dấu thông báo là đã đọc: ${errorMessage}`)
    } finally {
      setSelectedNotifications([]) // ✅ Reset danh sách sau khi gọi API
    }
  }

  // ✅ Giữ nguyên logic: Chỉ cập nhật selectedNotifications, không gọi API
  const handleMarkAsReadOnClick = (id: number) => {
    // Cập nhật giao diện hiển thị là đã đọc
    mutate(
      (prevData: Notification[] = []) =>
        prevData.map((notif) =>
          notif.id === id ? { ...notif, read_status: true } : notif
        ),
      false // ⚠️ Không gọi lại API ngay, chỉ cập nhật UI tạm thời
    )
  
    // Thêm ID vào selectedNotifications nếu chưa có
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id) ? prevSelected : [...prevSelected, id]
    )
  }
  

  // 🔹 Đánh dấu tất cả thông báo là đã đọc
  const handleMarkAllAsRead = async () => {
    // Cập nhật UI ngay lập tức bằng cách đánh dấu tất cả thông báo là đã đọc
    mutate(
      (prevData: Notification[] = []) =>
        prevData.map((notif) => ({ ...notif, read_status: true })), // Đánh dấu tất cả thông báo là đã đọc
      false // ❌ Không gọi lại API, chỉ cập nhật UI
    )
  
    try {
      // Gọi API để đánh dấu tất cả thông báo là đã đọc
      await markAllAsRead()
    } catch{
      setError('Lỗi khi đánh dấu tất cả thông báo là đã đọc')
    }
  }  

  // 🔹 Xóa 1 thông báo
  const handleDeleteNotification = async (id: number) => {
    // Cập nhật UI ngay lập tức mà không gọi lại API
    mutate(
      (prevData: Notification[] = []) =>
        prevData.filter((notif) => notif.id !== id),
      false // ❌ Không gọi API lại, chỉ update UI
    )
  
    try {
      // Gọi API để xóa thông báo
      await deleteNotification(id)
    } catch{
      setError('Lỗi khi xóa thông báo')
    }
  }
  

  // 🔹 Xóa tất cả thông báo
  const handleDeleteAllNotifications = async () => {
    // Cập nhật UI ngay lập tức bằng cách xóa tất cả thông báo từ danh sách
    mutate(
      (_: Notification[] = []) => [], 
      false // ❌ Không gọi lại API, chỉ cập nhật UI
    )
    
    
    try {
      // Gọi API để xóa tất cả thông báo
      await deleteAllNotifications()
    } catch{
      setError('Lỗi khi xóa tất cả thông báo')
    }
  }
  

  return {
    notifications,
    openNotification,
    setOpenNotification,
    notificationRef,
    error,
    unreadCount,
    selectedNotifications, // ✅ Trả về selectedNotifications để kiểm tra danh sách đã chọn
    handleMarkAsReadOnClick,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleDeleteAllNotifications,
  }
}

export default useNotifications
