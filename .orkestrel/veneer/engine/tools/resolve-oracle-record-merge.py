# Resolves the merge of Veneer main 1290162 into unit/oracle-record (2026-09-25) by hunk, under D49: each conflict is an
# addition on both sides, J-ORACLE-RECORD's plugin oracle and the styles session's E-RECEIPTS, so every hunk keeps both.
# Each hunk is matched by its exact 'ours' and 'theirs' text and replaced by the union; an unrecognised hunk stops the
# script with nothing written.
from pathlib import Path

ROOT = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\oracle-record')


def resolve(name, table):
    p = ROOT / name
    lines = p.read_bytes().decode('utf-8').split('\n')
    out = []
    i = 0
    done = 0
    while i < len(lines):
        if not lines[i].startswith('<<<<<<< '):
            out.append(lines[i])
            i += 1
            continue
        j = lines.index('=======', i)
        k = next(n for n in range(j, len(lines)) if lines[n].startswith('>>>>>>> '))
        ours = '\n'.join(lines[i + 1 : j])
        theirs = '\n'.join(lines[j + 1 : k])
        key = next((entry for entry in table if entry[0] == ours and entry[1] == theirs), None)
        assert key is not None, (name, ours[:80], theirs[:80])
        out.extend(key[2].split('\n'))
        done += 1
        i = k + 1
    assert done == len(table), (name, done, len(table))
    p.write_bytes('\n'.join(out).encode('utf-8'))
    print(name, 'resolved', done)


resolve(
    'tests/setupServer.ts',
    [
        (
            "// cascade, the stylesheet reader the Tailwind readings take in Node, the Button and plugin oracle\n"
            "// recorders with the plugin scenarios they drive, the specifier reader, and the source, build, and\n"
            "// dependency sweeps. Node-only, so it takes `node:*`\n"
            "// imports and anchors every path it reads at `WORKSPACE_ROOT`. The `conformance` project loads it",
            "// cascade, the stylesheet reader the Tailwind readings take in Node, the oracle recorder, the\n"
            "// runtime reader a receipt is checked against, the specifier reader, and the source, build, and\n"
            "// dependency sweeps. Node-only, so it takes `node:*` imports and anchors every path it reads at\n"
            "// `WORKSPACE_ROOT`. The `conformance` project loads it",
            "// cascade, the stylesheet reader the Tailwind readings take in Node, the Button and plugin oracle\n"
            "// recorders with the plugin scenarios they drive, the runtime reader a receipt is checked against,\n"
            "// the specifier reader, and the source, build, and dependency sweeps. Node-only, so it takes\n"
            "// `node:*` imports and anchors every path it reads at `WORKSPACE_ROOT`. The `conformance` project\n"
            "// loads it",
        ),
        (
            "import type { ESTree, Plugin } from 'vite'\nimport type { Browser, Locator, Page } from 'playwright'",
            "import type { ESTree } from 'vite'\n"
            "import type { PlaywrightProviderOptions } from '@vitest/browser-playwright'\n"
            "import type { Browser, Locator } from 'playwright'",
            "import type { ESTree, Plugin } from 'vite'\n"
            "import type { PlaywrightProviderOptions } from '@vitest/browser-playwright'\n"
            "import type { Browser, Locator, Page } from 'playwright'",
        ),
        (
            "import { waitForCondition } from '@orkestrel/test'",
            "import { VERSION_PATTERN } from '@orkestrel/scaffold'",
            "import { VERSION_PATTERN } from '@orkestrel/scaffold'\nimport { waitForCondition } from '@orkestrel/test'",
        ),
    ],
)
resolve(
    'tests/setupServer.test.ts',
    [
        (
            "import { beforeAll, describe, expect, it } from 'vitest'\nimport { build, parseSync, Visitor } from 'vite'",
            "import { chromium } from 'playwright'\n"
            "import { afterAll, beforeAll, describe, expect, it } from 'vitest'\n"
            "import { parseSync, Visitor } from 'vite'\n"
            "import { resolveBrowser, resolvePinnedBrowser } from '../configs/browsers.js'",
            "import { chromium } from 'playwright'\n"
            "import { afterAll, beforeAll, describe, expect, it } from 'vitest'\n"
            "import { build, parseSync, Visitor } from 'vite'\n"
            "import { resolveBrowser, resolvePinnedBrowser } from '../configs/browsers.js'",
        ),
        (
            "\t\t\t'readPluginFixture',\n\t\t\t'readPluginState',\n\t\t\t'readPluginWitness',",
            "\t\t\t'readReceipts',\n\t\t\t'readRuntime',\n\t\t\t'readSupportedHosts',",
            "\t\t\t'readPluginFixture',\n\t\t\t'readPluginState',\n\t\t\t'readPluginWitness',\n"
            "\t\t\t'readReceipts',\n\t\t\t'readRuntime',\n\t\t\t'readSupportedHosts',",
        ),
    ],
)
