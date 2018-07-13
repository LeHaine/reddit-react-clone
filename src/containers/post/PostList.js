import React, { Component } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import "./css/PostList.css";

class PostList extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="PostList">
                <div className="posts">
                    {posts.map(post => <Post key={post.id} post={post} />)}
                </div>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostList;
