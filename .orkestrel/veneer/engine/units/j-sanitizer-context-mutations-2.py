# J-SANITIZER-CONTEXT whole-file mutation instrument, round 2. Applies each named edit alone to its
# source file, runs tests/src/browser/sanitizers/ConfigSanitizer.test.ts in the src:browser project,
# records the failed case names, restores the original bytes of every source, and checks each restored
# digest before the next row. Round 2 changes from round 1: each row names its file, because the
# integration-point tables moved to constants.ts; the rows for the moved tables mutate constants.ts;
# the control reorders the integration test's operands, because the constants case pins the table
# order; the R1 rows mutate each namespace constant and drop an entry from each table.
# Run from the worktree root: python tmp/j-sanitizer-context/mutations.py < /dev/null
# Log: tmp/j-sanitizer-context/mutations.log.txt
import hashlib
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
CLASS = 'src/browser/sanitizers/ConfigSanitizer.ts'
CONSTANTS = 'src/browser/constants.ts'
TEST = 'tests/src/browser/sanitizers/ConfigSanitizer.test.ts'
LOG = ROOT / 'tmp/j-sanitizer-context/mutations.log.txt'
NPX = 'npx.cmd' if sys.platform == 'win32' else 'npx'
SEEN_BY_141 = 'not visible on Chromium 153, which parses the div and the copy alike; the Chromium 141 re-read discriminates'
CONSTANTS_CASE = 'names the namespaces the HTML parser gives MathML and SVG elements, and the HTML integration points the HTML standard defines'

# name -> (file, old, new, the case the row must redden, or why this host cannot see it)
ROWS = {
    'unsubstituted': (CLASS,
        "? Document.prototype.createElement.call(inert, 'div')",
        '? Document.prototype.importNode.call(inert, element, false)',
        SEEN_BY_141 + ' (its b1d314d log is this row red)'),
    'any-encoding': (CLASS,
        "? Element.prototype.getAttributeNS.call(element, null, 'encoding')?.toLowerCase()",
        "? 'text/html'",
        'the annotation-xml case whose encoding names no HTML type'),
    'namespace-blind': (CLASS,
        "Element.prototype.getAttributeNS.call(element, null, 'encoding')",
        "Element.prototype.getAttribute.call(element, 'encoding')",
        'the annotation-xml case whose encoding names no HTML type (its namespaced variant)'),
    'trimmed': (CLASS,
        "'encoding')?.toLowerCase()",
        "'encoding')?.trim().toLowerCase()",
        'the annotation-xml case whose encoding names no HTML type (its spaced variant)'),
    'case-exact': (CLASS,
        "'encoding')?.toLowerCase()",
        "'encoding')",
        SEEN_BY_141 + ' through the TEXT/HTML encoding'),
    'svg-dropped': (CLASS,
        'SANITIZER_SVG_INTEGRATIONS.includes(name.name)',
        'false',
        'not visible on Chromium 153; the Chromium 141 re-read discriminates only if that build mishandles an SVG context'),
    'text-points-added': (CLASS,
        'SANITIZER_SVG_INTEGRATIONS.includes(name.name))',
        "SANITIZER_SVG_INTEGRATIONS.includes(name.name)) || ['mi', 'mo', 'mn', 'ms', 'mtext'].includes(name?.name ?? 'none')",
        'the MathML text integration point case'),
    'template-context': (CLASS,
        "? Document.prototype.createElement.call(inert, 'div')",
        "? Document.prototype.createElement.call(inert, 'template')",
        'the annotation-xml HTML encoding case, the SVG case, and the integration-point bound case'),
    'mathml-namespace-changed': (CONSTANTS,
        "SANITIZER_MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML'",
        "SANITIZER_MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML/'",
        CONSTANTS_CASE + '; the behaviour it gates is ' + SEEN_BY_141),
    'svg-namespace-changed': (CONSTANTS,
        "SANITIZER_SVG_NAMESPACE = 'http://www.w3.org/2000/svg'",
        "SANITIZER_SVG_NAMESPACE = 'http://www.w3.org/2000/svg/'",
        CONSTANTS_CASE + ', and the matrix cases the SVG floor entries pin'),
    'encodings-missing-entry': (CONSTANTS,
        "\t'text/html',\n\t'application/xhtml+xml',\n])",
        "\t'application/xhtml+xml',\n])",
        CONSTANTS_CASE + '; the behaviour it gates is ' + SEEN_BY_141 + ' through the text/html case'),
    'xhtml-missing-entry': (CONSTANTS,
        "\t'text/html',\n\t'application/xhtml+xml',\n])",
        "\t'text/html',\n])",
        CONSTANTS_CASE + '; the behaviour it gates is ' + SEEN_BY_141 + ' through the application/xhtml+xml case'),
    'svg-integrations-missing-entry': (CONSTANTS,
        "\t'foreignObject',\n\t'desc',\n\t'title',\n])",
        "\t'foreignObject',\n\t'desc',\n])",
        CONSTANTS_CASE),
    'control-operands': (CLASS,
        '(encoding !== undefined && SANITIZER_ENCODINGS.includes(encoding)) ||\n'
        '\t\t\t(name?.namespace === SANITIZER_SVG_NAMESPACE &&\n'
        '\t\t\t\tSANITIZER_SVG_INTEGRATIONS.includes(name.name))',
        '(name?.namespace === SANITIZER_SVG_NAMESPACE &&\n'
        '\t\t\t\tSANITIZER_SVG_INTEGRATIONS.includes(name.name)) ||\n'
        '\t\t\t(encoding !== undefined && SANITIZER_ENCODINGS.includes(encoding))',
        'control: must survive'),
}

FAILED = re.compile(r'^\s*[×✗]\s+(.*?)(?:\s+\d+ms)?$')


def digest(data):
    return hashlib.sha256(data).hexdigest()


originals = {path: (ROOT / path).read_bytes() for path in (CLASS, CONSTANTS)}
summary = []
with open(LOG, 'w', encoding='utf-8', newline='\n') as out:
    for path, data in originals.items():
        out.write(f'original {path} sha256={digest(data)}\n')
    for name, (path, old, new, expectation) in ROWS.items():
        target = ROOT / path
        text = originals[path].decode('utf-8')
        assert text.count(old) == 1, (name, old)
        target.write_bytes(text.replace(old, new).encode('utf-8'))
        try:
            run = subprocess.run(
                [NPX, 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache',
                 '--project', 'src:browser', '--reporter=verbose', TEST],
                cwd=ROOT, capture_output=True, encoding='utf-8', errors='replace', stdin=subprocess.DEVNULL,
            )
        finally:
            target.write_bytes(originals[path])
        restored = all(digest((ROOT / p).read_bytes()) == digest(d) for p, d in originals.items())
        lines = (run.stdout + run.stderr).splitlines()
        failed = sorted({m.group(1) for m in map(FAILED.match, lines) if m})
        tests = next((line.strip() for line in lines if line.strip().startswith('Tests ')), 'no Tests line')
        verdict = 'red' if failed else 'survived'
        summary.append((name, path, verdict, tests, restored))
        out.write(f'\n=== {name} ({path}): {verdict}; vitest exit {run.returncode}; restored identical={restored}\n')
        out.write(f'expected: {expectation}\n{tests}\n')
        for case in failed:
            out.write(f'  failed: {case}\n')
    out.write('\n=== summary\n')
    for name, path, verdict, tests, restored in summary:
        out.write(f'{name}\t{path}\t{verdict}\t{tests}\trestored={restored}\n')
    for path, data in originals.items():
        out.write(f'final {path} identical={digest((ROOT / path).read_bytes()) == digest(data)}\n')
print(LOG.read_text(encoding='utf-8'))
