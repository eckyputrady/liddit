import { PostDetailPage } from "./page/PostDetailPage";
import { PostsPage } from "./page/PostsPage";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function App() {
  return (
    <div
      className="app"
      style={{
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "black",
        color: "lightgray",
      }}
    >
      {/* <PostsPage /> */}
      <PostDetailPage />
    </div>
  );
}

export default App;
