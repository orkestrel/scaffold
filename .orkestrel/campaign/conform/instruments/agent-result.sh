#!/usr/bin/env bash
# Extract a background agent's final text (its last assistant message's text blocks) from its JSONL
# transcript into a Markdown file. Usage: bash tmp/work/agent-result.sh <transcript.jsonl> <dest.md>
set -u
SRC=${1:?transcript}
DEST=${2:?dest}
node -e '
const fs = require("node:fs");
const lines = fs.readFileSync(process.argv[1], "utf8").split("\n").filter(Boolean);
let last = "";
for (const line of lines) {
	let ev; try { ev = JSON.parse(line) } catch { continue }
	if (ev.type !== "assistant" || !ev.message || !Array.isArray(ev.message.content)) continue;
	const text = ev.message.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
	if (text.trim().length > 0) last = text;
}
fs.writeFileSync(process.argv[2], last + "\n");
console.log(process.argv[2] + " " + last.length + " chars");
' "$SRC" "$DEST"
