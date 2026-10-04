The probe found **163 distinct color literal spellings**, representing **143 normalized color-plus-alpha values**, across **616 occurrences**:

- Custom properties: **495**
- Component literals: **93**
- Utilities: **3**
- SVG data URIs: **25**

All **163** have derivable Sass color origins. **144** have a Tailwind match within ΔE **0.05**; **101** have a same-family match within that distance, among **143** with a derivable family.

Selector-mode counts are **101 light**, **66 dark**, and **449 both**. The source inventory covers **58 files**, including **56 Sass files**, with **616 color occurrences**.

**62 scale rows match**, under the documented normalization and 16px-root assumption:

- Body font size, weight, and line height.
- Border radii: base, sm, lg, xl, xxl, and 2xl.
- Heading weights and line heights; resting h4–h6 sizes.
- Display weights and line heights; resting display-2 and display-5 sizes.
- Lead size and weight; resting fs-4–fs-6 sizes.
- Numeric `.fw-*` weights and all four `.lh-*` values.
- The md breakpoint, spacer entries 0–5, small button/input vertical padding, and transition duration.

Outputs:

- [inventory.json](/home/user/veneer/tmp/probes/tokens/inventory.json)
- [tailwind-theme.json](/home/user/veneer/tmp/probes/tokens/tailwind-theme.json)
- [nearest.json](/home/user/veneer/tmp/probes/tokens/nearest.json)
- [scales.json](/home/user/veneer/tmp/probes/tokens/scales.json)
- [report.md](/home/user/veneer/tmp/probes/tokens/report.md)

Bootstrap **5.3.8** and Tailwind **4.3.3** were measured. Both executions exited **0**; all four JSON comparisons passed `cmp`. Tint, shade, and conversion assertions passed. No tracked file was changed by this probe.

No runtime errors occurred. Tailwind ring defaults remain uncomputed: neither supplied CSS file declares them; `utilities.css` contains only `@tailwind utilities;`.