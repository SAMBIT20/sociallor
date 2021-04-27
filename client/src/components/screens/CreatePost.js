import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Created post Successfully",
              classes: "#1e88e5 blue darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dtebcxnqh");
    fetch("	https://api.cloudinary.com/v1_1/dtebcxnqh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-filed"
      style={{ margin: "10px auto", maxWidth: "500px", height: "400px" }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div
          className="btn blue darken-1"
          style={{
            width: "150px",
            marginTop: "0px",
            marginLeft: "2px",
          }}
        >
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
          <button
            type="submit"
            className="btn waves-light waves-effect blue darken-1"
            onClick={() => postDetails()}
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
