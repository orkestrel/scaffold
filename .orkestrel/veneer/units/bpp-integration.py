"""bpp integration edit: apply the exact fixes the round-3 objective lane returned (claim 2 and O1);
each edit names one anchor and the script refuses when an anchor is not unique."""
import pathlib, sys
p = pathlib.Path('/home/user/veneer-bpp/tests/setupServer.ts'); s = p.read_text()
edits = [
 (" * Maps each planted shared name onto the longhands Tailwind's rule for it declares, the input the\n * proofs the {@link collectImportantNames} helper drives read as the longhands each name has to\n * cover.\n",
  " * Maps each planted shared name onto the longhands Tailwind's rule for it declares, the input the\n * proofs of the {@link collectImportantNames} helper pass as the longhands each name has to cover.\n"),
 (" * the {@link attributeSelector} helper answers one rule at a time and the cascade carries many, so\n",
  " * The {@link attributeSelector} helper answers one rule at a time and the cascade carries many, so\n"),
 (" * the {@link LAYER_COMPONENTS} constant answers first, because a layer carrying element treatments answers to\n",
  " * The {@link LAYER_COMPONENTS} constant answers first, because a layer carrying element treatments answers to\n"),
]
for old, new in edits:
    n = s.count(old)
    if n != 1: sys.exit(f'integration refused: anchor count {n}: {old[:60]!r}')
    s = s.replace(old, new)
p.write_text(s); print('edited')
