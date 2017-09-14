import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TalkPage from 'components/talk';
import { fetchTalks, fetchTalkById } from 'modules/talk';

const Talk = props => {
    return <div className="app-view--talk pt4">
        <TalkPage {...props} />
    </div>;
};

const mapStateToProps = state => ({
    talks: state.talk.talks,
    talk: state.talk.talk,
    error: state.talk.error,
    isFetchingTalks: state.talk.isFetchingTalks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchTalks,
    fetchTalkById,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Talk);
