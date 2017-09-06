import Pupper from 'api/pupper';

const leaveTeam = (token, teamName) => {
    return Pupper.post('/team/leave',
        Pupper.sign({
            body: {
                name: teamName,
            },
        }, token));
};

export default leaveTeam;
