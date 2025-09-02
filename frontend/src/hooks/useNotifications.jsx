import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
    setNotifications, 
    setUnreadCount, 
    markAsRead as markAsReadAction,
    markAllAsRead as markAllAsReadAction,
    setLoading, 
    setError 
} from '@/redux/notificationSlice';
import { NOTIFICATION_API_END_POINT } from '@/utils/constant';

const useNotifications = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { notifications, unreadCount, loading } = useSelector(store => store.notification);

    // Fetch notifications
    const fetchNotifications = async () => {
        if (!user) return;
        
        try {
            dispatch(setLoading(true));
            const response = await axios.get(NOTIFICATION_API_END_POINT, {
                withCredentials: true
            });
            
            if (response.data.success) {
                dispatch(setNotifications(response.data.notifications));
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            dispatch(setError('Failed to fetch notifications'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Fetch unread count
    const fetchUnreadCount = async () => {
        if (!user) return;
        
        try {
            const response = await axios.get(`${NOTIFICATION_API_END_POINT}/unread-count`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                dispatch(setUnreadCount(response.data.count));
            }
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    // Mark notification as read
    const markAsRead = async (notificationId) => {
        try {
            const response = await axios.put(
                `${NOTIFICATION_API_END_POINT}/${notificationId}/mark-read`,
                {},
                { withCredentials: true }
            );
            
            if (response.data.success) {
                dispatch(markAsReadAction(notificationId));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const response = await axios.put(
                `${NOTIFICATION_API_END_POINT}/mark-all-read`,
                {},
                { withCredentials: true }
            );
            
            if (response.data.success) {
                dispatch(markAllAsReadAction());
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    // Fetch notifications and unread count on mount
    useEffect(() => {
        if (user) {
            fetchNotifications();
            fetchUnreadCount();
        }
    }, [user]);

    // Poll for new notifications every 30 seconds
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [user]);

    return {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead
    };
};

export default useNotifications;
