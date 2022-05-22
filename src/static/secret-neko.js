const html = String.raw;

class HTMLSecretNekoElement extends HTMLElement {
  _nekoX = 64;
  _nekoY = 64;
  _nekoSpeed = 5;
  _nekoState = "sleep";
  _mouseX = 0;
  _mouseY = 0;
  _idleSince = performance.now();
  _tickInterval = undefined;
  _tickRate = (5 / 60) * 1000;
  _sleepTimeout = 2000;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html`
      <style>
        .neko {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(var(--neko-x), var(--neko-y));
          z-index: 999;
          background: black;
          outline: 2px solid gold;
        }
      </style>
      <img alt="" width="16" height="16" class="neko" />
    `;
  }

  connectedCallback() {
    addEventListener("mousemove", this._onMouseMove);
    this._tickInterval = setInterval(this._tick, this._tickRate);
    this._render();
  }

  disconnectedCallback() {
    removeEventListener("mousemove", this._onMouseMove);
    clearInterval(this._tickInterval);
  }

  get _idleTime() {
    return performance.now() - this._idleSince;
  }

  get _neko() {
    return this.shadowRoot.querySelector(".neko");
  }

  _render = () => {
    const { style } = this._neko;
    style.setProperty("--neko-x", this._nekoX + "px");
    style.setProperty("--neko-y", this._nekoY + "px");
    const src = `/static/neko-${this._nekoState}.png`;
    this._neko.alt = this._nekoState;
    const url1 = new URL(this._neko.src, location.href);
    const url2 = new URL(src, location.href);
    if (url1.pathname !== url2.pathname) {
      // this._neko.src = src;
    }
    if (this.isConnected) {
      requestAnimationFrame(this._render);
    }
  };

  _tick = () => {
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
    // Close enough to sit by the cursor
    if (Math.abs(dx) < this._nekoSpeed && Math.abs(dy) < this._nekoSpeed) {
      this._idleSince = performance.now();
      this._nekoState = "sit";
      return;
    }
    // Run toward the cursor
    const direction = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), this._nekoSpeed);
    const travelX = distance * Math.cos(direction);
    const travelY = distance * Math.sin(direction);
    this._nekoX += travelX;
    this._nekoY += travelY;
  };

  _onMouseMove = (event) => {
    this._nekoState = "run";
    this._mouseX = event.clientX;
    this._mouseY = event.clientY;
  };
}

customElements.define("secret-neko", HTMLSecretNekoElement);

export {};
