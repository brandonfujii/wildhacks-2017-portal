import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { FormInput, FormTextArea, Button, Link } from 'components/utility';
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
            tags: [],
            suggestions: [],
            talks: [],
            hasMore: true,
            orderBy: "date",
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.talks) {
            const talks = this.state.talks.concat(nextProps.talks);
            this.setState({
                talks,
                hasMore: nextProps.count > talks.length,
            });
        }
    }

    onNameChange = (name = "") => {
        if (typeof name !== "string" || name.trim().length > 50) return;

        this.setState({ name });
    }

    onDescriptionChange = (description = "") => {
        if (typeof description !== "string" || description.length > 500) return;

        this.setState({ description });
    }

    deleteTag = index => {
        let tags = this.state.tags;
        tags.splice(index, 1);
        this.setState({ tags });
    }

    addTag = name => {
        let tags = this.state.tags;
        let names = tags.map(tag => tag.text);

        if (name.length <= 25 && tags.length < 5 && !names.includes(name)) {
            tags.push({
                id: tags.length,
                text: name, 
            });
            this.setState({ tags });
        }     
    }

    handleDrag = (tag, currPos, newPos) => {
        let tags = this.state.tags;

        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        this.setState({ tags });
    }

    rehydrateTalks = async () => {
        this.setState({ ready: false, talks: [] });
        await this.props.fetchTalks(1, pageSize, this.state.orderBy);
        this.setState({ ready: true });
    }

    onSubmitTalk = async (e) => {
        e.preventDefault();
        const name = this.state.name.trim();
        const description = this.state.description.trim();
        const tags = this.state.tags.map(tag => tag.text);

        this.setState({
            name: "",
            description: "",
            tags: [],
        });

        await this.props.submitTalk({ name, description, tags });
        await this.rehydrateTalks();
    }

    render() {
        const { talk, error } = this.props;

        return (
            <div className="mw6 center pv6 ph4">
                <h1 className="karla white f2 mb2 antialias">
                    Lightning Talks
                </h1>
                <p className="karla white f4 antialias">
                    Present a lightning talk at WildHacks
                </p>
                { error &&
                    <p className="karla antialias wh-pink mv2">{ this.state.error || error }</p>
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
                        height={100}
                        onChange={ e => this.onDescriptionChange(e.target.value) }
                    />
                    <div className="lightning-talk-tags">
                        <ReactTags
                        classNames={{
                                tags: "tags",
                                tagInput: "tag-input",
                                tagInputField: "tags-input-field karla pa2 input-reset br2 ba w-100 mb2",
                                tag: "tag karla white",
                                selected: "selected",
                                remove: "remove",
                            }}
                            tags={ this.state.tags }
                            suggestions={ this.state.suggestions }
                            handleDelete={ this.deleteTag }
                            handleAddition={ this.addTag }
                            handleDrag={ this.handleDrag }
                            maxLength={25} />
                    </div>
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
                    ready={this.state.ready}
                    orderBy={this.state.orderBy}
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
