import Pupper from 'api/pupper';

/**
 *
 * If team exists -> join if there is room on the team
 * If team does not exist -> create team and join
 * If user is already on another team -> leave original team and join requested team
 *
 * @param token - Authorization Token
 * @param teamName - name of team that user wants to join
 */
const createOrJoinTeam = (token, teamName) => {
    return Pupper.post('/team/join',
        Pupper.sign({
            body: {
                name: teamName,
            },
        }, token));
};

export default createOrJoinTeam;
