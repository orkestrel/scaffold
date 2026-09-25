// Writes the last assistant message of a subagent transcript (all its text blocks, joined) to a file under a header line.
// Successor of retain-report.js, which takes one text block above a length and fails when the final message is split.
// Usage: node retain-last.js <jsonl> <out> <header>
const fs = require('fs');
const [file, out, header] = process.argv.slice(2);
let last;
for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
	let o; try { o = JSON.parse(line); } catch { continue; }
	if (o.type !== 'assistant' || !o.message || !Array.isArray(o.message.content)) continue;
	const texts = o.message.content.filter((b) => b.type === 'text').map((b) => b.text);
	if (texts.length > 0) last = texts.join('\n\n');
}
if (last === undefined) { console.error('no assistant text found'); process.exit(2); }
fs.writeFileSync(out, `${header}\n\n${last.replace(/\r\n/g, '\n')}\n`);
console.log('wrote', out, last.length);
