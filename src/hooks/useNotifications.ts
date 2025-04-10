import { useState, useRef, useMemo, useEffect } from 'react'
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} from '@/services/notificationService'
import { useRouter } from 'next/navigation'
import { useClickAway } from 'react-use'
import useEcho from '@/hooks/echo'

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
  const router = useRouter()
  const useInfo = user.user
  const userId = useInfo.id
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const notificationRef = useRef<HTMLDivElement | null>(null)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  //echo
  const echo = useEcho()

  useClickAway(notificationRef, () => {
    if (openNotification) setOpenNotification(false)
  })

  // ✅ Lấy danh sách thông báo ban đầu từ API
  useEffect(() => {
    if (notifications.length > 0) return
    const fetchInitial = async () => {
      try {
        const data = await getNotifications()
        setNotifications(data)
      } catch {
        setError('Lỗi khi tải thông báo')
      }
    }
    fetchInitial()
  }, [])


  useEffect(() => {
    if (!echo || !userId) return
  
    const channel = echo.private(`notification.${userId}`)
    channel.listen('.notification.received', (event: any) => {
      setNotifications((prev) => [event, ...prev])
    })
  
    return () => {
      echo.leave(`notification.${userId}`)
    }
  }, [echo, userId])



  // 🔹 Đếm số thông báo chưa đọc
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read_status).length
  }, [notifications])

  const handleMarkAsRead = async () => {
    if (selectedNotifications.length === 0) return
    try {
      await markAsRead(selectedNotifications)
      setNotifications((prev) =>
        prev.map((n) =>
          selectedNotifications.includes(n.id) ? { ...n, read_status: true } : n
        )
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra'
      setError(`Lỗi khi đánh dấu thông báo là đã đọc: ${errorMessage}`)
    } finally {
      setSelectedNotifications([])
    }
  }

  const handleMarkAsReadOnClick = (id: number, link?: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read_status: true } : notif
      )
    )

    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    )

    if (link && typeof link === 'string' && link.trim() !== '') {
      router.replace(link)
      if (selectedNotifications.length === 0) {
        handleMarkAsRead()
      }
    }
  }

  const handleMarkAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read_status: true }))
    )
    try {
      await markAllAsRead()
    } catch {
      setError('Lỗi khi đánh dấu tất cả thông báo là đã đọc')
    }
  }

  const handleDeleteNotification = async (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    try {
      await deleteNotification(id)
    } catch {
      setError('Lỗi khi xóa thông báo')
    }
  }

  const handleDeleteAllNotifications = async () => {
    setNotifications([])
    try {
      await deleteAllNotifications()
    } catch {
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
    selectedNotifications,
    handleMarkAsReadOnClick,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleDeleteAllNotifications,
  }
}

export default useNotifications
