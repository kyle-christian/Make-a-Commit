import { Link } from "react-router-dom";

export default function Hero( {tree} ) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{tree.title}</h2>
        <p>{tree.treeAge}</p>
        <span>{tree.createdAt}</span>
        <div className="card-actions justify-end">
          <Link to={{pathname: `tree/${tree._id}`}} state={{ tree: tree }} className="btn">Visit Tree</Link>
        </div>
      </div>
    </div>
  );
}
