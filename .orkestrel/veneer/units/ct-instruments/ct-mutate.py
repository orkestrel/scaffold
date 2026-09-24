"""Applies one named mutation of tmp/units/ct-mutations.sh to one file, refusing a site that is
absent or repeated."""

import sys

mutation, path = sys.argv[1], sys.argv[2]
text = open(path).read()


def swap(old, new, occurrence=None):
    global text
    count = text.count(old)
    if occurrence is None:
        if count != 1:
            sys.exit(f'{mutation}: site found {count} times')
        text = text.replace(old, new, 1)
        return
    if count < occurrence:
        sys.exit(f'{mutation}: site found {count} times, wanted occurrence {occurrence}')
    start = -1
    for _ in range(occurrence):
        start = text.index(old, start + 1)
    text = text[:start] + new + text[start + len(old):]


if mutation == 'M1-secondary':
    swap("\t'secondary': 'var(--vn-gray-600)',\n\t'secondary-rgb': '108, 117, 125',", "\t'secondary': 'oklch(0.446 0.043 257.281)',\n\t'secondary-rgb': '69, 85, 108',")
elif mutation == 'M3-dark-hover':
    swap("'color-mix(in srgb, var(--vn-link-base) 65%, white)'", "'color-mix(in srgb, var(--vn-link-base) 65%, black)'")
elif mutation == 'M4-light-hover':
    swap("'color-mix(in srgb, var(--vn-link-base) 65%, black)'", "'color-mix(in srgb, var(--vn-link-base) 80%, black)'")
elif mutation == 'M5-dark-redeclares':
    swap("\t\t\t--bs-secondary-rgb: var(--vn-color-secondary-rgb);\n", "\t\t\t--bs-secondary-rgb: var(--vn-color-secondary-rgb);\n\t\t\t@if $mode == dark {\n\t\t\t\t--bs-border-radius: 0;\n\t\t\t}\n")
elif mutation == 'M6-registry-rule':
    swap("\t\t\t\tif (registry.includes(property)) continue\n", '')
    swap('if (declared.has(property) || registry.includes(property)) continue', 'if (declared.has(property)) continue')
elif mutation == 'M7-theme-withheld':
    start = text.index('| theme            | selector       |')
    end = text.index('\n', start)
    text = text[:start] + text[end + 1:]
elif mutation == 'M8-dark-tiers-mixed':
    swap("\t'--vn-color-dark-subtle': 'dark-subtle',\n\t'--vn-color-dark-emphasis': 'dark-emphasis',\n\t'--vn-color-dark-border': 'dark-border',\n", '')
elif mutation == 'S1-dark-attribute':
    swap('<div class="bg-body text-body border rounded p-3" data-bs-theme="dark">', '<div class="bg-body text-body border rounded p-3">')
elif mutation == 'S2-nested-attribute':
    swap('<div class="bg-body text-body border rounded p-3" data-bs-theme="light">', '<div class="bg-body text-body border rounded p-3">', occurrence=2)
elif mutation == 'S3-control-dropped':
    swap('<nav class="navbar" aria-label="Nested bar"><button class="navbar-toggler" type="button" aria-label="Toggle the nested bar links"><span class="navbar-toggler-icon"></span></button></nav>', '')
elif mutation == 'S4-section-unexported':
    swap("export * from './sections/ColorModeSection.js'\n", '')
else:
    sys.exit(f'unknown mutation {mutation}')

open(path, 'w').write(text)
