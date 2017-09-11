import React from 'react';
import { Link } from 'components/utility';

const NotFound = () => {
    return <div className="app-view--not-found pt6 mw7 center">
        <p className="karla wh-off-white antialias f1 b">
            There doesn't seem to be anything here.
        </p>
        <div className="mb2">
            <Link
                to="/"
                className="white"
            >
                Go Home
            </Link>
        </div>
    </div>
};

export default NotFound;
