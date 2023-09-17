import CardSkeleton from "../components/CardSkeleton";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";

const Blog = () => {
    const params = useParams();
    console.log(params);
    const [van, setVan] = useState([]);
    // console.log(van);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        // border: "2px solid red",
        placeItems: "center",
      }}
    >
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <h1></h1>
    </div>
  );
};

export default Blog;
