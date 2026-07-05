# Bymonolog Success Stories Adaptation

Source references:
- Attached HTML: `works_home_wrap u-theme-light` / `SUCCESS STORIES`
- Attached CSS: Webflow shared CSS for bymonolog.com

## Adaptation Goal
- Apply the reference section's portfolio-list rhythm, media hover motion, staggered reveal, and dotted separators to the local `EXPERTISE` module.
- Keep local content, local media, and existing project links.
- Do not keep the reference site's light colors. Use the same dark background and warm text palette as the local Story section: black page background, `#101010` content panel, `#E1E0CC` headings, and warm muted body text.

## Final Item Structure
1. Sequence number: `01`, `02`, `03`...
2. Media cover: 16:9 crop using `object-fit: cover`
3. Title
4. Subtitle
5. Description
6. `ROLE` label without background
7. Role text

## Interaction
- Each item fades/slides upward on first viewport entry via Framer Motion.
- Media starts slightly enlarged and eases to natural scale on hover.
- Hover overlay fades in with a subtle blur/sepia treatment, matching the reference behavior without copying its color palette.
