const html = String.raw;

export class WavebeemDisjointGraphUnion extends HTMLElement {
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
    /** @type {HTMLCanvasElement} */
    this.canvas = this.shadowRoot.getElementById("game");
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext("2d");

    const xy = [
      [34, 28],
      [115, 25],
      [106, 80],
      [57, 148],
      [199, 55],
      [344, 41],
      [270, 118],
      [324, 171],
      [366, 254],
      [155, 204],
      [79, 284],
      [179, 277],
      [252, 348],
    ];

    const ij = [
      [0, 1],
      [1, 2],
      [2, 3],

      [4, 5],
      [5, 6],
      [6, 7],

      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
    ];

    /** @type {Node[]} */
    const nodes = [];

    /** @type {Segment[]} */
    const segments = [];

    for (const [x, y] of xy) {
      nodes.push(new Node(x, y));
    }

    for (const [i, j] of ij) {
      segments.push(new Segment(nodes[i], nodes[j]));
    }

    const drawLine = (p1, p2, dt) => {
      const k = Math.abs(Math.cos(dt / 500));
      this.ctx.lineWidth = 4 + k;
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    };

    const TWO_PI = 2 * Math.PI;
    const radius = 10;

    const drawPoint = (p1, dt) => {
      const k = Math.sin(dt / 500);
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, radius + k, 0, TWO_PI);
      this.ctx.fill();
    };

    const palette = ["Crimson", "DodgerBlue", "BlueViolet"];
    this.ctx.shadowColor = "rgb(0 0 0 / 20%)";

    const setTheme = (index, dt) => {
      const k = Math.sin(dt / 500);
      const q = Math.cos(dt / 500);
      const c = palette[index];
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 2 * k;
      this.ctx.shadowOffsetY = 2 * q;
      this.ctx.fillStyle = c;
      this.ctx.strokeStyle = c;
    };

    class Connections {
      #map = new Map();

      clear() {
        this.#map.clear();
      }

      add(a, b) {
        this.get(a).add(b);
        this.get(b).add(a);
      }

      get(a) {
        if (!this.#map.has(a)) {
          this.#map.set(a, new Set());
        }
        return this.#map.get(a);
      }
    }

    const connections = new Connections();
    let group = 0;

    const updateState = () => {
      group = 0;
      connections.clear();
      for (const n of nodes) {
        n.group = -1;
      }
      for (const s of segments) {
        s.group = -1;
        connections.add(s.node1, s.node2);
      }
      for (const n of nodes) {
        if (n.group === -1) {
          explore(n);
          group++;
        }
      }
    };

    const explore = (node) => {
      node.group = group;
      for (const c of connections.get(node)) {
        if (c.group === -1) {
          explore(c);
        }
      }
    };

    const draw = (dt) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      updateState();
      for (const s of segments) {
        setTheme(s.node1.group, dt);
        drawLine(s.node1, s.node2, dt);
      }
      for (const n of nodes) {
        setTheme(n.group, dt);
        drawPoint(n, dt);
      }
      if (this.isConnected) {
        requestAnimationFrame(draw);
      }
    };

    requestAnimationFrame(draw);
  }

  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }
}

class Node {
  connections = [];
  group = 0;
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  group = 0;
  node1 = undefined;
  node2 = undefined;

  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

customElements.define(
  "wavebeem-disjoint-graph-union",
  WavebeemDisjointGraphUnion
);
