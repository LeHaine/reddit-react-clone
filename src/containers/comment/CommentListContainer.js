import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ScrollDetector from "../../components/ScrollDetector";
import { fetchComments } from "../../state/actions";
import CommentList from "./CommentList";

class CommentListContainer extends Component {
    handleScroll = bottomReached => {
        if (bottomReached) {
            const { page, pagesFetched, lastPage, loading } = this.props;
            if (
                !pagesFetched.includes(page + 1) &&
                page < lastPage - 1 &&
                !loading
            ) {
                this.props.fetchComments(this.props.postId, page + 1);
            }
        }
    };
    componentDidMount() {
        if (!this.props.pagesFetched.includes(0)) {
            this.props.fetchComments(this.props.postId);
        }
    }
    render() {
        let loader;
        if (this.props.loading) {
            loader = <span>Loading...</span>;
        }
        return (
            <ScrollDetector
                className="CommentListContainer"
                onPageScroll={this.handleScroll}
            >
                <CommentList comments={this.props.comments} />
                {loader}
            </ScrollDetector>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: (postId, page = 0) =>
            dispatch(fetchComments(postId, page))
    };
};

const mapStateToProps = state => {
    return {
        comments: state.fetch.comments.data,
        page: state.fetch.comments.page,
        lastPage: state.fetch.comments.lastPage,
        pagesFetched: state.fetch.comments.pagesFetched,
        loading: state.fetch.comments.loading,
        error: state.fetch.comments.error,
        isAuthed: state.auth.isAuthed
    };
};
CommentListContainer.propTypes = {
    postId: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    pagesFetched: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer);
