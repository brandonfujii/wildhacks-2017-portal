import React from 'react';
import { Button, CONSTANTS } from 'components/utility';
import { Wordmark } from 'components/assets';

const { COLORS } = CONSTANTS;

const Home = props => (
    <div className="w-100">
        <div className="min-vh-90 mw7 center ph3-ns pv6 pv5-ns">
            <div className="cf">
                <p className="gt-pressura white antialias tc f3">LET'S GET LOST</p>
                <Wordmark 
                    className="mw5 mw6-ns mw9-l center"
                    stroke={ COLORS.BROWN }
                />
                <div className="mb4">
                    <p className="karla white antialias tc f4 f3-ns lh-solid mv2">November 3-5 2017</p>
                    <p className="karla white antialias tc f4 f3-ns lh-solid mv2">Evanston, IL</p>
                </div>
                <div className="flex items-center justify-center mb2">
                    <Button to="/login" backgroundColor="bg-wh-pink" className="mh2">
                        Log in
                    </Button>
                    <Button to="/register" className="mh2">
                        Sign up
                    </Button>
                </div>
                <div className="flex items-center justify-center">
                    <p className="f6 karla white antialias">Interested in sponsoring? <a className="link wh-sand underline antialias" href="mailto:sponsor@wildhacks.org?Subject=Sponsorship%20Opportunities">Email us.</a></p>
                </div>
            </div>
        </div>
        <div className="center mv7 ph3-ns flex items-center justify-center">
            <p className="f5 f4-ns karla white antialias lh-copy mw6 ph4">WildHacks is Northwestern University’s annual hackathon, and 2017 marks the fourth year for our hackathon! For 36 hours, passionate students of all backgrounds gather to collaborate and challenge themselves to build a project from start to finish. WildHacks is an invaluable opportunity to interact with companies and fellow hackers, gain coding experience, and win awesome prizes! This November, we invite you to join us and explore the wild world of hacking!</p>
        </div>
        <div className="mw9-ns mw6 mv7 center">
            <h2 className="gt-pressura white antialias tc f2 f1-ns">SCHEDULE</h2>
            <div className="cf">
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Friday, November 3</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">5:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Sign in begins</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">5-7:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Career fair</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">7-8:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Dinner</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">8:30-9:45pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Opening ceremony</div>
                    </div>
                </div>
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Saturday, November 4</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">8-9:30am</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Breakfast</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">9:45am-12:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Tech/Lightning talks</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">12-1:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Lunch</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">1:30-2:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Tech/Lightning talks</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">3-5:00pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Artica Studio activities/Therapy dogs</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">7-8:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Dinner</div>
                    </div>
                </div>
                <div className="fl w-100 w-third-ns pa2 pt0 bg-white-100">
                    <p className="karla f3 tc white antialias">Sunday, November 5</p>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">10:00am</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Hacking ends</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">10:30-11:30am</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Brunch</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">11:30am-1:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Judging</div>
                    </div>
                    <div className="cf pb2">
                        <div className="karla white antialias fl w-50 tr pr3-ns pr2">1:30-2:30pm</div>
                        <div className="karla white antialias fl w-50 tl pl3-ns pl2">Closing ceremony</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mw8 mv7 center">
            <h2 className="gt-pressura white antialias tc f2 f1-ns">FAQ</h2>
            <div className="cf ph3 ph5-ns">
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Will hardware be provided?</p>
                    <p className="karla white antialias lh-copy">We’ve got you covered! MLH will be lending out hardware from their hardware lab.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Will there be travel reimbursement?</p>
                    <p className="karla white antialias lh-copy">Unfortunately, we will not be providing travel reimbursements.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Am I eligible to register?</p>
                    <p className="karla white antialias lh-copy">If you are over 18 and a college undergrad, yes!</p>
                </div>
            </div>
            <div className="cf ph3 ph5-ns">
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Do I need to pay to attend?</p>
                    <p className="karla white antialias lh-copy">WildHacks is free for all hackers thanks to our generous sponsors.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">What do I need to bring?</p>
                    <p className="karla white antialias lh-copy">Please bring your student ID and government issued ID for check-in, and a laptop for hacking. For comfort, we recommend you bring blankets, pillows, and toiletries.</p>
                </div>
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">What if I’ve never coded before?</p>
                    <p className="karla white antialias lh-copy">No need to worry! WikdHacks welcomes hackers of all skill levels and backgrounds. There will also be company mentors and peer mentors at WildHacks to help you out.</p>
                </div>
            </div>
            <div className="cf ph3 ph5-ns">
                <div className="fl w-100 w-third-ns pa3">
                    <p className="karla white antialias b">Can I start hacking right now?</p>
                    <p className="karla white antialias lh-copy">All projects for WildHacks must be done within the allotted hacking hours.</p>
                </div>
            </div>
        </div>
        <footer className="pv6">
            <p className="karla white f5 tc antialias">MLH Code of Conduct</p>
            <p className="karla white f5 tc antialias">As an MLH sanctioned event, WildHacks adheres to and enforces the <a className="link wh-sand underline antialias" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct.</a></p>
        </footer>
    </div>
);

export default Home;
