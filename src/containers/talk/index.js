import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LightningTalksPage from 'components/talk';
import { fetchTalks, fetchTalkById, submitTalk, upvoteTalk, downvoteTalk, rehydrateTalks, deleteTalk } from 'modules/talk';
import { getApp } from 'modules/application';
import { displayBanner } from 'modules/banner';

const Talk = props => {
    return <div className="app-view--talk pt4">
        <LightningTalksPage {...props} />
    </div>;
};

const mapStateToProps = state => ({
    talks: state.talk.talks,
    count: state.talk.count,
    user: state.auth.user,
    app: state.application.app,
    isFetchingTalks: state.talk.isFetchingTalks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitTalk,
    fetchTalks,
    fetchTalkById,
    upvoteTalk,
    downvoteTalk,
    rehydrateTalks,
    deleteTalk,
    getApp,
    displayBanner,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talk);
