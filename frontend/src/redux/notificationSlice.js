import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        markAsRead: (state, action) => {
            const notificationId = action.payload;
            const notification = state.notifications.find(n => n._id === notificationId);
            if (notification) {
                notification.isRead = true;
                notification.readAt = new Date().toISOString();
            }
            state.unreadCount = Math.max(0, state.unreadCount - 1);
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(notification => {
                notification.isRead = true;
                notification.readAt = new Date().toISOString();
            });
            state.unreadCount = 0;
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setNotifications,
    setUnreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    setLoading,
    setError
} = notificationSlice.actions;

export default notificationSlice.reducer;
