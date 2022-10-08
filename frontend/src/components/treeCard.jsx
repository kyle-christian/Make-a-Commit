import { Link } from "react-router-dom";

export default function Hero( {tree} ) {

  const handleClick = async () => {
    const response = await fetch('http://localhost:4000/api/trees/' + tree._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      window.location.reload();
      console.log('tree deleted')
    } else {
      console.log(error)
    }
  }
  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">{tree.title}</h2>
        <p>{tree.treeAge}</p>
        <span>{tree.treeDate}</span>
        <div className="card-actions justify-end">
          <Link to={{pathname: `tree/${tree._id}`}} state={{ tree: tree }} className="btn">Visit Tree</Link>
          <button onClick={handleClick} className="btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
