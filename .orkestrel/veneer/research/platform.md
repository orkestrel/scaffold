# Platform evidence for rendered token tests

These primary-source readings were checked on 2026-09-19. They establish platform semantics, not Veneer behavior.

CSS custom properties inherit by default and undergo variable substitution before inheritance. A custom property can contain a nonempty value that is invalid for the consuming property. Cycles and missing variables also affect computed-value validity. Read the consumer, not only the variable string. See [CSS Custom Properties](https://www.w3.org/TR/css-variables-1/#invalid-at-computed-value-time).

The getComputedStyle method returns resolved values for an element or pseudo-element. The resolved result follows property-specific rules; it is not uniformly the specified, computed, or used value. Record which observable the test reads. See [CSSOM resolved values](https://www.w3.org/TR/cssom-1/#resolved-values).

Typed OM exposes structured values, including unparsed values and variable references. A structured value is not a layout or paint result. See [CSS Typed OM](https://drafts.css-houdini.org/css-typed-om-1/#cssunparsedvalue).

The computedStyleMap method has limited availability and returns computed values, while getComputedStyle can return used values for layout-sensitive properties. Treat Typed OM as an optional capability, not a required cross-browser test backend. See [computedStyleMap](https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap).

Bounding rectangles and hit testing answer geometry and input-target questions that a declaration tree cannot settle. Match a geometry assertion to the relevant box, transform, clipping, and viewport context. See [CSSOM View](https://www.w3.org/TR/cssom-view-1/).

Browser style observation includes privacy limits, such as visited-link values, and pseudo-element reads need an explicit subject. Do not treat an unavailable or protected reading as a successful measurement. See [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle).

## Local browser availability

The installed Playwright module resolved its managed Chromium executable under chromium-1243, but that executable was absent. A filesystem version reading found Microsoft Edge 153.0.4234.32 at C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe. The subsequent [executed experiment](browser.md) checked token substitution and interactive reachability in that browser without modifying a product repository. It did not establish a browser support range.
