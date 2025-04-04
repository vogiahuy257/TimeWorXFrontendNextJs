import axios from '@/libs/axios'

interface Notification {
  id: number
  user_id: string
  notification_type: string
  message: string
  link: string | null
  read_status: boolean
  notification_date: string
}

interface CreateNotificationData {
  user_id: string
  notification_type: string
  message: string
  link?: string
}

// Địa chỉ API của bạn
const API_URL = '/api/notifications'

// Lấy danh sách thông báo
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error)
    throw error
  }
}

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (notificationIds: number[]): Promise<any> => {
  try {
    const response = await axios.post('/api/notifications/markAsRead', {
      notification_ids: notificationIds,
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi đánh dấu thông báo là đã đọc:', error)
    throw error
  }
}

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async (): Promise<any> => {
  try {
    await axios.post('/api/notifications/markAllAsRead')
  } catch (error) {
    console.error('Lỗi khi đánh dấu tất cả thông báo là đã đọc:', error)
    throw error
  }
}

// Xóa thông báo
export const deleteNotification = async (id: number): Promise<any> => {
  try {
    await axios.delete(`/api/notifications/${id}`)
  } catch (error) {
    console.error('Lỗi khi xóa thông báo:', error)
    throw error
  }
}

// Xóa tất cả thông báo
export const deleteAllNotifications = async (): Promise<any> => {
  try {
    await axios.delete('/api/notifications')
  } catch (error) {
    console.error('Lỗi khi xóa tất cả thông báo:', error)
    throw error
  }
}

// Tạo thông báo mới
export const createNotification = async (data: CreateNotificationData): Promise<any> => {
  try {
    const response = await axios.post('/api/notifications', data)
    return response.data
  } catch (error) {
    console.error('Lỗi khi tạo thông báo:', error)
    throw error
  }
}
