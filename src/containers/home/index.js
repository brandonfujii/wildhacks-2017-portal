import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Wordmark from '../../assets/wordmark';

const Background = styled.div`
    background-color: #010025;
    width: 100vw;
`;

const Section = styled.div`
    height: 100vh;
`;

const Home = props => (
    <Background>
        <Section>
            <Wordmark stroke="#C1AA77" />
        </Section>
        <Section />
    </Background>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
