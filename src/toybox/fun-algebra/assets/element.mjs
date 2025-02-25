const html = String.raw;

export class WavebeemVectorProjection extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.shadowRoot.innerHTML = html`
      <style>
        :root {
          display: block;
        }

        #game {
          background: white;
          display: block;
          max-width: 100%;
          border-radius: 8px;
        }
      </style>
      <canvas id="game" width="400" height="400"></canvas>
    `;
  }

  connectedCallback() {
    this.canvas = this.shadowRoot.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 4;

    this.canvas.addEventListener("mousemove", (event) => {
      p3.x = event.offsetX;
      p3.y = event.offsetY;
    });

    const p1 = { x: 100, y: 300 };
    const p2 = { x: 300, y: 100 };
    const p3 = { x: -100, y: -100 };
    const p4 = { x: -100, y: -100 };

    const drawLine = (p1, p2) => {
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    };

    const TWO_PI = 2 * Math.PI;
    const radius = 8;

    const drawPoint = (p1) => {
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, radius, 0, TWO_PI);
      this.ctx.fill();
    };

    const updateState = () => {
      // Remember that the slope of a line is the change in Y (rise) divided by
      // the change in X (run).
      //
      // We know that the point we want to find will be on a line perpendicular
      // to the one in question, and the slope of a perpendicular line is the
      // negative inverse.
      //
      // So we can compute the functions using point-slope form.
      //
      // Then we solve both equations for Y, set them equal to each other, and
      // solve for X.
      //
      // Now we can finally plug this X value in to the equation for the
      // perpendicular line (actually either would work) to find the correct Y
      // value to go with it.

      // Slope of the primary line
      const a = (p2.y - p1.y) / (p2.x - p1.x);

      // Slope of the perpendicular line to the primary line
      const b = -1 / a;

      // X-coordinate where the two lines meet
      const x = (p3.y - b * p3.x - p1.y + a * p1.x) / (a - b);

      // Y-coordinate where the two lines meet
      const y = p3.y + b * (x - p3.x);

      p4.x = x;
      p4.y = y;
    };

    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      updateState();

      this.ctx.fillStyle = "hsl(0, 100%, 30%)";
      this.ctx.strokeStyle = "hsl(0, 100%, 20%)";
      drawLine(p1, p2);
      drawPoint(p1);
      drawPoint(p2);

      this.ctx.fillStyle = "hsl(180, 100%, 30%)";
      this.ctx.strokeStyle = "hsl(180, 100%, 20%)";
      drawLine(p3, p4);
      drawPoint(p3);
      drawPoint(p4);

      if (this.isConnected) {
        requestAnimationFrame(loop);
      }
    };

    loop();
  }

  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }
}

customElements.define(
  "wavebeem-disjoint-graph-union",
  WavebeemVectorProjection
);
