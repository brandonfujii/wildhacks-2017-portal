// Authentication
import registerUser from './endpoints/auth/register-user';
import loginUser from './endpoints/auth/login-user';

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
    getApplication,
    updateApplication,
    getUserById,
    getUserByEmail,
    getUser,
    getUsers,
    getPing,
};