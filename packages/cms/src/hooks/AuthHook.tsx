import { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useDispatch, useSelector } from 'react-redux';
import { accountUpdated } from '../reducers/authReducer';

export const useAuth = () => {
    const dispatch = useDispatch();
    const authorized = useSelector((state: any) => state.auth.authorized);
    const account = useSelector((state: any) => state.auth.account);
    const loading = useSelector((state: any) => state.auth.loading);

    useEffect(() => {
        const checkAuth = async () => {
            if (loading) {
                try {
                    const user = await getCurrentUser();
                    dispatch(accountUpdated({
                        authorized: !!user,
                        account: user ? user.username : null,
                        loading: false
                    }));
                } catch (error) {
                    dispatch(accountUpdated({
                        authorized: false,
                        account: null,
                        loading: false
                    }));
                }
            }
        };

        checkAuth();
    }, [dispatch, loading]);

    return { authorized, account, loading };
};