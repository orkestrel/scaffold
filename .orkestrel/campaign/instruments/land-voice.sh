#!/bin/bash
# Land one accepted TSDoc voice unit: the authoritative gate chain, evidence capture, commit, push. No pack.
# Usage: land-voice.sh <pkg>   (reads /home/user/work/reports/voice-<pkg>.json for the commit message counts)
set -u
pkg=$1
R=/home/user/work/reports/voice-$pkg.json
MSG=/home/user/work/msg-voice-$pkg.txt
node - "$R" "$MSG" <<'JS'
const [, , reportPath, msgPath] = process.argv
const { readFileSync, writeFileSync } = require('node:fs')
const r = JSON.parse(readFileSync(reportPath, 'utf8')).report
const k = r.rewritten
writeFileSync(msgPath, `Migrate the TSDoc voice to the third person\n\nEvery doc block under src opens with a third-person verb sentence and every boolean returns reads True if, false otherwise, per typescript.md Comments and API documentation. Rewritten: ${k.imperative} imperative first sentences, ${k.verbless} first sentences given a verb, ${k.name} reworded to drop the symbol name, ${k.returns} boolean returns.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Cb3GKyBNeLz88N7b4LPGYW\n`)
JS
cd /home/user/work && UNIT=voice-$pkg PACK=0 UNITS_DIR=/home/user/scaffold/tmp/units/voice RETAIN_DIR=/home/user/scaffold/.orkestrel/campaign/voice/units node land-fixup.mjs "$pkg:$MSG"
