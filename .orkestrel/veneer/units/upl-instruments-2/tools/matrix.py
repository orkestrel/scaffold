#!/usr/bin/env python3
"""Reads every mutation log's header and prints, per red case, the mutations that redden it.

Usage: matrix.py [TITLES_FILE]
TITLES_FILE lists one case title per line, as `vitest list` prints it (`file > describe > title`);
a listed case no mutation reddens is printed with `none` so a gap reads as a gap.
"""
import glob, os, re, sys
logs = '/home/user/veneer-upl/tmp/units/upl-instruments-2/logs/mutations'
cases = {}
for path in sorted(glob.glob(f'{logs}/*.log.txt')):
    name = os.path.basename(path)[:-len('.log.txt')]
    header = open(path).read().split('\n\n', 1)[0]
    population = re.search(r'# population: (.*)', header).group(1)
    for title in re.findall(r'# red: (.*)', header):
        cases.setdefault(title.strip(), []).append(f'{name} ({population})')
titles = []
if len(sys.argv) > 1:
    titles = [line.strip() for line in open(sys.argv[1]) if line.strip()]
for title in titles or sorted(cases):
    key = title.split(' > ', 1)[1] if ' > ' in title and title.split(' > ', 1)[0].endswith('.ts') else title
    print(f'{key}\t{"; ".join(cases.get(key, ["none"]))}')
