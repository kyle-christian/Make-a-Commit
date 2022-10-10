import { useEffect, useState } from "react";
import TreeCard from "../components/treeCard";
import CommitForm from "../components/commitForm"
import ProfileHeader from "../components/profileHeader"

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
    <div className="page">
      <ProfileHeader />

      <div className="flex flex-wrap justify-center gap-4 mt-4">

        {trees.map((tree) => {
          return <TreeCard key={tree._id} tree={tree} />;
        })}
        {trees.length < 3 ? <CommitForm /> : <span className="text-center w-full">Please complete or delete these trees before starting another one.</span>}
      </div>
    </div>
  );
};

export default Profile;
