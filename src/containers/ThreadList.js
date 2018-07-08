import React, { Component } from "react";
import { connect } from "react-redux";
import Thread from "../components/Thread";
import { fetchThreads } from "../state/actions";
import "../css/ThreadList.css";

class ThreadList extends Component {
    componentDidMount() {
        this.props.fetchThreads();
    }

    render() {
        const { error, loading, threads } = this.props;
        if (error) {
            return <div>Error loading threads.</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className="ThreadList">
                <div className="threads">
                    {threads.map(thread => (
                        <Thread key={thread.id} thread={thread} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: () => dispatch(fetchThreads())
    };
};

const mapStateToProps = state => {
    return {
        threads: state.threads.threads,
        loading: state.threads.loading,
        error: state.threads.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadList);
