import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Wordmark from '../../assets/wordmark';
import Button from '../../assets/button';
import Text from '../../assets/text';
import Link from '../../assets/link';
import { COLORS, FONT_SIZES } from '../../assets/constants';

const Background = styled.div`
    background-color: #010025;
    width: 100vw;
`;

const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const Section = styled.div`
    height: 100vh;
`;

const MainWordmark = styled(Wordmark)`
    padding-top: 200px;
    width: 50%;
    max-width: 600px;
    margin: 0 auto;
`;

const Home = props => (
    <Background>
        <Section>
            <MainWordmark 
                stroke={ COLORS.BROWN }
            />
            <Text
                fontSize={ FONT_SIZES.LARGE }
                textAlign="center"
            >
                November 2017
            </Text>
            <Text
                fontSize={ FONT_SIZES.LARGE }
                textAlign="center"
            >
                Evanston, IL
            </Text>
            <CenteredDiv>
                <Button 
                    backgroundColor={ COLORS.SALMON }
                    text="Log in"
                />
                <Button 
                    text="Sign up"
                />
            </CenteredDiv>
            <Text
                fontSize={ FONT_SIZES.SMALL }
                textAlign="center"
            >
                Interested in sponsoring?&nbsp;
                <Link>Email us.</Link>
            </Text>
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
