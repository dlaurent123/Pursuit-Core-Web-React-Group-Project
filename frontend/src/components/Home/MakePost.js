import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useInput } from '../../util/customHooks';
import '../../css/MakePost.css';

const MakePost = ({ userId }) => {
    const [file, setFile] = useState();
    const caption = useInput();
    const tagOne = useInput("");
    const tagTwo = useInput("");
    const tagThree = useInput("");
  
    const onSubmit = async e => {
      try {
        e.preventDefault();
        const formData = new FormData();
  
        formData.append("myImage", file);
        formData.append("poster_id", userId);
        formData.append("caption", caption.value);
        formData.append("created_at", new Date().toString());
  
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        debugger;
        let res = await axios.post("/api/posts", formData, config);

        let tags = [tagOne.value, tagTwo.value, tagThree.value];
        tags.forEach(async (tag) => {
            if(tag !== "") {
                let tagsRes = await axios.post("/api/tags", {post_id: res.data.post.id, tag})
                debugger;
            }
        })
      } catch (err) {
        console.log(err);
      }
    };
    const onChange = e => {
      setFile(e.target.files[0]);
    };
    console.log(caption);
  
    return (
      <form onSubmit={onSubmit} className="makePostForm">
        <label className="makePostFile">
        File Upload:
            <input type="file" name="myImage" onChange={onChange} />
        </label>

        <label className="makePostCaption">
        Caption:
            <input placeholder="Enter a caption" type="text" {...caption}/>
        </label>

        <label>
        Tag One:
            <input placeholder="Enter a tag" type="text" {...tagOne} />
        </label>

        <label>
        Tag Two:
            <input placeholder="Enter a tag" type="text" {...tagTwo} />
        </label>

        <label>
        Tag Three:
            <input placeholder="Enter a tag" type="text" {...tagThree} />
        </label>
        <input type="submit" className="button"></input>
      </form>
    );
}

export default MakePost