# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
P = '/home/user/fleet/terminal/src/core/errors.ts'
pairs = [
 (" * The error the terminal surfaces for its own refusals: parking on a destroyed or full broker, an\n",
  " * Represents the error the terminal surfaces for its own refusals: parking on a destroyed or full broker, an\n"),
 ("/** The machine-readable condition — see {@link TerminalErrorCode}. */",
  "/** Holds the machine-readable condition — see {@link TerminalErrorCode}. */"),
 ("/** An optional context bag naming the offending values — see the class {@link TerminalError remarks}. */",
  "/** Holds an optional context bag naming the offending values — see the class {@link TerminalError remarks}. */"),
 (" * Narrow an unknown caught value to a {@link TerminalError}.\n",
  " * Narrows an unknown caught value to a {@link TerminalError}.\n"),
 (" * @returns `true` when `value` is a {@link TerminalError}\n",
  " * @returns True if `value` is a {@link TerminalError}; false otherwise\n"),
]
apply(P, pairs)
