# Isa de Burgh Year Section Specification

## Overview
- Target file: `src/main.tsx`
- CSS target: `src/index.css`
- Interaction model: desktop scroll-driven pinned horizontal track; mobile horizontal auto-loop in source, approximated as readable single-column unless explicitly requested.
- Source artifacts: `docs/research/isadeburgh.html`, `docs/research/isadeburgh-style.css`, `docs/research/isadeburgh-script.js`.

## DOM Structure
- `.list-of-year-wrapper`
  - `.list-of-year`
    - `.list`
      - `h2` year
      - `h3` title
      - `img` square media
      - `p` editorial description
  - second repeated `.list-of-year` with duplicate cards for seamless continuation.

## Computed / Source Styles

### Global Section
- body background: `#fffefc`
- body color: `#000`
- global font: `FoundersGroteskCondensedMedium`
- editorial paragraph font: `EditorialNewUltraLight`

### `.list-of-year`
- display: `flex`
- margin-top: `160px`
- padding-bottom: `16px`

### `.list-of-year h2`
- color: `#000`
- font-family: `FoundersGroteskCondensedMedium`
- font-size: `64px`
- font-weight: `500`
- line-height: `90%`
- height: `44px`
- letter-spacing: `-1.28px`
- text-transform: `uppercase`

### `.list-of-year h3`
- color: `#000`
- font-family: `FoundersGroteskCondensedMedium`
- font-size: `32px`
- margin-top: `8px`
- margin-bottom: `16px`
- font-weight: `500`
- line-height: `80%`
- letter-spacing: `-0.64px`
- text-transform: `uppercase`

### `.list-of-year p`
- color: `#000`
- font-family: `EditorialNewUltraLight`
- margin-top: `16px`
- font-size: `16px`
- font-weight: `200`
- line-height: `110%`
- letter-spacing: `-0.32px`

### `.list-of-year-wrapper`
- display: `flex`
- flex-wrap: `nowrap`

### `.list`
- margin-right: `16px`

### `.list img`
- max-width: `301px`
- min-width: `301px`
- width: `100%`
- aspect-ratio: `1 / 1`
- object-fit: `cover`

## States & Behaviors

### Desktop Horizontal Pin
- Trigger: `.list-of-year-wrapper`
- Start: `bottom bottom`
- End: `+= first .list-of-year offsetWidth`
- Pin: `true`
- Scrub: `0.3`
- Transform: first and duplicate tracks translate horizontally together.

### Mobile Source Behavior
- Breakpoint: `max-width: 767px`
- Behavior: duplicate children for seamless loop, auto-scroll at `80px/s`, pause/drag/resume on pointer or touch.

## Assets
- `public/isadeburgh/year-assets/year_banner_1.webp` 941 x 941
- `public/isadeburgh/year-assets/year_banner_2.webp` 944 x 941
- `public/isadeburgh/year-assets/mockups-for-portfolio.gif` 400 x 400
- `public/isadeburgh/year-assets/year_banner_4.webp` 941 x 941
- `public/isadeburgh/year-assets/earthbar-computer.gif` 400 x 400
- `public/isadeburgh/year-assets/year_banner_6.webp` 941 x 941
- `public/isadeburgh/fonts/FoundersGroteskCondensed/FoundersGroteskCondensed-Medium.otf`
- `public/isadeburgh/fonts/EditorialNew/EditorialNew-Ultralight.otf`

## Text Content
- 2024 / Currently / Today, I lead creative at Magic Mind, shaping everything from product launches to visual identity and digital storytelling as the brand scales globally.
- 2023 / MAGIC MIND HITS RETAIL / Brought Magic Mind from digital shelves to retail stores nationwide, bridging consumer storytelling with brand strategy and cohesive in-store experiences.
- 2023 / DE SOI TRES ROSE LAUNCH / Partnered on De Soi’s Tres Rosé launch campaign, blending elevated visuals and sensory storytelling to capture the balance of celebration and calm.
- 2022 / SIDEDISH LAUNCH / Led creative direction for SideDish’s digital launch, defining its visual world and content system to connect brand flavor, community, and lifestyle.
- 2021 / EARTHBAR REBRAND / Redefined Earthbar’s brand system with a minimalist refresh-modernizing the visual language while preserving its health-focused heritage.
- 2020 / MAGIC MIND LAUNCH / Helped launch the world’s first mental performance shot, crafting the creative foundation and voice that continue to define Magic Mind today.

## Responsive Behavior
- Desktop source: image width `301px`, h2 `64px`, h3 `32px`, paragraph `16px`.
- Large desktop source uses vw equivalents: image `15.677vw`, h2 `3.333vw`, h3 `1.667vw`, paragraph `0.833vw`.
- Tablet source (`max-width: 1024px`): image `23.047vw`, h2 `40px`, h3 `16px`.
- Mobile source: image `47.074vw`, list margin-right `8px`.
