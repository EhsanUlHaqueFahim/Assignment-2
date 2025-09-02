import { Notification } from "../models/notification.model.js";

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const notifications = await Notification.find({ user: userId })
            .populate('job', 'title company')
            .populate('company', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notifications
        });
    } catch (error) {
        console.log('Error fetching notifications:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userId = req.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, user: userId },
            { isRead: true, readAt: new Date() },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read"
        });
    } catch (error) {
        console.log('Error marking notification as read:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.id;

        await Notification.updateMany(
            { user: userId, isRead: false },
            { isRead: true, readAt: new Date() }
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });
    } catch (error) {
        console.log('Error marking all notifications as read:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get unread notification count
export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.id;
        const count = await Notification.countDocuments({ 
            user: userId, 
            isRead: false 
        });

        return res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        console.log('Error getting unread count:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
