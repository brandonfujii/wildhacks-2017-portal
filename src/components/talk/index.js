import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput, Button } from 'components/utility';
import Talks from './talks';

const pageSize = 5;

class Talk extends Component {
    constructor(props) {
        super(props);

        const { fetchTalks } = props;
        
        fetchTalks(1, pageSize).then(() => {
            this.setState({
                ready: true
            }); 
        });

        this.state = {
            ready: false,
        };
    }

    render() {
        const { talk, error } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return null;
        }

        return (
            <div className="mw6 center pv6 ph4">
                <h1 className="karla white f2 mb2 antialias">
                    Lightning Talks
                </h1>
                <p className="karla white f4 antialias">
                    Present a lightning talk at WildHacks
                </p>
                { error &&
                    <p className="karla antialias wh-pink mv2">{ error }</p>
                }
                <form
                    onSubmit={() => {}}
                >
                    <FormInput
                        className="mb2"
                        value={''}
                        placeholder="Talk name"
                        onChange={() => {}}
                    />
                    <Button
                        backgroundColor="bg-wh-pink"
                        onClick={() => {}}
                        className="mb4"
                        type="submit"
                    >
                        Submit Talk
                    </Button>
                </form>
                <Talks 
                    pageSize={pageSize}
                    fetchTalks={this.props.fetchTalks}
                    talks={this.props.talks}
                    count={this.props.count}
                />
            </div>
        );
    }
}

Talk.propTypes = {
    fetchTalkById: PropTypes.func.isRequired,
    fetchTalks: PropTypes.func.isRequired,
    talk: PropTypes.object,
    talks: PropTypes.array,
    error: PropTypes.string,
};

export default Talk;
