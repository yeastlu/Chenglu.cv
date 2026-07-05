# JasonJerez Loader Animation Specification

## Overview
- **Target file:** `src/main.tsx` inline component for this Vite app.
- **Reference URL:** https://jasonjerez.com/
- **Interaction model:** time-driven loading overlay.
- **Scope:** Clone the loading effect only, not the whole page.

## DOM Structure
- Full viewport fixed overlay with id-like role `loader`.
- Inner counter container centered both axes.
- Counter text is a single percentage string, e.g. `22%`, `80%`, `96%`, `100%`.

## Computed Styles From Reference

### Loader Container
- position: fixed
- display: flex
- inset: 0
- width: 1440px at desktop viewport
- height: 900px at desktop viewport
- z-index: 999
- backgroundColor: rgb(0, 0, 0)
- overflow: visible

### Counter Text
- color: rgb(234, 234, 234)
- fontFamily: "TT Hoves"
- fontSize: 165px at 1440px viewport
- fontWeight: 400
- lineHeight: 165px
- letterSpacing: -9px
- centered in viewport

## States & Behaviors

### Counting
- Trigger: page load / mount.
- State A: black overlay visible, counter starts around 0-30% depending on load timing.
- State B: counter rapidly increments to 100% within roughly 1-1.4s.
- Implementation approach: requestAnimationFrame with eased progress.

### Exit
- Trigger: count reaches 100% plus short hold.
- State A: 100% in bright off-white.
- State B: 100% dims to grey, then overlay fades and moves out of interaction.
- Implementation approach: CSS class toggled after completion; opacity transition.

## Adaptation For Cheng Lu Site
- Keep black overlay and large percentage style.
- Use existing palette: black background, #e1e0cc text.
- Use existing heading font stack rather than downloading TT Hoves.
- Add small bottom label `CHENG LU` / `PORTFOLIO` so it feels integrated with the current portfolio.
- Respect `prefers-reduced-motion` by shortening animation.

## Responsive Behavior
- Desktop: counter font-size clamp max 165px.
- Mobile: counter font-size clamp around 72-96px, centered.
