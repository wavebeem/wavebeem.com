// @ts-check
const html = String.raw;

export class WavebeemDisjointGraphUnion extends HTMLElement {
  /** @type {AbortController} */
  #abortController;

  #connections = new Connections();

  #group = 0;

  /** @type {Node[]} */
  #nodes = [];

  /** @type {Segment[]} */
  segments = [];

  /** @type {CanvasRenderingContext2D} */
  #ctx;

  #pointRadius = 10;

  /** @type {HTMLCanvasElement} */
  #canvas;

  /** @type {HTMLButtonElement} */
  #reset;

  constructor() {
    super();
    let shadow = this.shadowRoot;
    if (!shadow) {
      shadow = this.attachShadow({ mode: "open" });
    }
    // There needs to be a better way to adopt stylesheets from the parent, wtf
    shadow.innerHTML = html`
      <style>
        :host {
          position: relative;
          display: flex;
          flex-flow: column;
          align-items: flex-start;
          background: white;
          border-radius: 8px;
          max-width: max-content;
        }

        #game {
          max-width: 100%;
        }

        #reset {
          position: absolute;
          bottom: 0;
          right: 0;
          margin: 0.5rem;
          background: #333;
          color: #fff;
          font: inherit;
          font-size: 12px;
          font-weight: bold;
          border: 0;
          padding: 0.25rem 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 9999px;
          border: 2px solid #fff;

          &:hover {
            border-color: transparent;
          }

          &:focus-visible {
            outline: 2px solid #333;
            outline-offset: 2px;
          }
        }
      </style>
      <canvas id="game" width="400" height="400"></canvas>
      <button id="reset">Reset</button>
    `;
  }

  connectedCallback() {
    this.#canvas = /** @type {HTMLCanvasElement} */ (this.#$("#game"));
    this.#reset = /** @type {HTMLButtonElement} */ (this.#$("#reset"));
    this.#ctx =
      this.#canvas.getContext("2d") || this.#kaboom("no canvas context");
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    this.#reset.addEventListener("click", this.#resetGraph, { signal });
    this.#canvas.addEventListener("pointermove", this.#onPointerStuff, {
      signal,
    });
    this.#canvas.addEventListener("pointerdown", this.#onPointerStuff, {
      signal,
    });
    this.#resetGraph();
    this.#ctx.shadowColor = "rgb(0 0 0 / 20%)";
    this.#connections = new Connections();
    this.#group = 0;
    requestAnimationFrame(this.#draw);
  }

  disconnectedCallback() {
    this.#abortController.abort();
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
    }
  }

  #resetGraph = () => {
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
      [3, 4],

      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],

      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
    ];
    this.#nodes = [];
    this.segments = [];
    for (const [x, y] of xy) {
      this.#nodes.push(new Node(x, y));
    }
    for (const [i, j] of ij) {
      this.segments.push(new Segment(this.#nodes[i], this.#nodes[j]));
    }
  };

  /**
   * @param {Node} p1
   * @param {Node} p2
   */
  #drawLine = (p1, p2) => {
    this.#ctx.lineWidth = 4;
    this.#ctx.beginPath();
    this.#ctx.moveTo(p1.x, p1.y);
    this.#ctx.lineTo(p2.x, p2.y);
    this.#ctx.stroke();
  };

  /**
   * @param {Node} p1
   */
  #drawPoint = (p1) => {
    const TWO_PI = 2 * Math.PI;
    this.#ctx.beginPath();
    this.#ctx.arc(p1.x, p1.y, p1.size * this.#pointRadius, 0, TWO_PI);
    this.#ctx.fill();
  };

  /**
   * @param {number} index
   */
  #setTheme = (index) => {
    const step = 360 / 6;
    const c = `oklch(70% 70% ${index * step})`;
    this.#ctx.shadowBlur = 0;
    this.#ctx.shadowOffsetX = 2;
    this.#ctx.shadowOffsetY = 2;
    this.#ctx.fillStyle = c;
    this.#ctx.strokeStyle = c;
  };

  #updateState = () => {
    this.#group = 0;
    this.#connections.clear();
    for (const n of this.#nodes) {
      n.group = -1;
    }
    for (const s of this.segments) {
      s.group = -1;
      this.#connections.add(s.node1, s.node2);
    }
    for (const n of this.#nodes) {
      if (n.group === -1) {
        this.#explore(n);
        this.#group++;
      }
    }
  };

  /**
   * @param {Node} node
   */
  #explore = (node) => {
    node.group = this.#group;
    for (const c of this.#connections.get(node)) {
      if (c.group === -1) {
        this.#explore(c);
      }
    }
  };

  /**
   * @param {PointerEvent} event
   */
  #onPointerStuff = (event) => {
    // Scale mouse coordinates from DOM to canvas size
    const x = (event.offsetX / this.#canvas.clientWidth) * this.#canvas.width;
    const y = (event.offsetY / this.#canvas.clientHeight) * this.#canvas.height;
    let removeNode;
    for (const n of this.#nodes) {
      if (distance(n.x, n.y, x, y) < this.#pointRadius) {
        if (event.type === "pointerdown") {
          removeNode = n;
        }
        n.size = 1.2;
      } else {
        n.size = 1;
      }
    }
    if (removeNode) {
      this.#nodes = this.#nodes.filter((n) => n !== removeNode);
      this.segments = this.segments.filter(
        (s) => !(s.node1 === removeNode || s.node2 === removeNode)
      );
    }
  };

  #draw = () => {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#updateState();
    for (const s of this.segments) {
      this.#setTheme(s.node1.group);
      this.#drawLine(s.node1, s.node2);
    }
    for (const n of this.#nodes) {
      this.#setTheme(n.group);
      this.#drawPoint(n);
    }
    this.#abortController.signal.throwIfAborted();
    if (this.isConnected) {
      requestAnimationFrame(this.#draw);
    }
  };

  /**
   * @param {string} selector
   */
  #$(selector) {
    return (
      this.shadowRoot?.querySelector(selector) ||
      this.#kaboom("couldn't find " + selector)
    );
  }

  /** @returns {never} */
  #kaboom(message) {
    throw new Error(message);
  }
}

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

class Node {
  /** @type {Segment[]} */
  connections = [];
  group = 0;
  x = 0;
  y = 0;
  size = 1;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  group = 0;

  /**
   * @param {Node} node1
   * @param {Node} node2
   */
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

customElements.define(
  "wavebeem-disjoint-graph-union",
  WavebeemDisjointGraphUnion
);
