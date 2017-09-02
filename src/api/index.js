// Authentication
import registerUser from './endpoints/auth/register-user';
import loginUser from './endpoints/auth/login-user';

// Account Verification
import verifyToken from './endpoints/verify/verify-token';
import resendVerification from './endpoints/verify/resend-verification';

// Users
import { getUserById, getUserByEmail, getUser } from './endpoints/users/get-single-user';
import getUsers from './endpoints/users/get-users';

import updateApplication from './endpoints/applications/update-application';
import getApplication from './endpoints/applications/get-application';

// Ping
import getPing from './endpoints/get-ping';

// API
export {
    registerUser,
    loginUser,
    verifyToken,
    resendVerification,
    getApplication,
    updateApplication,
    getUserById,
    getUserByEmail,
    getUser,
    getUsers,
    getPing,
};