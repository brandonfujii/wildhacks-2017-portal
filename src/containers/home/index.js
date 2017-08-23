import React from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wordmark from '../../assets/wordmark';
import Button from '../../assets/button';
import { COLORS } from '../../assets/constants';

const Home = props => (
    <div className="w-100">
        <div className="min-vh-90 mw7 center ph3-ns pv5">
            <div className="cf">
                <p className="gt-pressura white antialias tc f3">LET'S GET LOST</p>
                <Wordmark 
                    className="mw5 mw9-ns center"
                    stroke={ COLORS.BROWN }
                />
                <div className="mb4">
                    <p className="karla white antialias tc f4 f3-ns lh-solid mv2">November 2017</p>
                    <p className="karla white antialias tc f4 f3-ns lh-solid mv2">Evanston, IL</p>
                </div>
                <div className="flex items-center justify-center mb2">
                    <Button to="/login" backgroundColor="bg-wh-pink" className="mh2">
                        Log in
                    </Button>
                    <Button to="/signup" className="mh2">
                        Sign up
                    </Button>
                </div>
                <div className="flex items-center justify-center">
                    <p className="f6 karla white antialias">Interested in sponsoring? <a className="link wh-sand underline antialias" href="mailto:sponsor@wildhacks.org?Subject=Sponsorship%20Opportunities">Email us.</a></p>
                </div>
            </div>
        </div>
        <div className="center mv7 ph3-ns flex items-center justify-center">
            <p className="f5 f4-ns karla white antialias lh-copy mw6 ph4">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
        </div>
        <div className="mw9-ns mw6 mv7 center">
            <h2 className="gt-pressura white antialias tc f2 f1-ns">SCHEDULE</h2>
            <div className="cf">
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Friday, November 4</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">4:00-7:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hackers arrive</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">7:00-8:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Dinner</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">10:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hacking begins</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">12:00am</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Midnight snack</div>
                    </div>
                </div>
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Saturday, November 5</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">4:00-7:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hackers arrive</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">7:00-8:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Dinner</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">10:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hacking begins</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">12:00am</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Midnight snack</div>
                    </div>
                </div>
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Sunday, November 6</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">4:00-7:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hackers arrive</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">7:00-8:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Dinner</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">10:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Hacking begins</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr4-ns pr2">12:00am</div>
                        <div className="karla white antialias fl w-50 tl pl4-ns pl2">Midnight snack</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mw8 mv7 center">
            <h2 className="gt-pressura white antialias tc f2 f1-ns">FAQ</h2>
            <div className="cf ph3 ph5-ns">
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Who is coming?</p>
                    <p className="karla white antialias lh-copy">This September, Copenhagen will be home to 15,000+ people exploring the impact of technology on our lives. One week filled with 100+ conferences, summits, dinners, art installations and concerts, Techfestival’s goal is to break down today’s most complex questions into real talk and tangible experiences.</p>
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
