#!/usr/bin/env bash
# Runs every mutation reading in turn: each plants one mutation, runs the one case it must redden,
# restores the subject, and digests it before and after (tmp/j-integration/mutation.sh).
set -u
cd "$(dirname "$0")/../.."
run() {
	bash tmp/j-integration/mutation.sh "tmp/j-integration/$1.json" "$2" "$3" "$4" "tmp/j-integration/$1.log.txt"
}
run m-int1 src/styles/components/_modal.scss tests/src/browser/Modal.test.ts 'reads the shipped modal declarations'
run m-int2-modal src/browser/Modal.ts tests/src/browser/Modal.test.ts 'returns the backdrop to its shown state when the host takes a hide over during the backdrop fade'
run m-int5-modal src/browser/Modal.ts tests/src/browser/Modal.test.ts 'inside the backdrop removal stops the hide'
run m-int2-offcanvas src/browser/Offcanvas.ts tests/src/browser/Offcanvas.test.ts 'removes no backdrop and returns it to its shown state'
run m-int5-offcanvas src/browser/Offcanvas.ts tests/src/browser/Offcanvas.test.ts 'after a reaction to a backdrop write stops the change'
run m-backdrop-place src/browser/Backdrop.ts tests/src/browser/Backdrop.test.ts 'shows a backdrop its parent already holds in place'
run m-backdrop-place-held src/browser/Backdrop.ts tests/src/browser/Offcanvas.test.ts 'removes no backdrop and returns it to its shown state'
run m-backdrop-insertion src/browser/Backdrop.ts tests/src/browser/Backdrop.test.ts 'writes no shown token after a reaction inside its insertion'
