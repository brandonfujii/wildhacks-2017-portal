import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

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
    constructor(props) {
        super(props);

        this.state = {
            talks: [],
            hasMore: true,
        };
    }

    renderTalks(talks) {
        if (!talks) return null;

        return talks.map((talk, index) => {
            return <Talk key={index} {...talk}/>;
        }); 
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.talks) {
            const talks = this.state.talks.concat(nextProps.talks);
            this.setState({
                talks,
                hasMore: nextProps.count > talks.length,
            });
        }
    }

    loadMoreTalks = async (page) => {
        try {
            await this.props.fetchTalks(page, this.props.pageSize);
        } catch(err) {
            console.log(err);
        }

    }

    render() {
        return (
            <div className="lightning-talks">
                <InfiniteScroll
                    pageStart={1}
                    hasMore={this.state.hasMore}
                    loadMore={this.loadMoreTalks}
                    loader={<div className="loader">Loading ...</div>}
                >
                    { this.renderTalks(this.state.talks) }
                </InfiniteScroll>
            </div>
        )
    }
}

Talks.propTypes = {
    pageSize: PropTypes.number.isRequired,
    talks: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    fetchTalks: PropTypes.func.isRequired,
};

export default Talks;
