# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
P = '/home/user/fleet/terminal/src/core/constants.ts'
pairs = [
 (" * Names the Control Sequence Introducer lead (`ESC[`) for the navigation keys — the prefix of\n * the arrow / home / end / delete sequences {@link SEQUENCE_NAMES} is keyed by. Named `KEY_CSI`\n",
  " * Names the Control Sequence Introducer lead (`ESC[`) for the navigation keys — the prefix of the\n * arrow / home / end / delete sequences {@link SEQUENCE_NAMES} is keyed by. Named `KEY_CSI`\n"),
 (" * Holds every {@link import('./types.js').PromptRole}, in one frozen list — the role axis's source\n * of truth. {@link import('./helpers.js').createPromptTheme} walks it to merge a partial theme, and\n",
  " * Holds every {@link import('./types.js').PromptRole}, in one frozen list — the role axis's source of\n * truth. {@link import('./helpers.js').createPromptTheme} walks it to merge a partial theme, and\n"),
]
apply(P, pairs)
