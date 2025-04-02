import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} from '@/services/notificationService';
import { useClickAway } from 'react-use';

interface Notification {
  id: number;
  user_id: string;
  notification_type: string;
  message: string;
  link: string | null;
  read_status: boolean;
  notification_date: string;
}

const useNotifications = (user: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const hasFetched = useRef(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  useClickAway(notificationRef, () => {
    if (openNotification) setOpenNotification(false);
  });

  useEffect(() => {
    if (!user || hasFetched.current) return;

    hasFetched.current = true;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError('Lỗi khi tải thông báo');
      }
    };

    fetchNotifications();
  }, [user]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read_status).length;
  }, [notifications]);

  const handleMarkAsRead = async () => {
    if (selectedNotifications.length === 0) return;
    try {
      // Gửi danh sách notificationId tới backend để đánh dấu đã đọc
      await markAsRead(selectedNotifications);  // Chuyển đổi thành mảng khi gọi API
    } catch (err) {
      setError('Lỗi khi đánh dấu thông báo là đã đọc');
    }
    finally{
      // Reset selectedNotifications sau khi gọi API
      setSelectedNotifications([]);
    }
  };  
  
  const handleMarkAsReadOnClick = async (id: number) => {
    try {
      // Cập nhật ngay lập tức giao diện để đánh dấu đã đọc
      setNotifications((prevNotifications) => {
        return prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, read_status: true } : notif
        );
      });
  
      // Thêm id vào selectedNotifications
      setSelectedNotifications((prevSelected) => [...prevSelected, id]);
    } catch (err) {
      setError('Lỗi khi đánh dấu thông báo là đã đọc');
    }
  };  

  const handleMarkAllAsRead = useCallback(async () => {
    
    setNotifications((prevNotifications) => {
      const updated = prevNotifications.map((notif) => ({ ...notif, read_status: true }));
      return updated;
    });

    try {
      await markAllAsRead();
    } catch (err) {
      setError('Lỗi khi đánh dấu tất cả thông báo là đã đọc');
    }
  }, [setNotifications]);

  const handleDeleteNotification = useCallback(async (id: number) => {
    
    setNotifications((prevNotifications) => {
      const updated = prevNotifications.filter((notif) => notif.id !== id);
      return updated;
    });

    try {
      await deleteNotification(id);
    } catch (err) {
      setError('Lỗi khi xóa thông báo');
    }
  }, [setNotifications]);

  const handleDeleteAllNotifications = useCallback(async () => {
    
    setNotifications([]);

    try {
      await deleteAllNotifications();
    } catch (err) {
      setError('Lỗi khi xóa tất cả thông báo');
    }
  }, [setNotifications]);

  return {
    notifications,
    openNotification,
    setOpenNotification,
    notificationRef,
    error,
    unreadCount,
    handleMarkAsReadOnClick,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
    handleDeleteAllNotifications,
  };
};

export default useNotifications;
