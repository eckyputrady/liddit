import { PostDetailPage } from "./page/PostDetailPage";
import { PostsPage } from "./page/PostsPage";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function Home() {
  return <Navigate replace to="/r/indonesia" />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "r/:subreddit",
      element: <PostsPage />,
    },
    {
      path: "p/:postId",
      element: <PostDetailPage />,
    },
  ]);
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
