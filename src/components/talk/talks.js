import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Talk = ({ id, name, description, speaker }) => (
    <div className="lightning-talk">
        <p className="karla white f4 antialias">{ name }</p>
        { speaker && speaker.application ? 
            <p className="karla white f5 antialias">
                by {speaker.application.firstName} from {speaker.application.school}
            </p> : null }
    </div> 
);

class Talks extends Component {
    renderTalks(talks) {
        if (!talks || !talks.length) return null;

        return talks.map((talk, index) => {
            return <Talk key={index} {...talk}/>;
        }); 
    }

    render() {
        const { talks } = this.props; 

        return (
            <div className="lightning-talks">
                { this.renderTalks(talks) }
            </div>
        )
    }
}

Talks.propTypes = {
    talks: PropTypes.array.isRequired,
};

export default Talks;
