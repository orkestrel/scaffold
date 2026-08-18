#!/usr/bin/env bash
# Mirror the Google developer documentation style guide to text files.
set -u
OUT="/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/gstyle"
mkdir -p "$OUT/html" "$OUT/text"
BASE="https://developers.google.com"
curl -sS "$BASE/style" -o "$OUT/html/index.html"
# Collect every /style/... link from the index (nav carries the full ToC).
grep -oE 'href="(/style/[a-z0-9-]+)"' "$OUT/html/index.html" | sed -E 's/href="|"//g' | sort -u > "$OUT/pages.txt"
echo "/style" >> "$OUT/pages.txt"
sort -u "$OUT/pages.txt" -o "$OUT/pages.txt"
COUNT=0
while read -r page; do
	slug=$(echo "$page" | sed -E 's|^/style/?||; s|^$|index|')
	[ -s "$OUT/html/$slug.html" ] || curl -sS "$BASE$page" -o "$OUT/html/$slug.html"
	COUNT=$((COUNT+1))
done < "$OUT/pages.txt"
echo "fetched $COUNT pages"
python3 - "$OUT" <<'EOF'
import html.parser, pathlib, sys, re
out = pathlib.Path(sys.argv[1])
class Text(html.parser.HTMLParser):
	def __init__(self):
		super().__init__()
		self.parts, self.skip, self.inbody = [], 0, False
	def handle_starttag(self, tag, attrs):
		if tag in ('script', 'style', 'nav', 'header', 'footer', 'devsite-header', 'devsite-book-nav', 'devsite-toc'):
			self.skip += 1
		if tag in ('p', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'pre', 'br'):
			self.parts.append('\n')
	def handle_endtag(self, tag):
		if tag in ('script', 'style', 'nav', 'header', 'footer', 'devsite-header', 'devsite-book-nav', 'devsite-toc') and self.skip:
			self.skip -= 1
	def handle_data(self, data):
		if not self.skip:
			self.parts.append(data)
for f in sorted((out / 'html').glob('*.html')):
	p = Text()
	p.feed(f.read_text(errors='replace'))
	text = re.sub(r'\n{3,}', '\n\n', ''.join(p.parts))
	(out / 'text' / (f.stem + '.txt')).write_text(text)
print('text pass done:', len(list((out / 'text').glob('*.txt'))), 'files')
EOF
du -sh "$OUT/text"
