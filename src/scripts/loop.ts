type LoopArguments = {
  update: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => void;
  draw: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    delta: number
  ) => void;
};

function clearCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export const loop = ({ update, draw }: LoopArguments) => {
  let lastTime = Date.now();
  const canvas = document.querySelector("canvas");
  const context = canvas?.getContext("2d");

  if (!context || !canvas) throw new Error("Could not find canvas");

  const run = () => {
    const now = Date.now();

    // Time passed in seconds
    const delta = (now - lastTime) / 1000;

    update(canvas, context, delta);
    clearCanvas(canvas, context);
    draw(canvas, context, delta);

    lastTime = now;

    requestAnimationFrame(run);
  };

  requestAnimationFrame(run);
};
