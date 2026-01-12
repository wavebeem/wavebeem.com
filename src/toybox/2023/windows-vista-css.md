---
title: "Windows Vista in CSS"
description: "Pure CSS nostalgia."
date: "2023-10-11"
---

<div class="crime-frame border sharp">
  <div
    style="
      user-select: none;
      font-family: system-ui, sans-serif;
      background: repeating-linear-gradient(
          45deg,
          rgb(51, 102, 0) 0px,
          rgb(51, 102, 0) 60px,
          rgb(77, 153, 0) 60px,
          rgb(77, 153, 0) 120px
        )
        fixed;
      color: white;
      border-radius: 1rem;
    "
  >
    <div
      style="
        text-shadow: black 0px 0px 2px;
        backdrop-filter: blur(4px);
        background: linear-gradient(
          rgba(26, 26, 26, 0.6),
          rgba(0, 0, 0, 0.6) 50%,
          rgba(13, 13, 13, 0.6) 50%,
          rgba(0, 0, 0, 0.6)
        );
        padding: 10px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.8);
        box-shadow: rgba(255, 255, 255, 0.2) 0px -1px 0px 0px inset;
      "
    >
      Windows Vista from memory in pure CSS
    </div>
    <div
      style="
        margin: 3vmax;
        border-radius: 8px;
        box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset,
          rgba(0, 0, 0, 0.5) 0px 0px 0px 1px, black 0px 8px 16px;
        backdrop-filter: blur(4px);
        background: linear-gradient(
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.6) 100px,
          rgba(255, 255, 255, 0.3) 100px,
          rgba(255, 255, 255, 0.4)
        );
        display: flex;
        flex-direction: column;
        padding: 10px;
      "
    >
      <div
        style="
          display: flex;
          padding-bottom: 10px;
          color: rgb(0, 0, 0);
          text-shadow: white 0px 1px 2px, white 0px -1px 2px, white 1px 0px 2px,
            white -1px 0px 2px, white 0px 0px 2px, white 0px 0px 4px;
        "
      >
        <div
          style="
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 1rem;
          "
        >
          <span
            style="
              text-shadow: black 0px 0px 1px, black 0px 0px 1px,
                black 0px 0px 1px;
            "
            >📝</span
          >&nbsp;&nbsp;Notepad – C:\Users\slime\Desktop\example.txt
        </div>
        <div style="flex: 1 1 auto"></div>
        <div
          style="
            color: white;
            background: linear-gradient(
                rgba(235, 71, 71, 0.8),
                rgba(230, 26, 26, 0.8) 50%,
                rgba(184, 20, 20, 0.8) 50%,
                rgba(230, 26, 26, 0.8)
              )
              padding-box;
            font-weight: bold;
            padding: 0px 20px;
            position: relative;
            top: -10px;
            border-radius: 0px 0px 8px 8px;
            font-size: 24px;
            line-height: 1;
            border-width: 0px 1px 1px;
            border-style: none solid solid;
            border-color: currentcolor rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
            border-image: none;
            box-shadow: rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset;
            text-shadow: black 0px 1px 1px, black 0px -1px 1px,
              black 1px 0px 1px, black -1px 0px 1px;
          "
        >
          ×
        </div>
      </div>
      <div
        style="
          width: 100%;
          height: 100%;
          background: rgb(230, 230, 230);
          color: rgb(38, 38, 38);
          box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px;
          border-radius: 0.5px;
          border: 1px solid rgb(0, 0, 0);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
        "
      >
        <div
          style="
            flex-wrap: wrap;
            display: flex;
            gap: 10px;
            padding: 0px 10px;
            background: linear-gradient(
              rgb(240, 241, 245),
              rgb(209, 214, 224) 50%,
              rgb(194, 201, 214) 50%,
              rgb(179, 187, 204)
            );
            border-bottom: 1px solid rgb(102, 119, 153);
          "
        >
          <div>File</div>
          <div>Edit</div>
          <div>Options</div>
        </div>
        <div
          style="
            background: white;
            padding: 5px 10px;
            min-height: 200px;
            border-bottom: 1px solid rgb(136, 136, 136);
            flex: 1 1 auto;
          "
        >
          I love CSS! It's so powerful and fun.
        </div>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            justify-content: end;
            gap: 5px;
            padding: 5px;
          "
        >
          <div
            style="
              background: linear-gradient(
                rgb(242, 242, 242),
                rgb(230, 230, 230) 50%,
                rgb(217, 217, 217) 50%,
                rgb(204, 204, 204)
              );
              border: 1px solid rgb(0, 102, 102);
              color: rgb(41, 48, 61);
              padding: 0px 20px;
              border-radius: 4px;
              box-shadow: rgb(0, 204, 204) 0px 0px 0px 2px inset,
                rgb(0, 179, 179) 0px 0px 0px 3px inset;
            "
          >
            Save
          </div>
          <div
            style="
              background: linear-gradient(
                rgb(242, 242, 242),
                rgb(230, 230, 230) 50%,
                rgb(217, 217, 217) 50%,
                rgb(204, 204, 204)
              );
              box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset;
              border: 1px solid rgb(128, 128, 128);
              color: rgb(41, 48, 61);
              padding: 0px 20px;
              border-radius: 4px;
            "
          >
            Delete
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        text-shadow: black 0px 0px 2px;
        backdrop-filter: blur(4px);
        background: linear-gradient(
          rgba(26, 26, 26, 0.6),
          rgba(0, 0, 0, 0.6) 50%,
          rgba(13, 13, 13, 0.6) 50%,
          rgba(0, 0, 0, 0.6)
        );
        padding: 10px 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.8);
        box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset;
      "
    >
      Scroll to enjoy the blur
    </div>
  </div>
</div>
