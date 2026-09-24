#!/usr/bin/env bash
# Probes whether a class field can take its type from a private sibling field (`typeof this.#joined`),
# which would give the presence shape one inline declaration, then restores the file.
set -u
cd "$(dirname "$0")/../.."
{
	echo "before: $(sha256sum src/browser/HostSnapshot.ts)"
	cp src/browser/HostSnapshot.ts tmp/j-integration/HostSnapshot.ts.probe
	node -e "const fs=require('node:fs');const f='src/browser/HostSnapshot.ts';const t=fs.readFileSync(f,'utf8');fs.writeFileSync(f,t.replace('\t#leaving: ReadonlyArray<{\n\t\treadonly element: HTMLElement\n\t\treadonly attribute: \'class\' | \'style\'\n\t}> = []','\t#leaving: typeof this.#joined = []'))"
	grep -n "#leaving: typeof" src/browser/HostSnapshot.ts
	npx tsc --noEmit -p configs/src/tsconfig.browser.json 2>&1
	echo "tsc exit: $?"
	cp tmp/j-integration/HostSnapshot.ts.probe src/browser/HostSnapshot.ts
	rm tmp/j-integration/HostSnapshot.ts.probe
	echo "after: $(sha256sum src/browser/HostSnapshot.ts)"
} > tmp/j-integration/int4-typeof-probe.log.txt 2>&1
