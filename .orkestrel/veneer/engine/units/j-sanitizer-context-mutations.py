# J-SANITIZER-CONTEXT whole-file mutation instrument. Applies each named edit to ConfigSanitizer.ts
# alone, runs tests/src/browser/sanitizers/ConfigSanitizer.test.ts in the src:browser project, records
# the failed case names, restores the original bytes, and checks the restored digest before the next
# row. Run from the worktree root: python tmp/j-sanitizer-context/mutations.py
# Log: tmp/j-sanitizer-context/mutations.log.txt
import hashlib
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
SOURCE = 'src/browser/sanitizers/ConfigSanitizer.ts'
TEST = 'tests/src/browser/sanitizers/ConfigSanitizer.test.ts'
LOG = ROOT / 'tmp/j-sanitizer-context/mutations.log.txt'
NPX = 'npx.cmd' if sys.platform == 'win32' else 'npx'

# name -> (old, new, the case the row must redden, or the reason this host cannot see it)
ROWS = {
    'unsubstituted': (
        "? Document.prototype.createElement.call(inert, 'div')",
        '? Document.prototype.importNode.call(inert, element, false)',
        'not visible on Chromium 153, which reads the context element\'s encoding attribute; '
        'the Chromium 141 re-read discriminates (its b1d314d log is this row red)',
    ),
    'any-encoding': (
        "? Element.prototype.getAttributeNS.call(element, null, 'encoding')?.toLowerCase()",
        "? 'text/html'",
        'parses markup written into an annotation-xml element whose encoding attribute in no namespace '
        'names no HTML type as MathML',
    ),
    'namespace-blind': (
        "Element.prototype.getAttributeNS.call(element, null, 'encoding')",
        "Element.prototype.getAttribute.call(element, 'encoding')",
        'parses markup written into an annotation-xml element whose encoding attribute in no namespace '
        'names no HTML type as MathML (its namespaced encoding variant)',
    ),
    'trimmed': (
        "'encoding')?.toLowerCase()",
        "'encoding')?.trim().toLowerCase()",
        'parses markup written into an annotation-xml element whose encoding attribute in no namespace '
        'names no HTML type as MathML (its spaced encoding variant)',
    ),
    'case-exact': (
        "'encoding')?.toLowerCase()",
        "'encoding')",
        'not visible on Chromium 153; the Chromium 141 re-read of the TEXT/HTML encoding discriminates',
    ),
    'xhtml-dropped': (
        "encoding === 'application/xhtml+xml' ||",
        '',
        'not visible on Chromium 153; the Chromium 141 re-read of the application/xhtml+xml encoding discriminates',
    ),
    'svg-dropped': (
        "['foreignObject', 'desc', 'title'].includes(name.name)",
        '[].includes(name.name)',
        'not visible on Chromium 153, which parses an SVG context as the div does; the Chromium 141 '
        're-read discriminates only if that build mishandles an SVG context',
    ),
    'text-points-added': (
        "['foreignObject', 'desc', 'title'].includes(name.name))",
        "['foreignObject', 'desc', 'title'].includes(name.name)) || "
        "['mi', 'mo', 'mn', 'ms', 'mtext'].includes(name?.name ?? 'none')",
        'parses markup written into a MathML text integration point as HTML except an mglyph or '
        'malignmark element, which stays MathML, through the host route and the walk',
    ),
    'template-context': (
        "? Document.prototype.createElement.call(inert, 'div')",
        "? Document.prototype.createElement.call(inert, 'template')",
        'the annotation-xml HTML encoding case and the SVG foreignObject, desc, or title case '
        '(a template context keeps the table parts the allowlist then removes with their text)',
    ),
    'control-order': (
        "['foreignObject', 'desc', 'title'].includes(name.name)",
        "['title', 'desc', 'foreignObject'].includes(name.name)",
        'control: must survive',
    ),
}

FAILED = re.compile(r'^\s*[×✗]\s+(.*?)(?:\s+\d+ms)?$')


def digest(data):
    return hashlib.sha256(data).hexdigest()


target = ROOT / SOURCE
original = target.read_bytes()
summary = []
with open(LOG, 'w', encoding='utf-8') as out:
    out.write(f'original {SOURCE} sha256={digest(original)}\n')
    for name, (old, new, expectation) in ROWS.items():
        text = original.decode('utf-8')
        assert text.count(old) == 1, (name, old)
        target.write_bytes(text.replace(old, new).encode('utf-8'))
        try:
            run = subprocess.run(
                [NPX, 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache',
                 '--project', 'src:browser', '--reporter=verbose', TEST],
                cwd=ROOT, capture_output=True, encoding='utf-8', errors='replace',
            )
        finally:
            target.write_bytes(original)
        restored = digest(target.read_bytes()) == digest(original)
        lines = (run.stdout + run.stderr).splitlines()
        failed = sorted({m.group(1) for m in map(FAILED.match, lines) if m})
        tests = next((line.strip() for line in lines if line.strip().startswith('Tests ')), 'no Tests line')
        verdict = 'red' if failed else 'survived'
        summary.append((name, verdict, tests, failed, expectation, restored))
        out.write(f'\n=== {name}: {verdict}; vitest exit {run.returncode}; restored identical={restored}\n')
        out.write(f'expected: {expectation}\n{tests}\n')
        for case in failed:
            out.write(f'  failed: {case}\n')
    out.write('\n=== summary\n')
    for name, verdict, tests, failed, expectation, restored in summary:
        out.write(f'{name}\t{verdict}\t{tests}\trestored={restored}\n')
    final = digest(target.read_bytes()) == digest(original)
    out.write(f'final {SOURCE} identical={final}\n')
print(LOG.read_text(encoding='utf-8'))
