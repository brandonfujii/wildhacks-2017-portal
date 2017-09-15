import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

const Talk = ({ id, name, description, speaker, upvotes }) => (
    <div className="lightning-talk">
        <span className="upvotes karla white f5 antialias">{ upvotes } upvotes</span>
        <p className="karla white f4 antialias">{ name }</p>
        <p className="karla white f5 antialias">{ description }</p>
        { speaker && speaker.application ? 
            <p className="karla white f5 antialias">
                by {speaker.application.firstName} from {speaker.application.school}
            </p> : null }
    </div> 
);

const TalkLoader = () => (<div className="loader karla white f6 antialias">Loading ...</div>);

class Talks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }

    renderTalks(talks) {
        if (!talks) return null;
        return talks.map((talk, index) => <Talk key={index} {...talk}/>);
    }

    loadMoreTalks = async (page) => {
        try {
            await this.props.fetchTalks(page, this.props.pageSize, this.props.orderBy);
        } catch(err) {
            this.setState({
                error: err.message,
            });
        }
    }

    render() {
        if (!this.props.ready) {
            return null;
        }

        return (
            <div className="lightning-talks">
                <InfiniteScroll
                    pageStart={1}
                    hasMore={this.props.hasMore}
                    loadMore={this.loadMoreTalks}
                    loader={<TalkLoader/>}
                >
                    { this.renderTalks(this.props.talks) }
                </InfiniteScroll>
            </div>
        )
    }
}

Talk.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    speaker: PropTypes.object.isRequired,
    upvotes: PropTypes.number.isRequired,
};

Talks.propTypes = {
    ready: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    talks: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    fetchTalks: PropTypes.func.isRequired,
};

export default Talks;
