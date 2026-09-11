# Golden Fish Loading

A lightweight, dependency-free loading screen built around the 48-frame golden fish animation.

## Project structure

```text
.
├── index.html                  # Page structure and accessible controls
├── public/
│   └── assets/konnektoren_loading_frames_square_normalized/ # Animation frames (01–48)
└── src/
    ├── app.js                   # Frame preloading, playback, and controls
    └── styles.css               # Layout, ocean background, and ambient motion
```

## Run locally

Because this is a static ES module app, serve the project from a local web server (opening `index.html` directly can block module loading):

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

The fish starts automatically using the square-normalized `konnektoren_loading_frames_square_normalized` assets, can be paused or resumed, and its frame rate can be adjusted with the speed slider. It also falls back to a still frame when the user has enabled reduced motion.
