import { useLocation } from "react-router-dom";
import { useEffect, useState, createRef } from "react";
import { isEqual, parseISO, format } from "date-fns";

export default function Tree() {
  const location = useLocation();
  const { tree } = location.state;

  //importing tree data again as page won't reflect new treeAge on reload unless I use context

  const [trees, setTrees] = useState({});

  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetch(
        "http://localhost:4000/api/trees/" + tree._id
      );
      const json = await response.json();

      if (response.ok) {
        setTrees(json);
      }
    };

    fetchTrees();
  }, []);

  const [commitMessage, setCommitMessage] = useState({
    message: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //push button

  const [push, setPush] = useState(true);
  const pushButton = createRef();

  function testingFunction() {
    console.log("click");
    pushButton.current.disabled = "true";
  }

  //form handler

  const handleChange = (event) => {
    setCommitMessage({ [event.target.name]: event.target.value });
  };

  // useEffect for errorhandler

  useEffect(() => {
    pushButton.current.disabled = push;

    if (!commitMessage.message) {
      return;
    }
    const commitCheck = "i commit -m";
    const commitCheckMessage = commitMessage.message
      .split(" ")
      .splice(0, 3)
      .join(" ");

    if (commitCheckMessage != commitCheck) {
      setError(`Please input "i commit -m"`);
      setPush(true);
      document.getElementById("checker").classList.add("input-warning");
    } else {
      setError("");
      setPush(false);
      document.getElementById("checker").classList.remove("input-warning");
    }
  }, [commitMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      document.getElementById("submit-error").classList.add("alert-error");
      return setError('Make sure "i commit -m" is exact!');
    }

    const response = await fetch(
      "http://localhost:4000/api/trees/" + tree._id,
      {
        method: "PATCH",
        body: JSON.stringify(tree),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    window.location.reload();
    setSuccess(!success);
    console.log(json);
  };

  //error click handler

  const handleClick = () => {
    setError(null);
  };

  //tree generation
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (tree.treeAge > 200) {
      canvas.width = 1400;
      canvas.height = 1400;
    } else {
      canvas.width = 900;
      canvas.height = 900;
    }

    const ctx = canvas.getContext("2d");

    function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
      ctx.beginPath();
      ctx.save();
      ctx.strokeStyle = color1;
      ctx.fillStyle = color2;
      ctx.lineWidth = branchWidth;
      ctx.translate(startX, startY);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();
      if (len < 10) {
        ctx.restore();
        return;
      }
      drawTree(0, -len, len * 0.78, angle + 8, branchWidth * 0.7);
      drawTree(0, -len, len * 0.78, angle - 8, branchWidth * 0.7);
      ctx.restore();
    }

    drawTree(
      canvas.width / 2,
      canvas.height,
      tree.treeAge,
      0,
      15,
      "black",
      "green"
    );
  }, []);

  //date checker
  useEffect(() => {
    const todaysDate = format(new Date(), "MM/dd/yyyy");
    const updatedDate = format(new Date(tree.updatedAt), "MM/dd/yyyy");
    const createdAt = format(new Date(tree.createdAt), "MM/dd/yyyy");

    console.log(`${todaysDate} | ${updatedDate} | ${createdAt}`);

    if (todaysDate === updatedDate) {
      document.querySelector("#checker").disabled = "true";
      setSuccess(true);
    }
  }, []);

  return (
    <div className="page flex flex-col justify-center items-center">
      <canvas></canvas>
      <article className="prose text-center">
        <h1>{tree.title}</h1>
        <p>{trees.treeAge}</p>
      </article>

      <form className="mt-4" onSubmit={handleSubmit}>
        <span>your messages will never be saved.</span>
        <div className="flex">
          <input
            id="checker"
            type="text"
            placeholder='i commit -m "your message"'
            className="input input-ghost w-full max-w-xs"
            onChange={handleChange}
            name="message"
            autoComplete="off"
          />

          <button ref={pushButton} className="btn btn-primary ml-2">
            push!
          </button>
        </div>

        {error && (
          <div
            id="submit-error"
            className="alert alert-warning shadow-lg mt-4 cursor-pointer"
            onClick={handleClick}
          >
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

        {success && (
          <div className="alert alert-success shadow-lg mt-4">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Commit pushed!</span>
            </div>
          </div>
        )}
      </form>

      <div className="card w-4/5 bg-base-100 shadow-xl">
        <figure>
          <canvas></canvas>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
