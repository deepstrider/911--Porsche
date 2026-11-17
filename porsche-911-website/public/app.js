/**
 * PORSCHE 911 CARRERA — THE FOUR ACTS CINEMATIC VIDEO-SCRUBBING ENGINE
 * Pure HTML5 Video + GSAP ScrollTrigger + Custom Frame-Accurate Lerp Physics
 * 100% Driven by User-Supplied Video Files
 */

(function () {
  'use strict';

  // =========================================================================
  // Act Video Configuration & Metadata
  // =========================================================================
  const acts = [
    {
      id: "act-1",
      title: "ACT 01 // STUDIO FLYLINE",
      elementId: "videoAct1",
      src: "assets/videos/porsche-studio-carrera.mp4",
      duration: 7.93,
      range: [0.0, 0.25],
      fps: 30
    },
    {
      id: "act-2",
      title: "ACT 02 // MACRO CRAFTSMANSHIP",
      elementId: "videoAct2",
      src: "assets/videos/porsche-macro-details.mp4",
      duration: 7.93,
      range: [0.25, 0.50],
      fps: 30
    },
    {
      id: "act-3",
      title: "ACT 03 // COCKPIT ARCHITECTURE",
      elementId: "videoAct3",
      src: "assets/videos/porsche-interior-cockpit.mp4",
      duration: 7.93,
      range: [0.50, 0.75],
      fps: 30
    },
    {
      id: "act-4",
      title: "ACT 04 // MOUNTAIN DYNAMICS",
      elementId: "videoAct4",
      src: "assets/videos/porsche-mountain-drive.mp4",
      duration: 7.93,
      range: [0.75, 1.00],
      fps: 30
    }
  ];

  // Total continuous master duration
  const totalMasterDuration = acts.reduce((sum, a) => sum + a.duration, 0);

  // 12 Synchronized Chapter Narrative Segments (3 per Act)
  const chapters = [
    // ACT 1: Studio Reveal (0.00 - 0.25)
    {
      actIndex: 0,
      range: [0.00, 0.083],
      actLabel: "ACT 01 OF 04",
      actName: "ACT 01 // STUDIO",
      chapterNumber: "CHAPTER 01 / 12",
      title: "TIMELESS FLYLINE & STUDIO REVEAL",
      desc: "An unmistakable silhouette sculpted over six decades: iconic teardrop roofline, flared rear arches, and low-slung athletic stance emerge under studio light.",
      aero: "AERO: LEVEL 1 (LOW DRAG)",
      gear: "D2",
      driveMode: "SPORT CHRONO",
      chassisMode: "PASM -10MM",
      baseSpeed: 42,
      metrics: [
        { key: "TWIN-TURBO 3.0L", val: "379 HP" },
        { key: "0-60 MPH", val: "4.0s" },
        { key: "TOP SPEED", val: "182 MPH" }
      ]
    },
    {
      actIndex: 0,
      range: [0.083, 0.166],
      actLabel: "ACT 01 OF 04",
      actName: "ACT 01 // STUDIO",
      chapterNumber: "CHAPTER 02 / 12",
      title: "SCULPTED HAUNCHES & AERO PROFILE",
      desc: "Continuous shoulder line and recessed flush electric door handles guide airflow with aerodynamic finesse, yielding an extraordinary drag coefficient of 0.29 Cd.",
      aero: "AERO: LEVEL 1",
      gear: "D3",
      driveMode: "SPORT CHRONO",
      chassisMode: "PASM SPORT",
      baseSpeed: 58,
      metrics: [
        { key: "DRAG COEFFICIENT", val: "0.29 Cd" },
        { key: "REAR TRACK", val: "1,556 MM" },
        { key: "WHEELBASE", val: "2,450 MM" }
      ]
    },
    {
      actIndex: 0,
      range: [0.166, 0.25],
      actLabel: "ACT 01 OF 04",
      actName: "ACT 01 // STUDIO",
      chapterNumber: "CHAPTER 03 / 12",
      title: "CONTINUOUS 3D REAR LIGHTSTRIP",
      desc: "Seamless three-dimensional LED lightband spanning the entire rear fascia, anchored by the iconic high-gloss silver Porsche typography and variable spoiler.",
      aero: "AERO: ADAPTIVE CRUISE",
      gear: "D4",
      driveMode: "SPORT CHRONO",
      chassisMode: "PASM ACTIVE",
      baseSpeed: 72,
      metrics: [
        { key: "LIGHTING", val: "3D LED BAND" },
        { key: "EXHAUST", val: "DUAL SPORT" },
        { key: "BODY", val: "ALU-STEEL" }
      ]
    },

    // ACT 2: Macro Details (0.25 - 0.50)
    {
      actIndex: 1,
      range: [0.25, 0.333],
      actLabel: "ACT 02 OF 04",
      actName: "ACT 02 // MACRO",
      chapterNumber: "CHAPTER 04 / 12",
      title: "THE HERALDIC STUTTGART CREST",
      desc: "Hand-applied vitreous enamel and 24-karat gold plating. The prancing horse of Stuttgart and the antlers of Württemberg represent racing bloodlines since 1952.",
      aero: "AERO: ACTIVE FLAPS",
      gear: "D4",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM -10MM",
      baseSpeed: 80,
      metrics: [
        { key: "ORIGIN", val: "STUTTGART" },
        { key: "CRAFT", val: "HAND ENAMEL" },
        { key: "HERITAGE", val: "SINCE 1952" }
      ]
    },
    {
      actIndex: 1,
      range: [0.333, 0.416],
      actLabel: "ACT 02 OF 04",
      actName: "ACT 02 // MACRO",
      chapterNumber: "CHAPTER 05 / 12",
      title: "84-POINT MATRIX LED INTELLIGENCE",
      desc: "Four-point daytime running light signature with 84 individually controlled LEDs per headlight for instantaneous intelligent road illumination and active cornering.",
      aero: "AERO: HIGH SPEED",
      gear: "D5",
      driveMode: "SPORT PLUS",
      chassisMode: "PDCC ACTIVE",
      baseSpeed: 95,
      metrics: [
        { key: "MATRIX LEDS", val: "84 / LAMP" },
        { key: "COLOR TEMP", val: "6,000 K" },
        { key: "RESPONSE", val: "<10 MS" }
      ]
    },
    {
      actIndex: 1,
      range: [0.416, 0.50],
      actLabel: "ACT 02 OF 04",
      actName: "ACT 02 // MACRO",
      chapterNumber: "CHAPTER 06 / 12",
      title: "KINETIC AIR CURTAINS & 350MM BRAKES",
      desc: "Internally vented and perforated 350 mm brake rotors paired with four-piston aluminum monobloc fixed calipers for fade-resistant decelerative supremacy.",
      aero: "AERO: DOWNFORCE 1",
      gear: "D5",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM SPORT",
      baseSpeed: 108,
      metrics: [
        { key: "ROTOR DIAMETER", val: "350 MM" },
        { key: "FRONT TIRES", val: "245/35 R20" },
        { key: "REAR TIRES", val: "305/30 R21" }
      ]
    },

    // ACT 3: Cockpit Architecture (0.50 - 0.75)
    {
      actIndex: 2,
      range: [0.50, 0.583],
      actLabel: "ACT 03 OF 04",
      actName: "ACT 03 // COCKPIT",
      chapterNumber: "CHAPTER 07 / 12",
      title: "GT MULTIFUNCTION SPORT STEERING WHEEL",
      desc: "Directly derived from the 918 Spyder hypercar: ergonomic thumb indentations, alloy gearshift paddles, and rotary drive mode selector switch.",
      aero: "AERO: TRACK STABILIZED",
      gear: "D6",
      driveMode: "INDIVIDUAL",
      chassisMode: "PASM DYNAMIC",
      baseSpeed: 115,
      metrics: [
        { key: "WHEEL DIAMETER", val: "360 MM" },
        { key: "DRIVE MODES", val: "5 SELECTABLE" },
        { key: "SPORT RESPONSE", val: "20 SEC BOOST" }
      ]
    },
    {
      actIndex: 2,
      range: [0.583, 0.666],
      actLabel: "ACT 03 OF 04",
      actName: "ACT 03 // COCKPIT",
      chapterNumber: "CHAPTER 08 / 12",
      title: "CENTRAL ANALOG TACHOMETER & DUAL TFTS",
      desc: "Classic five-dial cluster architecture reimagined: high-resolution twin 7-inch displays frame the physical rev counter needle pointing to a 7,500 RPM redline.",
      aero: "AERO: TRACK STABILIZED",
      gear: "D6",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM SPORT",
      baseSpeed: 128,
      metrics: [
        { key: "REDLINE", val: "7,500 RPM" },
        { key: "DISPLAYS", val: "DUAL 7-INCH" },
        { key: "PCM SCREEN", val: "10.9-INCH HD" }
      ]
    },
    {
      actIndex: 2,
      range: [0.666, 0.75],
      actLabel: "ACT 03 OF 04",
      actName: "ACT 03 // COCKPIT",
      chapterNumber: "CHAPTER 09 / 12",
      title: "8-SPEED PDK COMPACT TOGGLE SELECTOR",
      desc: "Minimalist center console architecture featuring tactile aluminum switches, electronic park brake, and lightning-fast dual-clutch transmission engagement.",
      aero: "AERO: HIGH DOWNFORCE",
      gear: "D7",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM -10MM",
      baseSpeed: 140,
      metrics: [
        { key: "TRANSMISSION", val: "8-SPEED PDK" },
        { key: "SHIFT SPEED", val: "100 MS" },
        { key: "AUDIO", val: "BURMESTER® 3D" }
      ]
    },

    // ACT 4: Mountain Dynamics (0.75 - 1.00)
    {
      actIndex: 3,
      range: [0.75, 0.833],
      actLabel: "ACT 04 OF 04",
      actName: "ACT 04 // DYNAMICS",
      chapterNumber: "CHAPTER 10 / 12",
      title: "TWIN-TURBO FLAT-SIX UNLEASHED",
      desc: "Rear-mounted 3.0-liter boxer powerplant spools its twin turbochargers, delivering 331 lb-ft of torque starting at 1,950 RPM with instant throttle response.",
      aero: "AERO: SPOILER 14°",
      gear: "D6",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM MAXIMUM",
      baseSpeed: 148,
      metrics: [
        { key: "TORQUE", val: "331 LB-FT" },
        { key: "PEAK TORQUE", val: "1,950-5,000" },
        { key: "BOOST", val: "16.0 PSI" }
      ]
    },
    {
      actIndex: 3,
      range: [0.833, 0.916],
      actLabel: "ACT 04 OF 04",
      actName: "ACT 04 // DYNAMICS",
      chapterNumber: "CHAPTER 11 / 12",
      title: "ALPINE SWITCHBACKS & LATERAL G",
      desc: "Carving through alpine hairpins with Porsche Torque Vectoring Plus (PTV+) and active rear-axle steering, generating up to 1.08 G of lateral cornering force.",
      aero: "AERO: MAXIMUM DOWNFORCE",
      gear: "D5",
      driveMode: "SPORT PLUS",
      chassisMode: "PDCC STABILIZED",
      baseSpeed: 162,
      metrics: [
        { key: "LATERAL G", val: "1.08 G" },
        { key: "STEERING", val: "REAR-AXLE" },
        { key: "DOWNFORCE", val: "110 KG" }
      ]
    },
    {
      actIndex: 3,
      range: [0.916, 1.00],
      actLabel: "ACT 04 OF 04",
      actName: "ACT 04 // DYNAMICS",
      chapterNumber: "CHAPTER 12 / 12",
      title: "THE OPEN HORIZON // PURE NIRVANA",
      desc: "Sport exhaust valves open wide as the 911 charges toward its 182 MPH top track speed. Sixty years of relentless perfection distilled into a single machine.",
      aero: "AERO: FULL DEPLOYMENT",
      gear: "D7",
      driveMode: "SPORT PLUS",
      chassisMode: "PASM TRACK",
      baseSpeed: 175,
      metrics: [
        { key: "TOP TRACK SPEED", val: "182 MPH" },
        { key: "DRIVE WHEELS", val: "REAR-WHEEL" },
        { key: "STATUS", val: "LEGENDARY" }
      ]
    }
  ];

  // Trim Specifications Matrix
  const trimData = {
    carrera: {
      zeroToSixty: "4.0 s",
      hp: "379 hp",
      topSpeed: "182 mph",
      torque: "331 lb-ft"
    },
    carreraS: {
      zeroToSixty: "3.5 s",
      hp: "443 hp",
      topSpeed: "191 mph",
      torque: "390 lb-ft"
    },
    carreraGTS: {
      zeroToSixty: "3.2 s",
      hp: "473 hp",
      topSpeed: "193 mph",
      torque: "420 lb-ft"
    },
    gt3: {
      zeroToSixty: "3.0 s",
      hp: "502 hp",
      topSpeed: "197 mph",
      torque: "346 lb-ft"
    }
  };

  // =========================================================================
  // DOM Elements
  // =========================================================================
  const scrollWrapper = document.getElementById('scrollWrapper');
  const loaderOverlay = document.getElementById('videoLoader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderStatus = document.getElementById('loaderStatus');
  const scrollCue = document.getElementById('scrollCue');
  const actTransitionFlash = document.getElementById('actTransitionFlash');

  // Video Elements
  const videoElements = [
    document.getElementById('videoAct1'),
    document.getElementById('videoAct2'),
    document.getElementById('videoAct3'),
    document.getElementById('videoAct4')
  ];

  // Nav Telemetry
  const navActLabel = document.getElementById('navActLabel');
  const navPhaseName = document.getElementById('navPhaseName');
  const navTimecode = document.getElementById('navTimecode');

  // HUD Elements
  const hudDriveMode = document.getElementById('hudDriveMode');
  const hudChassisMode = document.getElementById('hudChassisMode');
  const hudAeroBadge = document.getElementById('hudAeroBadge');
  const hudMotionState = document.getElementById('hudMotionState');
  const hudGear = document.getElementById('hudGear');
  const hudSpeed = document.getElementById('hudSpeed');
  const hudRpm = document.getElementById('hudRpm');
  const rpmArc = document.getElementById('rpmArc');

  const hudCurrentActBadge = document.getElementById('hudCurrentActBadge');
  const hudChapterNumber = document.getElementById('hudChapterNumber');
  const hudChapterTitle = document.getElementById('hudChapterTitle');
  const hudChapterDesc = document.getElementById('hudChapterDesc');
  const hudMetricsRow = document.getElementById('hudMetricsRow');

  const hudActName = document.getElementById('hudActName');
  const hudCurrentTime = document.getElementById('hudCurrentTime');
  const hudTotalTime = document.getElementById('hudTotalTime');
  const hudFrameReadout = document.getElementById('hudFrameReadout');

  // Scrubber Elements
  const scrubberContainer = document.getElementById('scrubberContainer');
  const scrubProgressFill = document.getElementById('scrubProgressFill');
  const scrubberThumb = document.getElementById('scrubberThumb');
  const jumpButtons = document.querySelectorAll('.nav-jump-btn');
  const playCinematicBtn = document.getElementById('playCinematicBtn');

  // Audio & Color Elements
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');
  const colorTriggerBtn = document.getElementById('colorTriggerBtn');
  const colorPaletteMenu = document.getElementById('colorPaletteMenu');
  const activeSwatch = document.getElementById('activeSwatch');
  const colorOptions = document.querySelectorAll('.color-option');

  // Theater Elements
  const theaterVideo = document.getElementById('theaterVideo');
  const theaterVideoSource = document.getElementById('theaterVideoSource');
  const theaterBadgeTag = document.getElementById('theaterBadgeTag');
  const clipSelectorCards = document.querySelectorAll('.clip-selector-card');

  // Specs Tabs
  const trimTabs = document.querySelectorAll('.trim-tab');
  const spec0to60 = document.getElementById('spec0to60');
  const specHp = document.getElementById('specHp');
  const specTopSpeed = document.getElementById('specTopSpeed');
  const specTorque = document.getElementById('specTorque');

  // Sound Lab & Rev Pedal
  const throttlePedalBtn = document.getElementById('throttlePedalBtn');
  const pedalRpmText = document.getElementById('pedalRpmText');
  const pedalGearText = document.getElementById('pedalGearText');
  const pedalDialArc = document.getElementById('pedalDialArc');
  const soundHeroRevBtn = document.getElementById('soundHeroRevBtn');

  // Footer / Replay
  const restartExperienceBtn = document.getElementById('restartExperienceBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // =========================================================================
  // Engine State
  // =========================================================================
  const state = {
    progress: 0,
    targetProgress: 0,
    currentMasterTime: 0,
    targetMasterTime: 0,
    activeActIndex: 0,
    lastScrollY: window.scrollY,
    scrollVelocity: 0,
    isDraggingScrubber: false,
    isAutoplaying: false,
    autoplaySpeed: 0.0006, // comfortable cinematic scroll velocity
    audioEnabled: false,
    currentRPM: 1200,
    targetRPM: 1200,
    currentSpeed: 0,
    targetSpeed: 0,
    videosLoaded: 0,
    totalVideos: acts.length,
    pedalPressed: false,
    pedalRPM: 1200
  };

  // =========================================================================
  // Video Initialization & Metadata Preloading
  // =========================================================================
  function initVideos() {
    loaderStatus.textContent = "VERIFYING 4 SUPPLIED VIDEO FEEDS...";
    loaderBar.style.width = "25%";

    videoElements.forEach((vid, idx) => {
      vid.pause();
      vid.playbackRate = 0;

      vid.addEventListener('loadedmetadata', () => {
        if (vid.duration && !isNaN(vid.duration) && vid.duration > 0) {
          acts[idx].duration = vid.duration;
        }
        state.videosLoaded++;
        const pct = Math.round((state.videosLoaded / state.totalVideos) * 100);
        loaderBar.style.width = `${pct}%`;
        loaderStatus.textContent = `SYNCED ACT 0${idx + 1} (${acts[idx].duration.toFixed(1)}s)`;

        if (state.videosLoaded >= state.totalVideos) {
          onAllVideosReady();
        }
      });

      // In case metadata is already cached in memory
      if (vid.readyState >= 1) {
        state.videosLoaded++;
        if (state.videosLoaded >= state.totalVideos) {
          onAllVideosReady();
        }
      }

      vid.load();
    });

    // Safety timeout in case some events fired before listener attachment
    setTimeout(() => {
      if (loaderOverlay && !loaderOverlay.classList.contains('hidden')) {
        onAllVideosReady();
      }
    }, 2000);
  }

  function onAllVideosReady() {
    loaderBar.style.width = "100%";
    loaderStatus.textContent = "ALL 4 ACTS READY • COMMENCING CHRONO SCRUB ENGINE";
    setTimeout(() => {
      loaderOverlay.classList.add('hidden');
    }, 450);

    // Initial seek to 0
    seekActVideo(0, 0);
    updateUI(0);
  }

  // =========================================================================
  // Video Seeking Engine (Fast & Hardware Accelerated)
  // =========================================================================
  function seekActVideo(actIndex, time) {
    const vid = videoElements[actIndex];
    if (!vid) return;

    const maxDur = acts[actIndex].duration || 7.93;
    const clampedTime = Math.max(0, Math.min(maxDur - 0.01, time));

    // High performance seek
    if ('fastSeek' in vid) {
      vid.fastSeek(clampedTime);
    } else {
      vid.currentTime = clampedTime;
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centis = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  }

  // =========================================================================
  // Web Audio Flat-Six Boxer Synthesizer
  // =========================================================================
  let audioCtx = null;
  let boxerOsc1 = null;
  let boxerOsc2 = null;
  let turboOsc = null;
  let masterGain = null;
  let engineFilter = null;

  function initAudioEngine() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

      // Lowpass resonant filter for boxer exhaust thrum
      engineFilter = audioCtx.createBiquadFilter();
      engineFilter.type = 'lowpass';
      engineFilter.frequency.setValueAtTime(700, audioCtx.currentTime);
      engineFilter.Q.setValueAtTime(3.5, audioCtx.currentTime);

      // Fundamental boxer-6 oscillation (Sawtooth)
      boxerOsc1 = audioCtx.createOscillator();
      boxerOsc1.type = 'sawtooth';
      boxerOsc1.frequency.setValueAtTime(40, audioCtx.currentTime);

      // Harmonic oscillation (Triangle)
      boxerOsc2 = audioCtx.createOscillator();
      boxerOsc2.type = 'triangle';
      boxerOsc2.frequency.setValueAtTime(80, audioCtx.currentTime);

      // Turbo spool whistle (Sine)
      turboOsc = audioCtx.createOscillator();
      turboOsc.type = 'sine';
      turboOsc.frequency.setValueAtTime(350, audioCtx.currentTime);

      const turboGain = audioCtx.createGain();
      turboGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

      // Connect graph
      boxerOsc1.connect(engineFilter);
      boxerOsc2.connect(engineFilter);
      turboOsc.connect(turboGain);
      turboGain.connect(masterGain);

      engineFilter.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      boxerOsc1.start();
      boxerOsc2.start();
      turboOsc.start();
    } catch (e) {
      console.warn("Web Audio not supported:", e);
    }
  }

  function updateAudioFrequencies(rpm, velocity) {
    if (!audioCtx || !state.audioEnabled) return;

    const baseFreq = 30 + (rpm / 7500) * 115;
    const filterFreq = 350 + (rpm / 7500) * 2200;
    const turboFreq = 600 + (rpm / 7500) * 3800;
    const volume = Math.min(0.28, 0.08 + Math.abs(velocity) * 0.0035);

    const now = audioCtx.currentTime;
    boxerOsc1.frequency.setTargetAtTime(baseFreq, now, 0.08);
    boxerOsc2.frequency.setTargetAtTime(baseFreq * 2, now, 0.08);
    turboOsc.frequency.setTargetAtTime(turboFreq, now, 0.12);
    engineFilter.frequency.setTargetAtTime(filterFreq, now, 0.08);
    masterGain.gain.setTargetAtTime(volume, now, 0.05);
  }

  function setAudioMute(muted) {
    state.audioEnabled = !muted;
    if (state.audioEnabled) {
      if (!audioCtx) initAudioEngine();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (masterGain && audioCtx) {
        masterGain.gain.setTargetAtTime(0.12, audioCtx.currentTime, 0.1);
      }
      soundToggleBtn.classList.add('sound-active');
      soundLabel.textContent = "SOUND ON";
    } else {
      if (masterGain && audioCtx) {
        masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.1);
      }
      soundToggleBtn.classList.remove('sound-active');
      soundLabel.textContent = "SOUND OFF";
    }
  }

  // =========================================================================
  // Continuous Scrubbing Render Loop
  // =========================================================================
  let lastTimestamp = performance.now();

  function renderLoop(now) {
    const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;

    // Handle Autoplay mode if active
    if (state.isAutoplaying) {
      state.targetProgress += state.autoplaySpeed;
      if (state.targetProgress >= 1.0) {
        state.targetProgress = 1.0;
        toggleAutoplay(false);
      }
      // Smoothly scroll window to match
      const scrollHeight = scrollWrapper.offsetHeight - window.innerHeight;
      const targetScrollY = scrollWrapper.offsetTop + state.targetProgress * scrollHeight;
      window.scrollTo(0, targetScrollY);
    } else if (!state.isDraggingScrubber) {
      // Calculate Scroll Progress from window scroll position
      const scrollY = window.scrollY;
      const wrapperTop = scrollWrapper.offsetTop;
      const scrollHeight = scrollWrapper.offsetHeight - window.innerHeight;

      let p = 0;
      if (scrollHeight > 0) {
        p = (scrollY - wrapperTop) / scrollHeight;
      }
      p = Math.max(0, Math.min(1, p));
      state.targetProgress = p;

      // Scroll velocity & Direction
      const deltaScroll = scrollY - state.lastScrollY;
      state.scrollVelocity = deltaScroll;
      state.lastScrollY = scrollY;

      // Scroll Cue visibility
      if (scrollY > 50) {
        scrollCue.classList.add('faded');
      } else {
        scrollCue.classList.remove('faded');
      }

      // HUD Motion State Indicator
      if (deltaScroll > 1) {
        hudMotionState.innerHTML = '<span class="motion-arrow">↓</span> ADVANCING CHRONO TIMELINE';
        hudMotionState.style.color = '#00ff88';
      } else if (deltaScroll < -1) {
        hudMotionState.innerHTML = '<span class="motion-arrow" style="transform: rotate(180deg)">↑</span> REVERSING FRAME SEQUENCE';
        hudMotionState.style.color = 'var(--accent-glow)';
      } else {
        hudMotionState.innerHTML = '<span>•</span> TIMELINE PAUSED';
        hudMotionState.style.color = 'var(--text-muted)';
      }
    }

    // Lerp progress for ultra-smooth responsiveness
    const lerpFactor = state.isDraggingScrubber ? 0.35 : 0.24;
    state.progress += (state.targetProgress - state.progress) * lerpFactor;

    // Determine Active Act and calculate sub-progress within that Act
    let actIndex = 0;
    if (state.progress < 0.25) actIndex = 0;
    else if (state.progress < 0.50) actIndex = 1;
    else if (state.progress < 0.75) actIndex = 2;
    else actIndex = 3;

    const currentAct = acts[actIndex];
    const actStart = currentAct.range[0];
    const actEnd = currentAct.range[1];
    const actRatio = Math.max(0, Math.min(1, (state.progress - actStart) / (actEnd - actStart)));

    const actTargetTime = actRatio * currentAct.duration;

    // Handle Act Video Switch / Crossfade
    if (actIndex !== state.activeActIndex) {
      switchActiveAct(actIndex);
    }

    // Seek the active video
    const activeVid = videoElements[actIndex];
    if (activeVid && (!activeVid.seeking || Math.abs(activeVid.currentTime - actTargetTime) > 0.05)) {
      seekActVideo(actIndex, actTargetTime);
    }

    // Pre-prime adjacent video when close to boundary to eliminate any frame lag
    primeAdjacentVideos(actIndex, actRatio);

    // Update Telemetry & Gauges
    updateTelemetry(dt, actRatio);

    // Update UI Elements
    updateUI(actTargetTime, actIndex, actRatio);

    requestAnimationFrame(renderLoop);
  }

  // Pre-primes next or previous video
  function primeAdjacentVideos(actIndex, actRatio) {
    if (actRatio > 0.88 && actIndex < acts.length - 1) {
      // Pre-seek next video to 0.0
      const nextVid = videoElements[actIndex + 1];
      if (nextVid && Math.abs(nextVid.currentTime) > 0.1) {
        seekActVideo(actIndex + 1, 0.0);
      }
    } else if (actRatio < 0.12 && actIndex > 0) {
      // Pre-seek previous video to its end
      const prevVid = videoElements[actIndex - 1];
      const prevDur = acts[actIndex - 1].duration;
      if (prevVid && Math.abs(prevVid.currentTime - prevDur) > 0.1) {
        seekActVideo(actIndex - 1, prevDur);
      }
    }
  }

  // Switches the active video element with smooth crossfade
  function switchActiveAct(newIndex) {
    const oldIndex = state.activeActIndex;
    state.activeActIndex = newIndex;

    // Subtle shutter flash
    actTransitionFlash.classList.add('flash');
    setTimeout(() => {
      actTransitionFlash.classList.remove('flash');
    }, 280);

    videoElements.forEach((vid, i) => {
      if (i === newIndex) {
        vid.classList.add('active');
        vid.classList.remove('transitioning');
      } else if (i === oldIndex) {
        vid.classList.remove('active');
        vid.classList.add('transitioning');
        setTimeout(() => {
          vid.classList.remove('transitioning');
        }, 450);
      } else {
        vid.classList.remove('active', 'transitioning');
      }
    });

    // Update Jump Button Highlights
    jumpButtons.forEach((btn, idx) => {
      if (idx === newIndex) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  // =========================================================================
  // Telemetry & Dynamic Calculations
  // =========================================================================
  function updateTelemetry(dt, actRatio) {
    const currentChapter = getCurrentChapter(state.progress);

    // Dynamically calculate RPM based on scroll velocity and current chapter
    const velMagnitude = Math.min(Math.abs(state.scrollVelocity) * 35, 3200);
    const baseRpmForChapter = 1800 + state.progress * 4800;

    if (!state.pedalPressed) {
      state.targetRPM = baseRpmForChapter + velMagnitude;
      state.currentRPM += (state.targetRPM - state.currentRPM) * 0.14;
    } else {
      state.currentRPM += (state.pedalRPM - state.currentRPM) * 0.2;
    }

    // Dynamic Speed
    const targetSpeed = currentChapter.baseSpeed + (velMagnitude / 3200) * 30;
    state.currentSpeed += (targetSpeed - state.currentSpeed) * 0.1;

    // Update Top Right Gauges
    hudSpeed.textContent = Math.round(state.currentSpeed);
    hudRpm.textContent = Math.round(state.currentRPM).toLocaleString();

    const rpmRatio = Math.max(0, Math.min(1, (state.currentRPM - 1000) / 7000));
    const strokeOffset = 126 - (rpmRatio * 126);
    rpmArc.style.strokeDashoffset = strokeOffset;

    hudGear.textContent = currentChapter.gear;
    hudAeroBadge.textContent = currentChapter.aero;
    hudDriveMode.textContent = currentChapter.driveMode;
    hudChassisMode.textContent = currentChapter.chassisMode;

    // Audio Pitch Modulation
    updateAudioFrequencies(state.currentRPM, state.scrollVelocity);
  }

  function getCurrentChapter(progress) {
    for (let i = 0; i < chapters.length; i++) {
      if (progress >= chapters[i].range[0] && progress <= chapters[i].range[1]) {
        return chapters[i];
      }
    }
    return chapters[chapters.length - 1];
  }

  // =========================================================================
  // UI Synchronization with Video Timecode
  // =========================================================================
  function updateUI(actTime, actIndex, actRatio) {
    const act = acts[actIndex];
    const formattedActTime = formatTime(actTime);
    const currentFrame = Math.min(Math.round(act.duration * act.fps), Math.max(1, Math.round((actTime / act.duration) * Math.round(act.duration * act.fps))));
    const totalFrames = Math.round(act.duration * act.fps);

    // Nav Pill
    navActLabel.textContent = `ACT 0${actIndex + 1}`;
    navPhaseName.textContent = act.title.replace(`ACT 0${actIndex + 1} // `, '');
    navTimecode.textContent = formattedActTime;

    // Bottom Right Scrubber Readout
    hudActName.textContent = act.title;
    hudCurrentTime.textContent = formattedActTime;
    hudTotalTime.textContent = formatTime(act.duration);
    hudFrameReadout.textContent = `FRAME #${String(currentFrame).padStart(3, '0')} / ${totalFrames}`;

    // Master Scrubber Track Progress
    const masterPercent = Math.max(0, Math.min(100, state.progress * 100));
    scrubProgressFill.style.width = `${masterPercent}%`;
    scrubberThumb.style.left = `${masterPercent}%`;

    // Dynamic Chapter Narrative Card
    const ch = getCurrentChapter(state.progress);
    if (ch.title !== hudChapterTitle.textContent) {
      hudCurrentActBadge.textContent = ch.actLabel;
      hudChapterNumber.textContent = ch.chapterNumber;
      hudChapterTitle.textContent = ch.title;
      hudChapterDesc.textContent = ch.desc;

      hudMetricsRow.innerHTML = ch.metrics.map(m => `
        <div class="metric-item">
          <span class="metric-val">${m.val}</span>
          <span class="metric-key">${m.key}</span>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // Scrubber Dragging & Direct Interaction
  // =========================================================================
  function setupScrubberEvents() {
    function handleScrubberPointer(e) {
      const rect = scrubberContainer.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (!clientX) return;

      let clickX = clientX - rect.left;
      let ratio = clickX / rect.width;
      ratio = Math.max(0, Math.min(1, ratio));

      state.targetProgress = ratio;
      state.progress = ratio;

      // Sync window scroll position
      const scrollHeight = scrollWrapper.offsetHeight - window.innerHeight;
      const targetScrollY = scrollWrapper.offsetTop + ratio * scrollHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });

      if (state.isAutoplaying) toggleAutoplay(false);
    }

    scrubberContainer.addEventListener('mousedown', (e) => {
      state.isDraggingScrubber = true;
      handleScrubberPointer(e);

      function onMouseMove(moveEvent) {
        if (state.isDraggingScrubber) handleScrubberPointer(moveEvent);
      }

      function onMouseUp() {
        state.isDraggingScrubber = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    scrubberContainer.addEventListener('touchstart', (e) => {
      state.isDraggingScrubber = true;
      handleScrubberPointer(e);
    }, { passive: true });

    scrubberContainer.addEventListener('touchmove', (e) => {
      if (state.isDraggingScrubber) handleScrubberPointer(e);
    }, { passive: true });

    scrubberContainer.addEventListener('touchend', () => {
      state.isDraggingScrubber = false;
    });

    // Jump Buttons for the 4 Acts
    jumpButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const actIdx = parseInt(e.currentTarget.dataset.act, 10);
        const targetRatio = actIdx * 0.25 + 0.01;
        const scrollHeight = scrollWrapper.offsetHeight - window.innerHeight;
        const targetScrollY = scrollWrapper.offsetTop + targetRatio * scrollHeight;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });

        if (state.isAutoplaying) toggleAutoplay(false);
      });
    });

    // Autoplay Toggle
    playCinematicBtn.addEventListener('click', () => {
      toggleAutoplay(!state.isAutoplaying);
    });
  }

  function toggleAutoplay(play) {
    state.isAutoplaying = play;
    if (state.isAutoplaying) {
      playCinematicBtn.classList.add('active');
      playCinematicBtn.innerHTML = `
        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>PAUSE</span>
      `;
    } else {
      playCinematicBtn.classList.remove('active');
      playCinematicBtn.innerHTML = `
        <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
        <span>AUTO PLAY</span>
      `;
    }
  }

  // =========================================================================
  // Director's Cut Cinema Theater Section
  // =========================================================================
  function setupCinemaTheater() {
    clipSelectorCards.forEach((card) => {
      card.addEventListener('click', () => {
        clipSelectorCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const clipSrc = card.dataset.clip;
        const clipTitle = card.dataset.title;

        theaterVideo.pause();
        theaterVideoSource.src = clipSrc;
        theaterBadgeTag.textContent = clipTitle;
        theaterVideo.load();
        theaterVideo.play().catch(() => {});
      });
    });
  }

  // =========================================================================
  // Trim Tabs Switcher
  // =========================================================================
  function setupTrimTabs() {
    trimTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        trimTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const trim = tab.dataset.trim;
        const data = trimData[trim];
        if (!data) return;

        spec0to60.textContent = data.zeroToSixty;
        specHp.textContent = data.hp;
        specTopSpeed.textContent = data.topSpeed;
        specTorque.textContent = data.torque;
      });
    });
  }

  // =========================================================================
  // Sound Lab & Interactive Rev Pedal
  // =========================================================================
  function setupRevPedal() {
    let revInterval = null;

    function pressPedal() {
      if (state.pedalPressed) return;
      state.pedalPressed = true;
      throttlePedalBtn.classList.add('pressed');

      if (!state.audioEnabled) setAudioMute(false);

      pedalGearText.textContent = "SPORT PLUS REV";

      revInterval = setInterval(() => {
        state.pedalRPM = Math.min(7500, state.pedalRPM + 350);
        updatePedalDisplay(state.pedalRPM);
      }, 30);
    }

    function releasePedal() {
      if (!state.pedalPressed) return;
      state.pedalPressed = false;
      throttlePedalBtn.classList.remove('pressed');

      clearInterval(revInterval);

      const decayInterval = setInterval(() => {
        state.pedalRPM = Math.max(1200, state.pedalRPM - 280);
        updatePedalDisplay(state.pedalRPM);
        if (state.pedalRPM <= 1200) {
          clearInterval(decayInterval);
          pedalGearText.textContent = "NEUTRAL";
        }
      }, 30);
    }

    function updatePedalDisplay(rpm) {
      pedalRpmText.textContent = Math.round(rpm).toLocaleString();
      const ratio = Math.max(0, Math.min(1, (rpm - 1000) / 6500));
      // Arc circumference for r=85 is 534
      const strokeOffset = 534 - (ratio * 534);
      pedalDialArc.style.strokeDashoffset = strokeOffset;

      updateAudioFrequencies(rpm, 100);
    }

    // Pointer events
    throttlePedalBtn.addEventListener('mousedown', pressPedal);
    window.addEventListener('mouseup', releasePedal);

    throttlePedalBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      pressPedal();
    }, { passive: false });

    window.addEventListener('touchend', releasePedal);

    // Keyboard Spacebar Rev
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        pressPedal();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        releasePedal();
      }
    });

    if (soundHeroRevBtn) {
      soundHeroRevBtn.addEventListener('click', () => {
        pressPedal();
        setTimeout(releasePedal, 1500);
      });
    }
  }

  // =========================================================================
  // Color Customizer Dropdown
  // =========================================================================
  function setupColorSwitcher() {
    colorTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      colorPaletteMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      colorPaletteMenu.classList.remove('open');
    });

    colorOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const colorKey = opt.dataset.color;
        const colorName = opt.dataset.name;
        const colorHex = opt.dataset.hex;

        document.body.className = `theme-${colorKey}`;

        colorOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        document.querySelector('.color-name-label').textContent = colorName.toUpperCase();
        activeSwatch.style.background = colorHex;

        colorPaletteMenu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // Audio & Navigation Listeners
  // =========================================================================
  function setupAudioAndNav() {
    soundToggleBtn.addEventListener('click', () => {
      setAudioMute(state.audioEnabled);
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (restartExperienceBtn) {
      restartExperienceBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // GSAP ScrollTrigger Integration
  // =========================================================================
  function setupGSAPScrollTrigger() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: scrollWrapper,
        start: "top top",
        end: "bottom bottom",
        pin: "#videoHeroPinned",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!state.isAutoplaying && !state.isDraggingScrubber) {
            state.targetProgress = self.progress;
          }
        }
      });
    }
  }

  // =========================================================================
  // Engine Initialization
  // =========================================================================
  function init() {
    initVideos();
    setupScrubberEvents();
    setupCinemaTheater();
    setupTrimTabs();
    setupRevPedal();
    setupColorSwitcher();
    setupAudioAndNav();
    setupGSAPScrollTrigger();

    // Start 60fps / 120fps physics render loop
    requestAnimationFrame(renderLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
