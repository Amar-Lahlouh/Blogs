import knefe from "../../assets/knefe.jpg";
import "./Menu.css";
import axios from "axios";
import { useState, useEffect } from "react";
function Menu({ cat }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
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

  // const posts = [
  //   {
  //     id: 1,
  //     title: "knefe",
  //     desc: "         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, quasi.Kteer tybe w feya sekkar",
  //     img: knefe,
  //   },
  //   {
  //     id: 23,
  //     title: "shawerma",
  //     desc: "        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, quasi. Kteer tybe w feya sekkar",
  //     img: knefe,
  //   },
  //   {
  //     id: 22,
  //     title: "shawerma",
  //     desc: "         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, quasi.Kteer tybe w feya sekkar",
  //     img: knefe,
  //   },
  //   {
  //     id: 2,
  //     title: "shawerma",
  //     desc: "         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, quasi.Kteer tybe w feya sekkar",
  //     img: knefe,
  //   },
  //   {
  //     id: 3,
  //     title: "ma3karona",
  //     desc: "         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, quasi.Kteer tybe w feya sekkar",
  //     img: knefe,
  //   },
  // ];
  return (
    <div>
      <h2>Other posts you may Like</h2>
      <div className="others">
        {posts.map((post) => {
          return (
            <div className="pos" key={post.id}>
              <img
                src={`../upload/${post?.img}`}
                style={{ width: "300px" }}
                alt="Image"
              />
              ;<h2>{post.title}</h2>
              <button>Read More</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
