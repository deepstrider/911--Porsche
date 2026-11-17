# Porsche 911 Carrera — The Four Acts Cinematic Video-Scrubbing Interactive Experience

An ultra-luxury, high-performance web experience featuring a multi-act, frame-by-frame video scrubbing system built with pure HTML5 video, GSAP ScrollTrigger, and custom lerp-seeking physics.

> **CRITICAL ARCHITECTURAL DIRECTIVE:** The entire scroll experience is driven 100% by the user's authentic supplied video files. No animated still photos, AI image animations, GIFs, slideshows, or CSS image transformations are used.

---

## 🎬 Supplied Video Footage Integration (The Four Acts)

The website integrates all four supplied video clips located in `d:\Websites\VIdeos`, optimized with faststart metadata headers and organized within the project's public video directory:

| Act | Video Asset | Source Clip | Narrative Focus | Duration |
| :--- | :--- | :--- | :--- | :--- |
| **Act I** | `porsche-studio-carrera.mp4` | `Porsche_911_Carrera_in_studio_b90a9f61.mp4` | **Studio Carrera Reveal:** Timeless flyline silhouette, aerodynamic proportions, muscular rear haunches, and continuous 3D rear LED lightstrip. | 7.93s |
| **Act II** | `porsche-macro-details.mp4` | `Porsche_911_macro_shot_3c87d873.mp4` | **Precision Macro Craftsmanship:** Stuttgart heraldic crest, 84-point Matrix LED headlights, active cooling air flaps, and 350mm brake architecture. | 7.93s |
| **Act III** | `porsche-interior-cockpit.mp4` | `Camera_panning_Porsche_interior_…_1b57fc17.mp4` | **Advanced Cockpit Architecture:** GT multifunction sport wheel with drive mode selector, central analog tachometer, dual 7" TFT displays, and 8-speed PDK toggle. | 7.93s |
| **Act IV** | `porsche-mountain-drive.mp4` | `Porsche_911_driving_mountain_road_a2c06618.mp4` | **Alpine Mountain Highway Dynamics:** 3.0L twin-turbo boxer flat-six unleashed, PASM active damping through hairpin switchbacks, top speed performance. | 7.93s |

---

## 🌟 Key Features

1. **Native HTML5 Multi-Video Frame Scrubbing**:
   - Pinned video stage (`600vh` scroll height) providing micro-controllable frame resolution across all 4 acts.
   - Bidirectional scrub: scrolling down advances the video frame-by-frame; scrolling up reverses smoothly.
   - Hardware-accelerated crossfading between acts with pre-priming of adjacent video clips for zero-latency transitions.
   - Throttled seeking mechanism utilizing browser `fastSeek` when available, falling back to `video.currentTime`.
   - Autoplay mode ("AUTO PLAY") allows hands-free real-time cinematic playback with synchronized auto-scrolling.

2. **Cockpit Telemetry HUD**:
   - Live Act timecode display (`00:04.12 / 00:07.93`) and frame counter (`FRAME #124 / 238`).
   - Dynamic digital speedometer & tachometer gauge with animated SVG RPM needle arc reflecting scroll speed and engine acceleration.
   - Automatic 8-speed Porsche Doppelkupplung (PDK) gear selection based on velocity (`D1` through `D7`).
   - Active Porsche Active Aerodynamics (PAA) level badge and drive mode indicator.

3. **12 Synchronized Chapter Overlays (3 per Act)**:
   - Synchronized narrative headlines, technical descriptions, and telemetry metrics (horsepower, 0-60 mph, top speed, drag coefficient, tire dimensions).

4. **Web Audio Flat-Six Boxer Synthesizer & Interactive Rev Pedal**:
   - Synthesizes realistic 6-cylinder engine roar using Web Audio API oscillators and biquad resonant filters.
   - Audio pitch and turbo spool whine dynamically modulate with scroll velocity and RPM.
   - Interactive rev pedal in the Sound Lab section: click & hold the throttle or use `SPACEBAR` to rev the engine to 7,500 RPM with real-time audio and animated circular dial gauge.

5. **Director's Cut / Cinema Theater Player**:
   - Dedicated full-speed cinema player allowing the user to replay each individual supplied clip with native controls, clip switching, and technical details.

6. **Interactive Exterior Color Customizer (Paint to Sample)**:
   - Gentian Blue Metallic (Default)
   - Guards Red
   - GT Silver Metallic
   - Racing Yellow
   - Jet Black Metallic
   - Crayon Chalk

7. **Production HTTP Server with HTTP 206 Partial Content (Byte-Range Requests)**:
   - `server.ps1` utilizing `.NET` `HttpListener` to serve video chunks with `Accept-Ranges: bytes` and `Content-Range`, allowing instant zero-latency seeks in any browser.

---

## 🚀 Quick Start Guide

### 1. Launch the Server
In PowerShell, run:
```powershell
cd "C:\Users\Legend\.gemini\antigravity\scratch\porsche-911-experience"
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```

### 2. Open in Browser
Open your browser to:
[http://127.0.0.1:8080](http://127.0.0.1:8080)
