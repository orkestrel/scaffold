# Resolves the one semantic collision left by merging Veneer main 1290162 into unit/oracle-record (2026-09-25).
# J-ORACLE-RECORD imports `build` from `vite` at module scope. The styles session's E-RECEIPTS declares locals
# named `build` for a browser's four-part build, so `no-shadow` flags three sites. This script renames those
# locals to `version`, the name of the method the runtime reader takes the value from. It changes no export,
# member, message, or behaviour. Each edit must match once, or the script stops with nothing written.
from pathlib import Path

ROOT = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\oracle-record')

EDITS = {
    'tests/setupServer.ts': [
        (
            "\tconst build = browser.version()\n"
            "\tif (!BUILD_PATTERN.test(build)) throw new Error(`Runtime: invalid build ${build}`)\n",
            "\tconst version = browser.version()\n"
            "\tif (!BUILD_PATTERN.test(version)) throw new Error(`Runtime: invalid build ${version}`)\n",
        ),
        (
            "\t\tchannel: options.launchOptions?.channel ?? 'chromium',\n\t\tbuild,\n",
            "\t\tchannel: options.launchOptions?.channel ?? 'chromium',\n\t\tbuild: version,\n",
        ),
        (
            "const [date, revision, channel, build, platform, kernel, node, npm, listed, result] = cells\n",
            "const [date, revision, channel, version, platform, kernel, node, npm, listed, result] = cells\n",
        ),
        (
            "\t\t\t\t!channel ||\n\t\t\t\t!build ||\n",
            "\t\t\t\t!channel ||\n\t\t\t\t!version ||\n",
        ),
        (
            "if (!BUILD_PATTERN.test(build)) throw new Error(`${label}: invalid Build ${build}`)\n",
            "if (!BUILD_PATTERN.test(version)) throw new Error(`${label}: invalid Build ${version}`)\n",
        ),
        (
            "\t\t\t\tchannel,\n\t\t\t\tbuild,\n\t\t\t\tplatform,\n",
            "\t\t\t\tchannel,\n\t\t\t\tbuild: version,\n\t\t\t\tplatform,\n",
        ),
    ],
    'tests/setupServer.test.ts': [
        (
            "\t\tfor (const build of ['141.0.7390', '141.0.7390.37.1', '141.0.7390.x', '']) {\n"
            "\t\t\texpect(() => readRuntime({ version: () => build }, options, environment)).toThrow(\n"
            "\t\t\t\t`Runtime: invalid build ${build}`,\n",
            "\t\tfor (const version of ['141.0.7390', '141.0.7390.37.1', '141.0.7390.x', '']) {\n"
            "\t\t\texpect(() => readRuntime({ version: () => version }, options, environment)).toThrow(\n"
            "\t\t\t\t`Runtime: invalid build ${version}`,\n",
        ),
    ],
}

texts = {}
for name, edits in EDITS.items():
    text = (ROOT / name).read_bytes().decode('utf-8')
    for old, new in edits:
        if text.count(old) != 1:
            raise SystemExit(f'{name}: expected one match, found {text.count(old)}: {old[:70]!r}')
        text = text.replace(old, new, 1)
    texts[name] = text
for name, text in texts.items():
    (ROOT / name).write_bytes(text.encode('utf-8'))
    print(name, 'renamed', len(EDITS[name]))
