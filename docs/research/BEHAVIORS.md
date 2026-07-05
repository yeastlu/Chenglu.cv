# Isa de Burgh Year Section Behaviors

## Scope
- Target URL: https://isadeburgh.com/
- Requested scope: copy the year / list-of-year section only.
- Source artifacts: `docs/research/isadeburgh.html`, `docs/research/isadeburgh-style.css`, `docs/research/isadeburgh-script.js`.

## Interaction Model
- Desktop: scroll-driven horizontal track with pinned wrapper.
- Source script: `ScrollTrigger.matchMedia("(min-width: 768px)")`, `trigger: ".list-of-year-wrapper"`, `start: "bottom bottom"`, `end: "+=" + document.querySelector(".list-of-year").offsetWidth`, `pin: true`, `scrub: 0.3`, `anticipatePin: 1`.
- Mobile: auto-scrolling horizontal loop. Source script checks `(max-width: 767px)`, duplicates the track children, and advances `x` at `speed = 80` pixels per second with touch / pointer drag support.

## Visual Behavior
- Track contains two repeated `.list-of-year` groups for seamless horizontal continuation.
- Each card is flat, unframed, and uses no border radius or shadow.
- Images are square and object-fit cover, except the Earthbar GIF in the first group is object-fit contain inline.
- Overall section background is `#fffefc`, foreground is black.

## Browser Extraction Notes
- Browser navigation to the live URL repeatedly exceeded the automation timeout, so values were extracted from downloaded live HTML, CSS, and JS. The site source and assets were downloaded successfully on July 4, 2026.
