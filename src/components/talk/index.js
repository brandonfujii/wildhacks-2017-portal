import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormInput, FormTextArea, Button } from 'components/utility';
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
            name: "",
            description: "",
        };
    }

    onNameChange = (name = "") => {
        if (typeof name !== "string" || name.trim().length > 50) return;

        this.setState({ name });
    }

    onDescriptionChange = (description = "") => {
        if (typeof description !== "string" || description.length > 500) return;

        this.setState({ description });
    }

    onSubmitTalk = e => {
        e.preventDefault();
        const name = this.state.name.trim();
        const description = this.state.description.trim();
        
        this.props.submitTalk({ name, description });
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
                    onSubmit={ this.onSubmitTalk }
                >
                    <FormInput
                        className="mb2"
                        value={ this.state.name }
                        placeholder="Talk name"
                        onChange={ e => this.onNameChange(e.target.value) }
                    />
                    <FormTextArea 
                        className="mb2"
                        value={ this.state.description }
                        placeholder="What is your talk about?"
                        onChange={ e => this.onDescriptionChange(e.target.value) }
                    />
                    <Button
                        backgroundColor="bg-wh-pink"
                        onClick={ this.onSubmitTalk }
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
    submitTalk: PropTypes.func.isRequired,
    fetchTalkById: PropTypes.func.isRequired,
    fetchTalks: PropTypes.func.isRequired,
    talk: PropTypes.object,
    talks: PropTypes.array,
    error: PropTypes.string,
};

export default Talk;
