import Pupper from 'api/pupper';

const updateRsvp = (token, rsvpStatus) => {
    return Pupper.put('/application/rsvp',
        Pupper.sign({
            body: {
                rsvp: rsvpStatus,
            },
        }, token));
};

export default updateRsvp;
