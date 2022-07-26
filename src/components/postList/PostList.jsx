import React from "react";
import PostItem from "./../postItem/PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "30px",
          color: "red",
          fontFamily: "sans-serif",
        }}
      >
        Post List is empty
      </div>
    );
  }
  return (
    <div>
      <h1 className="title">{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={1000} classNames="post">
            <PostItem
              number={index + 1}
              post={post}
              key={post.id}
              remove={remove}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
