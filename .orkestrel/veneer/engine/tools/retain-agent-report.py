# Retains a native subagent's final report from its task output (2026-09-25). The output file is the agent's JSONL
# transcript; the report is the text of its last assistant message. Usage: python retain-agent-report.py <output-file>
# <report-path> <title-line>. The report is written under the title line, verbatim.
import json
import sys
from pathlib import Path

source = Path(sys.argv[1])
target = Path(sys.argv[2])
title = sys.argv[3]
last = None
for line in source.read_text(encoding='utf-8').splitlines():
    try:
        event = json.loads(line)
    except ValueError:
        continue
    message = event.get('message') if isinstance(event, dict) else None
    if not isinstance(message, dict) or message.get('role') != 'assistant':
        continue
    content = message.get('content')
    if isinstance(content, str):
        texts = [content]
    elif isinstance(content, list):
        texts = [part.get('text', '') for part in content if isinstance(part, dict) and part.get('type') == 'text']
    else:
        texts = []
    text = '\n'.join(texts).strip()
    if text:
        last = text
if last is None:
    raise SystemExit('no assistant text found')
target.write_text(title + '\n\n' + last + '\n', encoding='utf-8')
print(target.name, len(last))
