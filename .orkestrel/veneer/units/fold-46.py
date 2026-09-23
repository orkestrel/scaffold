#!/usr/bin/env python3
"""Fold 46: mark the F0 ROADMAP, F8d IMPORTANCE-LONGHANDS, and T3 TEST-PUBLISH rows landed.

The F0 plan of record landed as `4a58ee2` (2026-09-22); F8d landed as `19a3d6f` (the F8 row already
records it, so this fold moves that clause to the F8d row); T3 published `@orkestrel/test` `0.0.20`
(the lockfile resolves `node_modules/@orkestrel/test` to `0.0.20`; F9 re-pinned it as `a162c91`).
Each replacement matches once or the fold refuses.
"""
import pathlib, sys

path = pathlib.Path('/home/user/veneer/ROADMAP.md')
text = path.read_text()

edits = [
    (
        '| F0 ROADMAP               | `opus` on Opus 5.5; scaffold bridge by `builder` on Sonnet',
        '| F0 ROADMAP               | landed: `opus` on Opus 5.5 wrote the plan of record (`4a58ee2`); the scaffold bridge by `builder` on Sonnet',
    ),
    (
        '| F8d IMPORTANCE-LONGHANDS | `opus` on Opus 5 after F8c (the service proof drives Chromium, which the bench sandbox denies); audited by `analyst` on Astra and `reviewer` on Opus 5',
        '| F8d IMPORTANCE-LONGHANDS | landed as `19a3d6f`: two rounds on `opus` on Opus 5 after F8c (the service proof drives Chromium, which the bench sandbox denies) and the prose and guard round on `builder`, each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`',
    ),
    (
        '; F8d IMPORTANCE-LONGHANDS landed as `19a3d6f` (two rounds on `opus` on Opus 5 and the prose and guard round on `builder`, each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`)',
        '',
    ),
    (
        '| T3 TEST-PUBLISH          | user, one-time code; `verifier` on Sonnet reads the release gates first',
        '| T3 TEST-PUBLISH          | landed: the user\'s one-time code; `verifier` on Sonnet read the release gates first; the registry serves `0.0.20` from 2026-09-22 and F9 re-pinned it',
    ),
]
for old, new in edits:
    count = text.count(old)
    if count != 1:
        sys.exit(f'fold 46 refused: {count} matches for {old[:60]!r}')
    text = text.replace(old, new)
path.write_text(text)
print('fold 46 applied')
