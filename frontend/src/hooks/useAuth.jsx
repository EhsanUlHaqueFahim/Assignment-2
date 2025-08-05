import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            dispatch(setLoading(true));
            try {
                const response = await axios.get(`${USER_API_END_POINT}/me`, {
                    withCredentials: true,
                });
                
                if (response.data.success) {
                    dispatch(setUser(response.data.user));
                }
            } catch (error) {
                // User is not authenticated, which is fine
                console.log('User not authenticated');
            } finally {
                dispatch(setLoading(false));
            }
        };

        checkAuthStatus();
    }, [dispatch]);
};

export default useAuth; 