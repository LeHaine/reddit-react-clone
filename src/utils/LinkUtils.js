export const determinePostLink = post => {
    return (
        "/r/" +
        post.sub.name +
        "/comments/" +
        post.id +
        "/" +
        post.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_")
    );
};
