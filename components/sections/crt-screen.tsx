"use client";

import { useEffect, useRef } from "react";

// Timeline (ms): dark silk veil -> liquid wave radiates from center,
// LED cells bloom in its wake -> ambient. No flashes, no lines.
const VEIL = 1500;
const WAVE = 2800;
const BLOOM = 450;
const LOGO_DONE = VEIL + WAVE + 600;
const TEXT = "tech@nyu";

type Cell = { x: number; y: number; rc: number; rnd: number; onAt: number };

export default function CrtScreen({
  onLogoDone,
}: {
  onLogoDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onLogoDoneRef = useRef(onLogoDone);
  onLogoDoneRef.current = onLogoDone;
  const skipRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let start = 0;
    let doneFired = false;

    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let cells: Cell[] = [];
    let gridCells: Cell[] = [];
    let cellSize = 10;
    let maxR = 0;
    let ledSprite: HTMLCanvasElement | null = null;
    let dimSprite: HTMLCanvasElement | null = null;
    let halo: HTMLCanvasElement | null = null;

    const hash = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const easeInOut = (p: number) =>
      p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const clamp01 = (p: number) => Math.max(0, Math.min(1, p));

    // One pre-rendered dot, blitted per cell: a small CRISP square — no
    // per-dot halo. The wordmark gets one soft breath of glow as a whole.
    const makeSprite = (dim: boolean) => {
      const s = document.createElement("canvas");
      const N = 16;
      s.width = N;
      s.height = N;
      const c = s.getContext("2d")!;
      if (dim) {
        c.fillStyle = "rgba(80,165,100,0.6)";
        c.fillRect(3, 3, 10, 10);
      } else {
        const body = c.createLinearGradient(0, 2, 0, 14);
        body.addColorStop(0, "#b8ffcd");
        body.addColorStop(0.45, "#eafff1");
        body.addColorStop(1, "#54e57e");
        c.fillStyle = body;
        c.fillRect(2, 2, 12, 12);
      }
      return s;
    };

    // Static grain tile, re-offset every frame for shimmer.
    const noiseTile = (() => {
      const n = document.createElement("canvas");
      const N = 160;
      n.width = N;
      n.height = N;
      const c = n.getContext("2d")!;
      const d = c.createImageData(N, N);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.floor(Math.random() * 255);
        d.data[i] = v;
        d.data[i + 1] = v;
        d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      c.putImageData(d, 0, 0);
      return n;
    })();

    const setup = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);

      ledSprite = makeSprite(false);
      dimSprite = makeSprite(true);
      maxR = Math.hypot(vw / 2, vh / 2) * 1.1;

      const logoW = Math.min(vw * 0.66, 1100);
      cellSize = Math.max(3, Math.round(logoW / 240));

      // Rasterize the wordmark, then quantize onto the LED grid.
      const off = document.createElement("canvas");
      off.width = vw;
      off.height = vh;
      const octx = off.getContext("2d")!;
      // The wordmark renders in Satoshi (display font), not the Inter body font
      const satoshi = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-satoshi")
        .trim();
      const family =
        satoshi || getComputedStyle(document.body).fontFamily || "sans-serif";
      let fs = 100;
      octx.font = `600 ${fs}px ${family}`;
      fs = (fs * logoW) / octx.measureText(TEXT).width;
      octx.font = `600 ${fs}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(TEXT, vw / 2, vh / 2);
      const img = octx.getImageData(0, 0, vw, vh).data;

      cells = [];
      gridCells = [];
      const half = cellSize / 2;
      const at = (x: number, y: number) =>
        img[(Math.round(y) * vw + Math.round(x)) * 4 + 3] / 255;
      for (let y = half; y < vh; y += cellSize) {
        for (let x = half; x < vw; x += cellSize) {
          if (at(x, y) > 0.45) {
            const rc = Math.hypot(x - vw / 2, y - vh / 2);
            cells.push({ x, y, rc, rnd: hash(x, y), onAt: 0 });
          }
        }
      }
      // idle grid at a coarser pitch so the fine wordmark stays the focus
      const gridPitch = cellSize * 4;
      for (let y = half; y < vh; y += gridPitch) {
        for (let x = half; x < vw; x += gridPitch) {
          if (
            at(x, y) <= 0.45 &&
            Math.abs(y - vh / 2) < fs * 1.4 &&
            hash(x + 7, y + 3) > 0.25
          ) {
            const rc = Math.hypot(x - vw / 2, y - vh / 2);
            gridCells.push({ x, y, rc, rnd: hash(x, y), onAt: 0 });
          }
        }
      }

      // one soft breath of glow hugging the wordmark as a whole
      halo = document.createElement("canvas");
      halo.width = vw;
      halo.height = vh;
      const hctx = halo.getContext("2d")!;
      hctx.filter = `blur(${Math.max(14, fs * 0.16)}px)`;
      hctx.font = octx.font;
      hctx.textAlign = "center";
      hctx.textBaseline = "middle";
      hctx.fillStyle = "rgba(110,235,140,1)";
      hctx.fillText(TEXT, vw / 2, vh / 2);
    };

    // The pre-open veil: the -22.jpg reference pulled down a register —
    // a sage-to-deep-green wash with soft blurred blooms and one dark
    // rounded shadow mass, all breathing as a single body of light.
    const drawVeil = (t: number) => {
      // the tube warming up: the whole veil swells gently from dim toward
      // the wave, with the subtlest electrical flicker
      let warm = 0.55 + 0.45 * easeInOut(clamp01(t / VEIL));
      if (Math.random() < 0.02) warm *= 0.96;
      const breathe = (1 + 0.08 * Math.sin(t * 0.0005)) * warm;
      const shift = Math.sin(t * 0.00035) * vh * 0.02;

      // vertical wash: smoky sage above sinking into deep green-black
      const wash = ctx.createLinearGradient(0, shift, 0, vh + shift);
      wash.addColorStop(0, `rgba(152,164,140,${0.3 * breathe})`);
      wash.addColorStop(0.33, `rgba(100,116,88,${0.2 * breathe})`);
      wash.addColorStop(0.68, `rgba(48,62,46,${0.16 * breathe})`);
      wash.addColorStop(1, "rgba(16,24,18,0.3)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, vw, vh);

      // the old phosphor mass, silvered: a gray breath inside the sage
      // that grows as the tube warms — keeps the b&w soul in the green
      const px = vw * 0.5 + Math.sin(t * 0.00028) * vw * 0.03;
      const phos = ctx.createRadialGradient(
        px,
        vh * 0.34,
        0,
        px,
        vh * 0.34,
        vh * 0.8 * (0.8 + 0.2 * warm)
      );
      phos.addColorStop(0, `rgba(198,202,198,${0.11 * warm})`);
      phos.addColorStop(0.6, `rgba(140,144,140,${0.04 * warm})`);
      phos.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = phos;
      ctx.fillRect(0, 0, vw, vh);

      // whisper of electricity: at most two faint hairlines drifting down
      const period = 1150;
      for (let k = 0; k < 2; k++) {
        const cycle = Math.floor((t + k * 560) / period);
        const phase = ((t + k * 560) % period) / period;
        const sy = vh * (0.12 + 0.72 * hash(cycle * 7.3 + k, 3.1));
        const a = Math.sin(Math.PI * phase) * 0.045 * warm;
        ctx.fillStyle = `rgba(212,220,210,${a})`;
        ctx.fillRect(0, sy + phase * 16, vw, 1);
      }

      // blurred light blooms along the top, like the reference's bright patches
      const bx = vw * 0.32 + Math.sin(t * 0.0002) * vw * 0.04;
      const bloom = ctx.createRadialGradient(bx, vh * 0.06, 0, bx, vh * 0.06, vh * 0.75);
      bloom.addColorStop(0, `rgba(186,196,172,${0.17 * breathe})`);
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, vw, vh);

      const b2x = vw * 0.8 + Math.cos(t * 0.00017) * vw * 0.03;
      const bloom2 = ctx.createRadialGradient(b2x, vh * 0.12, 0, b2x, vh * 0.12, vh * 0.55);
      bloom2.addColorStop(0, `rgba(172,184,158,${0.12 * breathe})`);
      bloom2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom2;
      ctx.fillRect(0, 0, vw, vh);

      // soft dark rounded shadow mass mid-left, for the reference's depth
      const sx = vw * 0.3 + Math.sin(t * 0.00024 + 2) * vw * 0.03;
      const sy = vh * 0.62 + Math.cos(t * 0.0002 + 1) * vh * 0.025;
      const shadow = ctx.createRadialGradient(sx, sy, 0, sx, sy, vh * 0.62);
      shadow.addColorStop(0, "rgba(6,10,7,0.4)");
      shadow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadow;
      ctx.fillRect(0, 0, vw, vh);

    };

    // The clear window: a soft-edged zone opening from the center that
    // wipes veil AND grain together — outside it the mist stays at full
    // strength until the edge arrives.
    const clearWindow = (R: number) => {
      if (R <= 0) return;
      const w = vh * 0.16;
      const c = ctx.createRadialGradient(
        vw / 2,
        vh / 2,
        Math.max(0, R - w),
        vw / 2,
        vh / 2,
        R + w * 0.3
      );
      c.addColorStop(0, "rgba(0,0,0,1)");
      c.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, vw, vh);
      ctx.restore();
    };

    const drawGrain = (alpha: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = alpha;
      ctx.translate(
        -Math.floor(Math.random() * 160),
        -Math.floor(Math.random() * 160)
      );
      const pattern = ctx.createPattern(noiseTile, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, vw + 160, vh + 160);
      }
      ctx.restore();
    };

    const blit = (
      sprite: HTMLCanvasElement,
      x: number,
      y: number,
      scale: number,
      alpha: number
    ) => {
      const size = cellSize * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
    };

    // Bloom with a whisper of overshoot, then settle.
    const bloomEase = (p: number) => {
      if (p >= 1) return 1;
      return p < 0.7 ? (p / 0.7) * 1.1 : 1.1 - 0.1 * ((p - 0.7) / 0.3);
    };

    const drawCells = (
      t: number,
      list: Cell[],
      sprite: HTMLCanvasElement,
      R: number,
      maxAlpha: (c: Cell) => number,
      scale: number
    ) => {
      for (const cell of list) {
        if (!cell.onAt && R >= cell.rc) cell.onAt = t;
        if (!cell.onAt) continue;
        const b = bloomEase(clamp01((t - cell.onAt) / BLOOM));
        const breathe = 0.95 + 0.05 * Math.sin(t * 0.0025 + cell.rnd * 6.28);
        blit(sprite, cell.x, cell.y, scale, maxAlpha(cell) * b * breathe);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (stopped) return;
      if (!start) start = now;
      if (skipRef.current && now - start < LOGO_DONE) {
        start = now - LOGO_DONE;
        for (const c of cells) if (!c.onAt) c.onAt = now - BLOOM;
        for (const c of gridCells) if (!c.onAt) c.onAt = now - BLOOM;
      }
      const t = now - start;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, vw, vh);

      const waveP = clamp01((t - VEIL) / WAVE);
      // hesitant start, confident finish: the middle visibly opens first
      const R = maxR * Math.pow(waveP, 2.2);

      // veil persists until the wave has fully carried it out
      if (waveP < 1) {
        drawVeil(t);
        // the wave itself: one soft luminance crest riding the window's edge
        if (waveP > 0) {
          const w = vh * 0.22;
          const crest = ctx.createRadialGradient(
            vw / 2,
            vh / 2,
            Math.max(0, R - w * 0.3),
            vw / 2,
            vh / 2,
            R + w
          );
          const a = 0.09 * Math.sin(Math.PI * waveP);
          crest.addColorStop(0, "rgba(0,0,0,0)");
          crest.addColorStop(0.4, `rgba(196,204,190,${Math.max(0, a)})`);
          crest.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = crest;
          ctx.fillRect(0, 0, vw, vh);
        }
        drawGrain(0.16);
        // the window wipes veil, crest, and grain together
        clearWindow(R);
      } else {
        drawGrain(0.18);
      }

      const globalFlicker = Math.random() < 0.01 ? 0.85 : 1;
      if (dimSprite) {
        drawCells(
          t,
          gridCells,
          dimSprite,
          R,
          (c) => (0.06 + 0.06 * c.rnd) * globalFlicker,
          1.2
        );
      }
      if (halo && waveP > 0) {
        // the wordmark's single soft breath of glow
        const a =
          waveP * (0.3 + 0.06 * Math.sin(t * 0.001)) * globalFlicker;
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = a;
        ctx.drawImage(halo, 0, 0, vw, vh);
        ctx.restore();
      }
      if (ledSprite) {
        drawCells(t, cells, ledSprite, R, () => globalFlicker, 1);
      }

      if (!doneFired && t > LOGO_DONE) {
        doneFired = true;
        onLogoDoneRef.current();
      }

      raf = requestAnimationFrame(tick);
    };

    const begin = () => {
      setup();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        skipRef.current = true;
      }
      raf = requestAnimationFrame(tick);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setup(), 150);
    };
    window.addEventListener("resize", onResize);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) begin();
    });

    return () => {
      cancelled = true;
      stopped = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full cursor-pointer"
      onClick={() => {
        skipRef.current = true;
      }}
      aria-label="tech@nyu"
      role="img"
    />
  );
}
