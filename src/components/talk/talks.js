import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'components/utility';

const Talk = ({ id, name, description, speaker, upvotes, hasUpvoted, tags, deleteTalk, voteOnTalk }) => (
    <div className="lightning-talk flex items-center pv3">
        <div className="pr2 w3 w4-ns dib flex-none">
            <p className="upvotes karla white f4 antialias tc lh-solid mb1">{ upvotes || '0' }</p>
            <p className="karla white f6 antialias tc mt1">{ upvotes === 1 ? 'upvote' : 'upvotes'}</p>
        </div>
        <div>
            <p className="karla white f3 antialias mt1 mb3">{ name }</p>
            { tags.map((tag, index) => (
                <span className="karla br2 bg-wh-gold wh-navy f6 ph2 pv1 mr2" key={index}>{ tag.name }</span>
            ))}
            <p className="karla white f5 antialias">{ description }</p>
            { speaker && speaker.application ? 
                <p className="karla wh-off-white f6 antialias mb1">
                    by {speaker.application.firstName} from {speaker.application.school}
                </p> : null }
            <Link 
                className="white f6"
                onClick={ e => {
                    e.preventDefault();
                    voteOnTalk();
                }}
            >
                { !hasUpvoted ? "Upvote talk" : "Remove upvote" }
            </Link>
            { deleteTalk && 
                <Link 
                    className="white f6 ml2"
                    onClick={ e => {
                        e.preventDefault();
                        deleteTalk(id);
                    }}
                >
                    Delete talk
                </Link>
            }
        </div>
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
        return talks.map((talk, index) => (
            <Talk key={index}
                voteOnTalk={ () => this.props.voteOnTalk(index, talk) }
                deleteTalk={ talk.speakerId === this.props.user.id ? this.props.deleteTalk : false }
                {...talk} />
        ));
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
            <div className={`lightning-talks ${this.props.className}`}>
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
    hasUpvoted: PropTypes.number.isRequired,
    voteOnTalk: PropTypes.func.isRequired,
};

Talks.propTypes = {
    ready: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    talks: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    fetchTalks: PropTypes.func.isRequired,
    voteOnTalk: PropTypes.func.isRequired,
};

export default Talks;
