import ReactQuill from "react-quill";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import moment from "moment";
function Write() {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const navigate = useNavigate();
  const state = useLocation().state;
  console.log(state);
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(state?.post_img || "");
  const [cat, setCat] = useState(state?.cat || "");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); //file tnye hyye input mn l useState
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("data", res.data);
      console.log("file", file);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    let data = {
      title,
      desc: value,
      cat,
      img: imgUrl || file,
    };

    try {
      //yaane update
      state
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, data, {
            withCredentials: true,
          })
        : await axios.post(
            `http://localhost:8800/api/posts/`,
            {
              ...data,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          ;
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>
            Public
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          <div className="buttons">
            <button className="b1">Save as Draft</button>
            <button className="b2" onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            {" "}
            <input
              type="radio"
              name="cat"
              checked={cat === "art"}
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            {" "}
            <input
              type="radio"
              name="cat"
              checked={cat === "technology"}
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            {" "}
            <input
              type="radio"
              name="cat"
              checked={cat === "cinema"}
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            {" "}
            <input
              type="radio"
              name="cat"
              value="design"
              checked={cat === "design"}
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            {" "}
            <input
              type="radio"
              name="cat"
              value="food"
              checked={cat === "food"}
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
