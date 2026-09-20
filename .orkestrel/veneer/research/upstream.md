# Upstream contract readings

Readings were taken through the web tool on 2026-09-19. These establish the upstream contract, not Veneer conformance.

## Bootstrap

Bootstrap's JavaScript documentation describes public data attributes, constructor options, programmatic methods, cancelable lifecycle events, transition timing, static instance lookup, sanitization, and optional jQuery integration. It also warns about shared DOM ownership with frameworks. Use these as separate compatibility dimensions. A class-name inventory does not prove JavaScript compatibility. See [Bootstrap JavaScript](https://getbootstrap.com/docs/5.3/getting-started/javascript/).

The documentation identifies Bootstrap 5.3.8. Veneer's lockfile independently resolves that release. Compare the pinned official artifact during conformance; do not move the reference silently. No Bootstrap JavaScript may ship or execute as Veneer runtime under the user's explicit direction.

Bootstrap documents Sass configuration separately from its compiled CSS and JavaScript contracts. A compiled stylesheet replacement does not establish Sass source API compatibility. See [Bootstrap Sass](https://getbootstrap.com/docs/5.3/customize/sass/).

## Tailwind

Tailwind permits separate imports for theme, Preflight, and utilities. A consumer can omit Preflight. Prefixing individual imports requires applying the prefix to the theme and utility imports. See [Tailwind Preflight](https://tailwindcss.com/docs/preflight).

Tailwind documents prefixed class names and custom properties for avoiding collisions. It also documents important utilities and resolves conflicting utility declarations by stylesheet order, not the order of classes in HTML. A compatibility plan must distinguish collision ownership from ordinary property overrides. See [Tailwind utility conflicts](https://tailwindcss.com/docs/styling-with-utility-classes#managing-style-conflicts).

Read the supported browser and build-tool constraints before setting Veneer's public target. The documentation identifies Tailwind v4.3. The plan has no executed cross-browser reading. See [Tailwind compatibility](https://tailwindcss.com/docs/compatibility).

## Browser-range clarification

The official Tailwind compatibility page names Chrome 111, Safari 16.4, and Firefox 128 for its core functionality. It distinguishes optional platform features from that baseline and does not support running Tailwind as part of a Sass preprocessor workflow. Consume already compiled Veneer CSS in the optional Tailwind workflow. See [Tailwind compatibility](https://tailwindcss.com/docs/compatibility).

Bootstrap's browser document includes a broader Browserslist policy, including Chrome and Firefox 60 and Safari/iOS 12 entries. Veneer cannot inherit that claim while depending on newer CSS without an explicit compatibility treatment. See [Bootstrap browsers and devices](https://getbootstrap.com/docs/5.3/getting-started/browsers-devices/). These were direct primary-source readings on 2026-09-19, not executed browser proofs.

## Source and render limits

Generated showcase files exist in Elements, Mailbox, and Veneer. The UI browser inventory returned no available browsers. No screenshot or visual acceptance is claimed in this planning phase. Require a captured Elements reference and a matching Veneer specimen before accepting the visual foundation.

Root read Scaffold's style-environment limit directly in guides/scaffold.md:1954: Scaffold does not generate styles. The adopter must author the style directory, configuration, and Vitest project and prove they remain registered after repair.

Root read Elements src/styles/components/_article.scss directly. The partial gives bare article a card surface and uses article/header/footer ancestry for slot chrome. The user's stated tag-only semantic boundary rejects that composition as a Veneer default. Preserve the intended appearance through explicit component classes.
