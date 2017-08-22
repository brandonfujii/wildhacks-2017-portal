import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wordmark from '../../assets/wordmark';
import { COLORS, FONT_SIZES, FONTS } from '../../assets/constants';

const Home = props => (
    <div className="w-100 bg-black-90">
        <div className="min-vh-90 mw7 center ph3-ns pv5">
            <div className="cf">
                <p className="karla white tc f3">LET'S GET LOST</p>
                <Wordmark 
                    className="mw5 mw9-ns center"
                    stroke={ COLORS.BROWN }
                />
                <div className="mb4">
                    <p className="karla white tc f4 f3-ns lh-solid mv2">November 2017</p>
                    <p className="karla white tc f4 f3-ns lh-solid mv2">Evanston, IL</p>
                </div>
                <div className="flex items-center justify-center">
                    <a className="f5 karla link dim br2 ph4 pv2 mh2 mb2 dib white bg-red" href="#">Log in</a>
                    <a className="f5 karla link dim br2 ph4 pv2 mh2 mb2 dib white bg-black" href="#">Sign up</a>
                </div>
                <div className="flex items-center justify-center">
                    <p className="f6 karla white">Interested in sponsoring? <a className="link white" href="#">Email us.</a></p>
                </div>
            </div>
        </div>
        <div className="center ph3-ns flex items-center justify-center">
            <p className="f5 f4-ns karla white lh-copy mw6 ph4">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
        </div>
        <div className="">
            <h2 className="karla white tc f2 f1-ns">SCHEDULE</h2>
            <div>
            </div>
        </div>
        <div className="">
            <h2 className="karla white tc f2 f1-ns">FAQ</h2>
            <div className="mw8 center cf ph3 ph5-ns">
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white b">Who is coming?</p>
                    <p className="karla white lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
            </div>
        </div>
        <footer></footer>
    </div>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
