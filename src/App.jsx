import User from "./components/User";
import { useState, useRef, useEffect } from "react";
import { fetchUserData, fetchPostsData, addUser } from "../services";
// import './App.css'

function App() {
  const [userList, setUserList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [newName, setNewName] = useState("");

  const newNameRef = useRef("");
  const newPostRef = useRef("");

  useEffect(() => {
    // fetch user data
    const fetchUsers = async () => {
        setLoading(true);
        const users = await fetchUserData();
        setUserList(users);
        setLoading(false);
      };

    // fetch posts data
    const fetchPosts = async () => {
        setLoading(true);
        const posts = await fetchPostsData();
        setPostList(posts);
        setLoading(false);
      };
    fetchUsers();
    fetchPosts();
  }, []);

  const handleSubmitRef = (event) => {
    event.preventDefault();
    // setUserList((prevUserList) => {
    //   return [...prevUserList, { name: newNameRef.current.value }];
    // });

    const newUser  = {
      name: newNameRef.current.value,
      "id": userList.length + 1,
      "email": `${newNameRef.current.value.toLowerCase()}@example.com`,
      "role": "Frontend Developer"
    }

    addUser(newUser)
      .then((addedUser) => {
        setUserList((prevUserList) => [...prevUserList, addedUser]);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleSubmitPostRef = (event) => {
    event.preventDefault();
    setPostList(() => {
      return [...postList, { title: newPostRef.current.value }];
    });
  };

  return (
    <>
      <div>
        <h3>Add User</h3>
        <input type="text" placeholder="Enter new name" ref={newNameRef} />
        <button type="submit" onClick={handleSubmitRef}>
          {" "}
          Add Name
        </button>
      </div>
      <div>
        <h3> Add User Post</h3>
        <input
          type="text"
          placeholder="Enter new post title"
          ref={newPostRef}
        />
        <button type="submit" onClick={handleSubmitPostRef}>
          {" "}
          Add Post
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div>
            {userList.length === 0 ? (
              <h2>No User Found</h2>
            ) : (
              userList.map((user, index) => (
                <User key={index} name={user.name} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
