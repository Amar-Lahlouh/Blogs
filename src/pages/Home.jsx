import { useEffect, useState } from "react";
import knefe from "../assets/knefe.jpg";
import axios from "axios";

// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat = searchParams.get("cat") || "";
  //const catQueryParam = cat ? `?cat=${cat}` : "";

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(cat);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  useEffect(() => {
    AOS.init({
      duration: 1500, // You can set your preferred duration in milliseconds
    });
  }, []);
  return (
    <div className="home posts-container">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id} data-aos="fade-left">
              <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
