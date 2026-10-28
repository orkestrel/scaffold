---
name: orkestrel-publish
description: Run an Orkestrel release from layer order to registry confirmation, or adopt a published scaffold release in one consumer. Use when the user asks to publish a package, to run a fleet-wide release wave, to recover a release that stalled at the npm approval, or to adopt a published scaffold release in one repository, and follow it for the per-repository visit, the bump ruling, the layer preparation, the login approval, the upload approval, and the adoption.
---

# Load the canonical workflow

Read `.agents/skills/orkestrel-publish/SKILL.md` completely, then read every reference it
requires. Follow that canonical workflow before acting.

This bridge contains no independent process. `AGENTS.md`, applicable rules, the canonical
skill, and the governing guide/spec remain authoritative in that order.
