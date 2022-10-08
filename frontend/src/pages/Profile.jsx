import { useEffect, useState } from "react";
import TreeCard from "../components/treeCard";

const Profile = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetch("http://localhost:4000/api/trees");
      const json = await response.json();

      if (response.ok) {
        setTrees(json);
      }
    };

    fetchTrees();
  }, []);

  return (
    <div className="flex justify-around">
      {trees.map((tree) => {
        return <TreeCard key={tree._id} tree={tree} />;
      })}
    </div>
  );
};

export default Profile;
