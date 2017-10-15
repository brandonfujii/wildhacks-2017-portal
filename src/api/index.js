// Authentication
import registerUser from './endpoints/auth/register-user';
import loginUser from './endpoints/auth/login-user';

// Account Recovery
import resetPassword from './endpoints/auth/reset-password';
import sendRecoveryEmail from './endpoints/auth/send-recovery-email';

// Account Verification
import verifyToken from './endpoints/verify/verify-token';
import resendVerification from './endpoints/verify/resend-verification';

// Users
import { getUserById, getUserByEmail, getUser } from './endpoints/users/get-single-user';
import getUsers from './endpoints/users/get-users';
import getUserData from './endpoints/users/get-user-data';

// Applications
import updateApplication from './endpoints/applications/update-application';
import getApplication from './endpoints/applications/get-application';
import bulkJudgeApplications from './endpoints/applications/bulk-judge-applications';
import getAcceptedCount from './endpoints/applications/get-accepted-count';

// Teams
import getTeamById from './endpoints/teams/get-team-by-id';
import getTeamByName from './endpoints/teams/get-team-by-name';
import createOrJoinTeam from './endpoints/teams/create-or-join-team';
import leaveTeam from './endpoints/teams/leave-team';

// Talks
import getTalkById from './endpoints/talks/get-talk-by-id';
import getTalks from './endpoints/talks/get-talks';
import createTalk from './endpoints/talks/create-talk';
import upvoteTalkById from './endpoints/talks/upvote-talk-by-id';
import downvoteTalkById from './endpoints/talks/downvote-talk-by-id';
import deleteTalkById from './endpoints/talks/delete-talk-by-id';

// Ping
import getPing from './endpoints/get-ping';

// API
export {
    registerUser,
    loginUser,
    resetPassword,
    sendRecoveryEmail,
    verifyToken,
    resendVerification,
    getApplication,
    updateApplication,
    bulkJudgeApplications,
    getAcceptedCount,
    getUserById,
    getUserByEmail,
    getUser,
    getUsers,
    getUserData,
    getTeamById,
    getTeamByName,
    createOrJoinTeam,
    leaveTeam,
    getTalkById,
    getTalks,
    createTalk,
    deleteTalkById,
    upvoteTalkById,
    downvoteTalkById,
    getPing,
};