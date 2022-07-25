import React from 'react';
import MyButton from './../UI/buttons/MyButton';


const PostItem = ({number, post, remove}) => {
    return (
        <div className="post">
            <div className="post_content">
                <h1 className="post_title">{number}. {post.title}</h1>
                <div className="post_description">{post.body}</div>
            </div>
            <div className="post_btn">
                <MyButton onClick = {() => remove(post)}>Delete</MyButton>
            </div>
        </div>
    )
}



export default PostItem;