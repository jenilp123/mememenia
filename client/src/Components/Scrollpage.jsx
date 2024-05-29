import React, { useEffect, useState, useContext } from "react";
import ComentsContext from "../myContext";

import Post from "./Post";

export default function Scrollpage({
  active,
  handleCommentBox,
  commentActive,
}) {
  const [posts, setPosts] = useState([]);
  const [user , setUser] = useState("")
  const blurClass = "blur";

  useEffect(() => {
    fetch("/GetAllPosts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        setPosts(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once
const {userName} = useContext(ComentsContext)
useEffect(()=>{
  setUser(userName)
},[userName])
  return (
    <>
      <div
        className={`containerScrollPage w-48 h-screen overflow-y-auto bg-black text-white ${
          active === "Add Post" ? blurClass : undefined
        }`}>
        <h3>Home</h3>
        <div className="text-white z-20 ">{user}</div>
        <i className="z-20 fa-solid fa-arrow-rotate-right absolute top-6 right-2 text-white" onClick={()=>{window.location.reload()}}></i>
        {/* Map over posts array and render Post components */}
        {posts.map((post) => (
          <Post
            handleCommentBox={handleCommentBox}
            commentActive={commentActive}
            name={post.accountName}
            date={post.date}
            img={post['imgUrl']}
            id={post['_id']}
          />
        ))}
      </div>
    </>
  );
}
