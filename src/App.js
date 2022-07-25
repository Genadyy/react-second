import React, { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/postList/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modals/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount } from "./utils/page";
import { getPagesArray } from "./utils/page";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  console.log(pagesArray);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  /*async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 2000);
  }*/

  const createPost = (newPost) => {
    if (newPost.title && newPost.body) {
      setPosts([...posts, newPost]);
      setModal(false);
    }
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const switchPage = (n) => {
    setPage(n);
    fetchPosts();
  };

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Add post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && (
        <h1 style={{ marginTop: "100px" }}>The error occurred: ${postError}</h1>
      )}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          <PostList
            posts={sortedAndSearchedPosts}
            title="Post List"
            remove={removePost}
          />
          <div className="pages__block">
            {pagesArray.map((p) => (
              <span className="page" onClick={() => switchPage(p)}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
