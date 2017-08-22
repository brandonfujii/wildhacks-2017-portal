import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Wordmark from '../../assets/wordmark';
import Star from '../../assets/star';
import Button from '../../assets/button';
import Text from '../../assets/text';
import Link from '../../assets/link';
import { COLORS, FONT_SIZES, FONTS } from '../../assets/constants';

const Background = styled.div`
    background-color: #010025;
    width: 100vw;
`;

const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 40px;
`;

const Section = styled.div`
    min-height: 100vh;
`;

const LandingSection = styled(Section)`
    padding-top: 100px;
`;

const MainWordmark = styled(Wordmark)`
    width: 50%;
    max-width: 600px;
    margin: 40px auto;
`;

const SectionHeader = styled(Text)`
    
`;

const Content = styled.div`
    width: 33%;
    max-width: 500px;
    padding: 20px;
`;

const ScheduleRow = ({ time, event }) => {
    const TR = ({ className, children }) => (
        <tr className={ className }>{ children }</tr>
    );

    const StyledTR = styled(TR)`
        width: 100%;
        display: block;
        font-size: ${ FONT_SIZES.SMALL };
        color: ${ COLORS.OFF_WHITE };
        margin-bottom: 10px;
    `;

    const TD = ({ className, children }) => (
        <td className={ className }>{ children } </td>
    );

    const StyledTimeTD = styled(TD)`
        width: 50%;
        box-sizing: border-box;
        display: inline-block;
        padding-right: 20px;
        text-align: right;

        &:after {
            content: "";
            display: inline-block;
            height: 16px;
            width: 16px;
            background: url(/assets/star.svg);
            background-size: 16px 16px;
            transform: translateY(3px);
        }
    `;

    const StyledDateTD = styled(TD)`
        width: 50%;
        box-sizing: border-box;
        display: inline-block;
        padding-left: 16px;
        text-align: left;

        &:before {
            content: "";
            display: inline-block;
            height: 16px;
            width: 16px;
            background: url(/assets/star.svg);
            background-size: 16px 16px;
            transform: translateX(-5px) translateY(3px);
        }
    `;

    return (
        <StyledTR>
            <StyledTimeTD>{ time }</StyledTimeTD>
            <StyledDateTD>{ event }</StyledDateTD>
        </StyledTR>
    );
};

const Home = props => (
    <Background>
        <LandingSection>
            <Text
                color={ COLORS.OFF_WHITE }
                fontSize={ FONT_SIZES.LARGE }
                font={ FONTS.PRIMARY }
                textAlign="center"
            >
                &ldquo;LET'S GET LOST&rdquo;
            </Text>
            <MainWordmark 
                stroke={ COLORS.BROWN }
            />
            <Text
                color={ COLORS.OFF_WHITE }
                fontSize={ FONT_SIZES.LARGE }
                textAlign="center"
            >
                November 2017
            </Text>
            <Text
                color={ COLORS.OFF_WHITE }
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
                color={ COLORS.OFF_WHITE }
                textAlign="center"
            >
                Interested in sponsoring?&nbsp;
                <Link>Email us.</Link>
            </Text>
        </LandingSection>
        <Section>
            <SectionHeader
                font={ FONTS.PRIMARY }
                fontSize={ FONT_SIZES.XXL }
                textAlign="center"
            >
                ABOUT
            </SectionHeader>
            <CenteredDiv>
                <Content>
                    <Text>
                        This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.
                    </Text>
                </Content>
            </CenteredDiv>
        </Section>
        <Section>
            <SectionHeader
                font={ FONTS.PRIMARY }
                fontSize={ FONT_SIZES.XXL }
                textAlign="center"
            >
                SCHEDULE
            </SectionHeader>
            <CenteredDiv>
                <Content>
                    <Text
                        textAlign="center"
                    >
                        Friday, November 4
                    </Text>
                    <ScheduleRow
                        time="4:00-7:00pm"
                        event="Hackers arrive"
                    />
                    <ScheduleRow
                        time="4:00-7:00pm"
                        event="Hackers arrive"
                    />
                    <ScheduleRow
                        time="4:00-7:00pm"
                        event="Hackers arrive"
                    />
                </Content>
                <Content>
                    <Text
                        textAlign="center"
                    >
                        Saturday, November 5
                    </Text>
                    <ScheduleRow
                        time="4:00-7:00pm"
                        event="Hackers arrive"
                    />
                </Content>
                <Content>
                    <Text
                        textAlign="center"
                    >
                        Sunday, November 6
                    </Text>
                    <ScheduleRow
                        time="4:00-7:00pm"
                        event="Hackers arrive"
                    />
                </Content>
            </CenteredDiv>
        </Section>
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
