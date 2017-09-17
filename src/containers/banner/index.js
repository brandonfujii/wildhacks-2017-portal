import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Banner = props => (
    <Banner {...props} />
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Banner);