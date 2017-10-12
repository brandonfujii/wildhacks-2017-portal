import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithContext as Tags } from 'react-tag-input';
import { FormInput, FormTextArea, Button } from 'components/utility';
import Talks from './talks';
import { Link } from 'components/utility';
const pageSize = 5;

class LightningTalksPage extends Component {
    private 
    constructor(props) {
        super(props);
        const { fetchTalks } = props;
        
        fetchTalks(1, pageSize).then(() => {
            this.setState({
                ready: true
            }); 
        });

        this.MAX_NAME_LEN = 50;
        this.MAX_DESCRIPTION_LEN = 500;

        this.state = {
            ready: false,
            name: "",
            description: "",
            tags: [],
            talks: [],
            hasMore: true,
            orderBy: "recent",
            isFormVisible: false,
            appSubmitted: false,
            error: null,
        };
    }

    componentWillMount() {
        this.props.getApp(); 
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.app) {
            this.setState({
                appSubmitted: true, 
            });
        }

        if (nextProps.talks && !this.hasDuplicates(nextProps.talks, this.state.talks.slice())) {
            const talks = this.state.talks.concat(nextProps.talks);
            this.setState({
                talks,
                hasMore: nextProps.count > talks.length,
            });
        }
    }

    hasDuplicates = (talkSubset = [], talkSuperset = []) => {
        if (talkSubset.length < 1 || talkSuperset.length < 1) return false;

        let hasDuplicate = false;
        talkSubset = new Set(talkSubset.map(talk => talk.id));

        for (let i = 0, len = talkSuperset.length; i < len; ++i) {
            if (talkSubset.has(talkSuperset[i].id)) {
                hasDuplicate = true;
                break;
            }
        }

        return hasDuplicate;
    }

    onNameChange = (name = "") => {
        if (typeof name !== "string" || name.length > this.MAX_NAME_LEN) return;

        this.setState({ name });
    }

    onDescriptionChange = (description = "") => {
        if (typeof description !== "string" || description.length > this.MAX_DESCRIPTION_LEN) return;

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

    voteOnTalk = (index, talk) => {
        let talks = this.state.talks;
        let updatedTalk = Object.assign({}, talk);

        if (updatedTalk.hasUpvoted) {
            updatedTalk.upvotes = updatedTalk.upvotes - 1;
            updatedTalk.hasUpvoted = 0;
            this.props.downvoteTalk(talk.id);
        } else {
            updatedTalk.upvotes = updatedTalk.upvotes + 1;
            updatedTalk.hasUpvoted = 1;
            this.props.upvoteTalk(talk.id);
        }

        this.setState({ 
            talks: [
                ...talks.slice(0, index),
                updatedTalk,
                ...talks.splice(index + 1)
            ],
        });
    }

    sortTalks = (orderBy = "recent") => {
        this.setState({
            orderBy, 
        }, () => this.rehydrateTalks());
    }

    rehydrateTalks = async () => {
        await this.setState({ ready: false, talks: [] });
        await this.props.rehydrateTalks(1, pageSize, this.state.orderBy);
        this.setState({ ready: true, isFormVisible: false });
    }

    onSubmitTalk = async (e) => {
        e.preventDefault();
        const name = this.state.name.trim();
        const description = this.state.description.trim();
        const tags = this.state.tags.map(tag => tag.text);

        if (name.length > this.MAX_NAME_LEN || description.length > this.MAX_DESCRIPTION_LEN) {
            this.setState({
                error: 'Name or description exceeds the character length limit',
            });

            return;
        }

        this.setState({
            name: "",
            description: "",
            tags: [],
        });

        await this.props.submitTalk({ name, description, tags });
        await this.rehydrateTalks();
    }

    toggleForm = () => {
        this.setState({
            isFormVisible: !this.state.isFormVisible
        });
    }

    hideForm = () => {
        this.setState({
            isFormVisible: false
        });
    }

    onDeleteTalk = async (id) => {
        await this.props.deleteTalk(id);
        await this.rehydrateTalks();
    }

    requireApp = async (fn, ...args) => {
        if (this.state.appSubmitted) {
            fn(args);
        } else {
            this.props.displayBanner('You must submit an application before performing this action', 5000);
        }
    }

    render() {
        return (
            <div className="mw8 center pv6 ph4">
                <h1 className="karla white antialias f2">Lightning Talks</h1>
                <p className="karla white antialias lh-copy mw7 f5">Lightning talks are five-minute presentations that can be on anything, technical or non-technical. Talks are proposed and voted on by students. Students whose talks are accepted are guaranteed admittance to WildHacks. Vote on talks below or&nbsp;
                    <Link 
                        className="white"
                        onClick={ e => {
                            e.preventDefault();
                            this.requireApp(this.toggleForm);
                        }}
                    >
                        propose your own.
                    </Link>
                </p>
                <div className={`mw6 ${this.state.isFormVisible ? '' : 'dn' }`}>
                    <h1 className="karla white f3 mb2 antialias">
                        Propose a Lightning Talk
                    </h1>
                    { this.state.error &&
                        <p className="karla antialias wh-pink mv2">{ this.state.error }</p>
                    }
                    <form
                        onSubmit={ this.onSubmitTalk }
                    >
                        <div className="relative">
                            <label className="karla wh-off-white antialias f5 mb2 db">Title</label>
                            <FormInput
                                className="mb2"
                                value={ this.state.name }
                                placeholder="Talk name"
                                maxLength={this.MAX_NAME_LEN}
                                onChange={ e => this.onNameChange(e.target.value) }
                            />
                            <span className="absolute bottom-0 right-0">
                                <p className="karla gray antialias ma1">{ this.MAX_NAME_LEN - this.state.name.length }</p>
                            </span> 
                        </div>
                        <div className="relative">
                            <label className="karla wh-off-white antialias f5 mb2 db">Description</label>
                            <FormTextArea 
                                className="mb2"
                                value={ this.state.description }
                                placeholder="What is your talk about?"
                                height={100}
                                maxLength={this.MAX_DESCRIPTION_LEN}
                                onChange={ e => this.onDescriptionChange(e.target.value) }
                            />
                            <span className="absolute bottom-0 right-0">
                                <p className="karla gray antialias ma1 mb2">{ this.MAX_DESCRIPTION_LEN - this.state.description.length }</p>
                            </span> 
                        </div>
                        <div className="lightning-talk-tags">
                            <label className="karla wh-off-white antialias f5 mb2 db">Tags (max 5)</label>
                            <Tags
                                classNames={{
                                    tags: "tags",
                                    tagInput: "tag-input",
                                    tagInputField: "tags-input-field karla pa2 input-reset br2 ba w-100 mb2",
                                    tag: "tag karla white antialias dib pa2 bg-wh-pink mb2 mr2 br2",
                                    selected: "selected",
                                    remove: "remove ml2 pointer",
                                }}
                                tags={ this.state.tags }
                                handleDelete={ this.deleteTag }
                                handleAddition={ this.addTag }
                                handleDrag={ this.handleDrag }
                                requireApp={ this.requireApp }
                                maxLength={25}
                                placeholder="Press Enter or Tab to submit"
                            />
                        </div>
                        <Button
                            backgroundColor="bg-wh-pink"
                            onClick={ this.onSubmitTalk }
                            className="mb4"
                            type="submit"
                        >
                            Submit Talk
                        </Button>
                        <Link
                            className="white ml2"
                            onClick={ e => {
                                e.preventDefault();
                                this.hideForm();
                            }}
                        >Close form</Link>
                    </form>
                </div>
                <div className="filters">
                    { this.state.orderBy === 'popular' ?
                        <Link
                            className="white mr2"
                            onClick={ e => {
                                e.preventDefault();
                                this.sortTalks();
                            }}
                        >
                            Sort by recent
                        </Link>
                        :
                        <Link
                            className="white"
                            onClick={ e => {
                                e.preventDefault();
                                this.sortTalks("popular");
                            }}
                        >
                            Sort by popular
                        </Link>
                    }
                </div>
                <Talks 
                    ready={this.state.ready}
                    orderBy={this.state.orderBy}
                    talks={this.state.talks}
                    hasMore={this.state.hasMore}
                    pageSize={pageSize}
                    count={this.props.count}
                    user={this.props.user}
                    requireApp={this.requireApp}
                    deleteTalk={this.onDeleteTalk}
                    fetchTalks={this.props.fetchTalks}
                    voteOnTalk={this.voteOnTalk}
                    isFetching={this.props.isFetchingTalks}
                />
            </div>
        );
    }
}

LightningTalksPage.propTypes = {
    submitTalk: PropTypes.func.isRequired,
    fetchTalkById: PropTypes.func.isRequired,
    fetchTalks: PropTypes.func.isRequired,
    rehydrateTalks: PropTypes.func.isRequired,
    upvoteTalk: PropTypes.func.isRequired,
    downvoteTalk: PropTypes.func.isRequired,
    displayBanner: PropTypes.func.isRequired,
    getApp: PropTypes.func.isRequired,
    talk: PropTypes.object,
    talks: PropTypes.array,
    app: PropTypes.object,
    isFetchingTalks: PropTypes.bool.isRequired,
};

export default LightningTalksPage;
