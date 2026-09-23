# fold-63.py: successor of fold-62.py, which never ran. It carried the pre-amend landing hash `725ac07` for UTIL-PLACEMENT
# (the landing is `ac96f81`) and a plan.md anchor the handoff paragraph has since replaced. This fold edits ROADMAP.md
# only: it records UTIL-PLACEMENT (`ac96f81`) in the B-UTILITIES routing row, and NAVBAR (`009b95a`) in the
# B-COLLAPSE routing row. plan.md is the Orchestrator's record and moves by a direct edit. Takes the checkout path as
# its argument. Anchor-refusing.
import sys

def edit(path, old, new):
	s = open(path).read()
	n = s.count(old)
	if n != 1:
		sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
	open(path, 'w').write(s.replace(old, new))

R = sys.argv[1] + '/ROADMAP.md'
edit(
	R,
	"and a mechanical round on `builder` audited by `analyst` and `checker`)",
	"and a mechanical round on `builder` audited by `analyst` and `checker`); UTIL-PLACEMENT landed as `ac96f81` (the position, sizing, visibility, and visually-hidden keys with the Position, Sizing, and Visibility regions after Flex, the focused start control in the browser setup, and the offset names on the Tailwind exclusion line; a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, and a mechanical round and an evidence round on `builder`, each audited by `analyst` and `checker`; the guide's file table and obligation ledger merged three-way from the unit's base at the landing; its page-wide frames read after the `@orkestrel/test` 0.0.21 clip-edge repair, re-pinned as `ec87654`, and each frame-holding specimen ends on the band `5d7f3b9` adds below its frame)",
)
print('fold-63: B-UTILITIES routing row updated')
edit(
	R,
	"the guide's deferral table merged three-way from the unit's base at the landing)",
	"the guide's deferral table merged three-way from the unit's base at the landing); NAVBAR landed as `009b95a` (the navbar key with its section, proofs, and guide rows, the theme-scope asset map retired, and the Navbar plugin row with `Owner: J-ENGINE.`; a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, and a mechanical round and a membership round on `builder`, each audited by `analyst` and `checker`; the guide's file table merged three-way from the unit's base at the landing)",
)
print('fold-63: B-COLLAPSE routing row updated')
