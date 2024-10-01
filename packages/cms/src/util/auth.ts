import { getCurrentUser } from 'aws-amplify/auth';

export const isAuthenticated = async () => {
    try {
        const user = await getCurrentUser();
        return !!user;
    } catch (error) {
        return false;
    }
};
