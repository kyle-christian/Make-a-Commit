import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Tree() {
  const location = useLocation();
  const { tree } = location.state;

  const [commitMessage, setCommitMessage] = useState({
    message: ""
  })

  const [error, setError] = useState(null)

  //form handler

  const handleChange = (event) => {
    setCommitMessage({ [event.target.name]: event.target.value })
    const commitCheck = "i commit -m"
    const commitCheckMessage = commitMessage.message.split(' ').splice(0, 3).join(' ');

    if (commitCheckMessage != commitCheck) {
      setError(`Please input "i commit -m "`)
      document.getElementById("checker").classList.add("input-error")
    } else {
      setError("")
      document.getElementById("checker").classList.remove("input-error")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(commitMessage.message)
  }

  //error click handler

  const handleClick = () => {
    setError(null)
  }

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

  return (
    <div className="page flex flex-col justify-center items-center">
      <canvas></canvas>
      <article className="prose text-center">
        <h1>{tree.title}</h1>
        <p>{tree.treeAge}</p>
      </article>

      
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          id="checker"
          type="text"
          placeholder='i commit -m "your message"'
          className="input input-ghost w-full max-w-xs"
          onChange={handleChange}
          name="message"
        />

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
