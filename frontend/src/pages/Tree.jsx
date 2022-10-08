import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Tree() {
  const location = useLocation();
  const { tree } = location.state;

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
      canvas.height - 20,
      tree.treeAge,
      0,
      15,
      "black",
      "green"
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <canvas></canvas>
      <h1>{tree.title}</h1>
      <h2>{tree.treeAge}</h2>
    </div>
  );
}
