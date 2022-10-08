import { useState } from "react";

export default function commitForm() {
  const [title, setTitle] = useState("");
  const [treeAge, setTreeAge] = useState(2);
  const [treeDate, setTreeDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tree = { title, treeAge, treeDate };

    const response = await fetch("http://localhost:4000/api/trees", {
      method: "POST",
      body: JSON.stringify(tree),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle("");
      setTreeAge(2);
      setTreeDate("");
      setError(null);
      window.location.reload();
      console.log("new tree added", json);
    }
  };

  const handleClick = () => {
    setError(null)
  }

  return (
    <div className="mt-4 text-center" onSubmit={handleSubmit}>
      <form>
        <h1>Create a new Tree</h1>

        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Tree Name"
          className="mr-4"
        />

        <input
          type="number"
          onChange={(e) => setTreeAge(e.target.value)}
          value={treeAge}
          placeholder="Tree Age"
          className="mr-4"
        />

        <input
          type="date"
          onChange={(e) => setTreeDate(e.target.value)}
          value={treeDate}
          placeholder="Date"
          className="mr-4"
        />

        <button className="btn btn-primary">Create</button>

        {error && (
          <div className="alert alert-error shadow-lg mt-4 cursor-pointer" onClick={handleClick}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
