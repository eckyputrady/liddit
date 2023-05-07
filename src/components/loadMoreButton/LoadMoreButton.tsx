import { useState } from "react";
import "./LoadMoreButton.css";

export interface LoadMoreButtonProps {
  onClick: () => Promise<void>;
}

export function LoadMoreButton(props: LoadMoreButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    setLoading(true);
    try {
      await props.onClick();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="loadMoreButton" onClick={handleClick} disabled={loading}>
      {loading ? "Loading ..." : "Load More"}
    </button>
  );
}
