---
name: orkestrel-scout
description: >-
  Map terrain mechanically before anyone reads it: file trees with line counts, Markdown headings, export lines, a term census, the files that name a path, and unresolved `§` cross-references, written once and handed to the lane that reads. Use before writing a brief, before a Grok absorption lane, before a rename or a sweep, when a dispatch names the `scout` role, or whenever a question is "where is", "how big is", "what names this", or "which files carry this term".
---

# Scout

A map is mechanical; reading is not. Run the map first, hand it to the reader, and let the reader spend its context on judgment.

## Scripts

| Script           | Does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/map.ts` | `--tree PATH...` files with line counts and sizes; `--headings PATH...` Markdown headings with lines; `--frontmatter PATH...` every key of a frontmatter block, a TOML file, or a YAML file with its whole value, nested keys dotted (`interface.default_prompt`); `--exports PATH...` `export` lines in TypeScript files (a text reading); `--census TERM...` every line carrying a term; `--refs PATH` every line naming a path or its basename; `--anchors PATH...` every `§ Heading` reference whose heading its target lacks. `--paths a,b` narrows a census or refs walk; `--ignore-case`; `--json`; `--out FILE` writes the map instead of printing it. Walks skip `node_modules`, `.git`, `dist`, `tmp`, `.orkestrel`, `.idea`, and `host.json`. |

## Map

1. Name the question and the roots it covers. Refuse an unbounded one.
2. Run `node .agents/skills/orkestrel-scout/scripts/map.ts` with the modes the question needs, in one call. Write the map to `tmp/units/<unit>-map.txt` (or `.json`) when a lane will read it; print it when you will.
3. For a rename or a deletion, run `--refs <path>` and `--census <name>` and own every file that comes back.
4. Before an absorption lane, put the map's path in the brief and strike from the brief every question the map already answers; the lane reads and judges, it does not enumerate.
5. Before a brief, read `--anchors` over the files the brief names; repair the references that block the brief and report the rest.

## Refuse

- A question that needs reading at depth or a judgment: route it to `grok`, `distiller`, or the reviewer the size gate names, with the map attached.
- A census over a term shorter than three characters without `--paths`.
