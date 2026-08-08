# tools

## og-template.html

Source for `public/og/og-default.png`, the social share card.

To regenerate: copy it into `public/og/`, run the dev server, screenshot
`http://localhost:5173/og/og-template.html` at exactly 1200x630, save the result
as `public/og/og-default.png`, then delete the copy from `public/` — it lives here
so it is not published and crawled.

The figures on the card are duplicated from `src/data/`. If a headline number
changes there, change it here too.
