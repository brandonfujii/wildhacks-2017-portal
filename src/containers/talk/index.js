import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LightningTalksPage from 'components/talk';
import { fetchTalks, fetchTalkById, submitTalk, upvoteTalk, downvoteTalk } from 'modules/talk';

const Talk = props => {
    return <div className="app-view--talk pt4">
        <LightningTalksPage {...props} />
    </div>;
};

const mapStateToProps = state => ({
    talks: state.talk.talks,
    count: state.talk.count,
    error: state.talk.error,
    isFetchingTalks: state.talk.isFetchingTalks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitTalk,
    fetchTalks,
    fetchTalkById,
    upvoteTalk,
    downvoteTalk,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talk);
