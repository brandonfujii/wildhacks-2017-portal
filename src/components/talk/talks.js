import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { ThumbsUp } from 'react-feather';
import { Link, CONSTANTS } from 'components/utility';

const { COLORS } = CONSTANTS;

const Talk = ({ id, name, description, speaker, upvotes, hasUpvoted, tags, deleteTalk, voteOnTalk, requireApp }) => (
    <div className="lightning-talk flex items-center pv3">
        <div className="pr2 w3 w4-ns dib flex-none">
            <p className="upvotes karla white f4 antialias tc lh-solid mb1 center">{ upvotes || '0' }</p>
            <p className="karla white f6 antialias tc mt1 center">{ upvotes === 1 ? 'upvote' : 'upvotes'}</p>
            <ThumbsUp
                className={`db center pointer ${ hasUpvoted ? 'o-50' : ''}`}
                size={24} 
                color={ COLORS.OFF_WHITE } 
                onClick={ e => {
                    e.preventDefault();
                    requireApp(voteOnTalk);
                }}
            />
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
            { deleteTalk && 
                <Link 
                    className="white f6"
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
                requireApp={ this.props.requireApp }
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
                { this.props.talks && this.props.talks.length > 0 ?
                    <InfiniteScroll
                        pageStart={1}
                        hasMore={this.props.hasMore}
                        loadMore={this.loadMoreTalks}
                        loader={<TalkLoader/>}
                    >
                        { this.renderTalks(this.props.talks) }
                    </InfiniteScroll>
                    :
                    <div className="karla white f5 mt4">No one has submitted a lightning talk proposal yet. Quick, now's your chance to be the first!</div>   
                }
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
    requireApp: PropTypes.func.isRequired,
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
    requireApp: PropTypes.func.isRequired,
};

export default Talks;
