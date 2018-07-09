import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import { fetchPosts } from "../state/actions";
import "../css/PostList.css";

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
        posts: state.posts.posts,
        loading: state.posts.loading,
        error: state.posts.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);