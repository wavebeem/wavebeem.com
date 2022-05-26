const html = String.raw;

function preloadImage(src) {
  document.createElement("img").src = src;
}

export class HTMLSecretNekoElement extends HTMLElement {
  _nekoX = 64;
  _nekoY = 64;
  _nekoSpeed = 1;
  _nekoSize = 48;
  _closeEnough = 1;
  _nekoState = "sleep";
  _mouseX = 0;
  _mouseY = 0;
  _idleSince = performance.now();
  _sleepTimeout = 4000;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html`
      <style>
        .neko {
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(var(--neko-x), var(--neko-y));
          z-index: 999;
          image-rendering: pixelated;
        }
      </style>
      <img
        alt=""
        width="${this._nekoSize}"
        height="${this._nekoSize}"
        class="neko"
      />
    `;
    preloadImage("/static/img/neko/neko-sit.gif");
    preloadImage("/static/img/neko/neko-sleep.gif");
    preloadImage("/static/img/neko/neko-run.gif");
  }

  connectedCallback() {
    addEventListener("mousemove", this._onMouseMove);
    this._render(0);
  }

  disconnectedCallback() {
    removeEventListener("mousemove", this._onMouseMove);
  }

  get _idleTime() {
    return performance.now() - this._idleSince;
  }

  get _nekoElement() {
    return this.shadowRoot.querySelector(".neko");
  }

  _render(dt) {
    this._tick(dt);
    const { style } = this._nekoElement;
    const x = Math.floor(this._nekoX - this._nekoSize / 2);
    const y = Math.floor(this._nekoY - this._nekoSize / 2);
    style.setProperty("--neko-x", `${x}px`);
    style.setProperty("--neko-y", `${y}px`);
    const src = `/static/img/neko/neko-${this._nekoState}.gif`;
    const url1 = new URL(this._nekoElement.src, location.href);
    const url2 = new URL(src, location.href);
    if (url1.pathname !== url2.pathname) {
      this._nekoElement.src = src;
    }
    if (this.isConnected) {
      const t1 = performance.now();
      requestAnimationFrame((t2) => this._render(t2 - t1));
    }
  }

  _tick(dt) {
    if (dt === 0) {
      return;
    }
    // Ignore if sleeping
    if (this._nekoState === "sleep") {
      return;
    }
    // Sleep if sitting too long
    if (this._nekoState === "sit") {
      if (this._idleTime > this._sleepTimeout) {
        this._nekoState = "sleep";
      }
      return;
    }
    const dx = this._mouseX - this._nekoX;
    const dy = this._mouseY - this._nekoY;
    const direction = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const travel = Math.min(distance, this._nekoSpeed * (dt / 16));
    const travelX = travel * Math.cos(direction);
    const travelY = travel * Math.sin(direction);
    // Close enough to sit by the cursor
    if (distance <= this._nekoSize * this._closeEnough) {
      this._idleSince = performance.now();
      this._nekoState = "sit";
      return;
    }
    // Run toward the cursor
    this._nekoX += travelX;
    this._nekoY += travelY;
  }

  _onMouseMove = (event) => {
    this._nekoState = "run";
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
  };
}

customElements.define("secret-neko", HTMLSecretNekoElement);
