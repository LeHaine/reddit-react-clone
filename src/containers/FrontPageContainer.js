import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ScrollDetector from "../components/ScrollDetector";
import { fetchPosts } from "../state/actions";
import PostList from "./post/PostList";

class FrontPageContainer extends Component {
    handleScroll = bottomReached => {
        if (bottomReached) {
            const { page, pagesFetched, lastPage, loading } = this.props;
            if (
                !pagesFetched.includes(page + 1) &&
                page < lastPage - 1 &&
                !loading
            ) {
                this.props.fetchPosts(page + 1);
            }
        }
    };
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        let loader;
        if (this.props.loading) {
            loader = <span>Loading...</span>;
        }
        return (
            <ScrollDetector
                className="FrontPageContainer"
                onPageScroll={this.handleScroll}
            >
                <PostList posts={this.props.posts} />
                {loader}
            </ScrollDetector>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: (page = 0) => dispatch(fetchPosts(page))
    };
};

const mapStateToProps = state => {
    return {
        posts: state.fetch.posts.data,
        page: state.fetch.posts.page,
        lastPage: state.fetch.posts.lastPage,
        pagesFetched: state.fetch.posts.pagesFetched,
        loading: state.fetch.posts.loading,
        error: state.fetch.posts.error
    };
};
FrontPageContainer.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    pagesFetched: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FrontPageContainer);
