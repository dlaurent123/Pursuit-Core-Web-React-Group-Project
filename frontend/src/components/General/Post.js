import React from "react";
import Tag from "./Tag";
import "../../css/Post.css";

const Post = ({ poster, picture, caption, tags }) => {
  console.log(poster);

  //   let tagsList = tags.map(tag => {
  //     return <Tag tagName={tag.tag} />;
  //   });

  return (
    <div className="postContainer">
      <p className="poster">{poster}</p>
      <img src={picture} alt={caption} className="postImage" />
      <p className="caption">{caption}</p>
      {/* <div className="tags">{tagsList}</div> */}
    </div>
  );
};

export default Post;
