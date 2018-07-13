import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../containers/Post";
import { fetchPosts } from "../state/actions";
import "./css/PostList.css";

class PostList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { error, loading, posts } = this.props;
        if (error) {
            return <div>Error loading posts.</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="PostList">
                <div className="posts">
                    {posts.map(post => <Post key={post.id} post={post} />)}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    };
};

const mapStateToProps = state => {
    return {
        posts: state.fetch.posts.data ? state.fetch.posts.data.content : [],
        loading: state.fetch.posts.loading,
        error: state.fetch.posts.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
