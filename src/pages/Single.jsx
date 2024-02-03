import del from "../assets/delete.jpg";
import edit from "../assets/edit.png";
import { Link } from "react-router-dom";
import "./main.css";
import moment from "moment";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Menu } from "../Components";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
function Single() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({});
  //ana bde jeb al id
  const location = useLocation();
  const pathnameParts = location.pathname.split("/");
  const postId = pathnameParts.length >= 3 ? pathnameParts[2] : null;
  const handleDelete = async () => {
    try {
      console.log(`${postId}`);
      console.log(currentUser.id);
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(currentUser.id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  // krmal yjble klshy hsab al id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [postId]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.post_img}`} alt="" />
        <div className="user">
          {post.userimg && <img src={post?.userimg} alt="" />}
          {/* Yane iza fe sura btbyn */}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={del} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Single;
