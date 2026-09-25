I'll read the brief and follow it exactly.The brief is a read-only search of Bootstrap 5.3.8 docs for every `<button` class. I'll locate that tag and collect the class attributes.## Search

The repository is `twbs/bootstrap` at tag `v5.3.8`. The pattern is every `<button` opening tag, including shortcode and example blocks, with the full `class` attribute collected from each. No checkout of that tag is on this machine, and every fetch of the tag was rejected, so none of these directories were opened: `site/src/content/docs/**/*.mdx`, `site/src/content/docs/**/*.md`, `site/src/assets/examples/**/*.astro`, `site/content/docs/5.3/**`, and `site/content/docs/5.3/examples/**`.

## Class compositions

| Class attribute | file:line | Base class |
| --- | --- | --- |
| — | — | No `<button` opening tag was read, so there is no composition, no classless `<button>`, and no classless `data-bs-target` `<button>`. |

## Sole component classes outside that base list

None were read. No utility class and no documentation-site class (`bd-*` or otherwise) was excluded, because no `<button` class attribute was read.

## Unread

- `twbs/bootstrap` tag `v5.3.8`: `site/src/content/docs/`
- `twbs/bootstrap` tag `v5.3.8`: `site/src/assets/examples/`
- `twbs/bootstrap` tag `v5.3.8`: `site/content/docs/5.3/`The filesystem search finished with an error. I'll check its output before saying what it found.The filesystem search stopped before it finished. It only turned up local project notes and skill files that mention `btn-close`. It did not find the Bootstrap `v5.3.8` documentation, so those docs remain unread.