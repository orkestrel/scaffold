# Folds the X-TENETS-STYLES audit into Veneer's ROADMAP.md: an E-TENETS row in § Phases and units after the E-IDENTITY
# row, naming the carrier units of units/tenets-styles/tenets-styles-audit-verdict.md and the two design verdicts, and one
# § Carriers row per finding group. Runs after eid-fold-4.py in the same fold. Usage: python3 tenets-fold.py, from the
# Veneer checkout; oxfmt re-pads the tables afterwards.
V='/home/user/scaffold/.orkestrel/veneer'
p='ROADMAP.md'
lines=open(p).read().split('\n')
assert not any(l.startswith('| E-TENETS ') for l in lines), 'already folded'
def row(prefix):
    hits=[i for i,l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits)==1, (prefix, hits)
    return hits[0]
i=row('| E-IDENTITY ')
lines.insert(i+1,'| E-TENETS | `opus` on Opus 5.5 per `'+V+'/units/tenets-styles/tenets-styles-audit-verdict.md`, each unit'
 ' audited by `analyst` on Astra and `reviewer` on Opus 5.5: IMPORTANT-LAYER emits every `!important` declaration outside'
 ' the cascade layers once the user rules on `'+V+'/important-layer-design-verdict.md` (IMPORTANT-EMIT, IMPORTANT-PAIR,'
 ' IMPORTANT-CONTRACT); LEDGER-ADDITIONS then LEDGER-RETUNE per `'+V+'/ledger-values-design-verdict.md`; TOKEN-PROOFS;'
 ' TOKEN-RETIRE after the engine session answers on `src/core/constants.ts`; STATES; TAILWIND-RECIPE | Veneer |'
 ' E-ID-BUTTON-CASCADE; the user\'s IMPORTANT-LAYER ruling for the IMPORTANT units | the tenet audit\'s claims 3 to 12'
 ' and its accepted findings, each proved by a rendered or executed case whose mutation fails it |')
i=row('| Item ')
j=i+2
while lines[j].startswith('| '): j+=1
rows=[
 ('An unlayered consumer `!important` loses to Veneer\'s layered important declarations, where it wins in Bootstrap 5.3.8'
  ' (the tenet audit, claims 3 and 4)', 'IMPORTANT-LAYER: the user rules on option (a), then IMPORTANT-EMIT,'
  ' IMPORTANT-PAIR, and IMPORTANT-CONTRACT'),
 ('`--vn-focus-reset` and the tertiary role\'s `-subtle`, `-border`, and `-rgb` tiers have no reader (claim 5)',
  'TOKEN-RETIRE, after the engine session answers on `src/core/constants.ts`'),
 ('No proof overrides a `link`, `form`, `button`, `state`, `weight`, or `ease` token and reads a shipped consumer move'
  ' (claim 6); two § Tokens rows for the stacking rungs (F-STACK-ROW)', 'TOKEN-PROOFS'),
 ('The range thumb\'s press, disabled, and reduced-motion states and a disabled `.btn-link` are read from no rendered'
  ' result (claims 7 and 12)', 'STATES'),
 ('The ledger compares no canonical value, labels a retune `tokenized`, records no Additions value, skips an'
  ' unattributed rule, and keeps a hand-written shipped list; no gate checks `bootstrap` provenance (claims 8 to 10)',
  'LEDGER-ADDITIONS, then LEDGER-RETUNE'),
 ('No rendered case mounts a component class under Tailwind\'s preflight, the preflight recipe is never compiled, and'
  ' the § Tailwind prose is garbled (claim 11, the rendered F2)', 'TAILWIND-RECIPE'),
 ('`npm test` omits `test:service`, so the Tailwind proofs run in no gate (the rendered F1)', 'this session\'s landing'
  ' chain runs `test:service`; adding it to `npm test` is a `package.json` change asked of the engine session'),
 ('The motion factor does not reach the transitions that keep Bootstrap\'s literals (F-MOTION-SCOPE)',
  'E-ID-MOTION-FACTOR, per `'+V+'/e-id-motion-design-verdict.md`'),
]
for k,(item,carrier) in enumerate(rows):
    lines.insert(j+k,'| '+item+' | '+carrier+' |')
open(p,'w').write('\n'.join(lines))
print('folded')
