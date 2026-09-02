# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
P = '/home/user/fleet/terminal/src/core/validators.ts'
pairs = [
 ("/** Narrow an unknown value to a {@link PendingFormStatus}. */", "/** Narrows an unknown value to a {@link PendingFormStatus}. */"),
 (" * Narrow an unknown wire value to a {@link PendingForm} envelope.", " * Narrows an unknown wire value to a {@link PendingForm} envelope."),
 (" * @returns Whether the value is a complete pending-form envelope",
  " * @returns True if the value is a complete pending-form envelope; false otherwise"),
 (" * Narrow an unknown value to a transport-neutral {@link WireEvent}.", " * Narrows an unknown value to a transport-neutral {@link WireEvent}."),
 (" * @returns Whether the value carries an event name, serialized data, and an optional id",
  " * @returns True if the value carries an event name, serialized data, and an optional id; false otherwise"),
 ("/** Narrow an unknown value to a {@link TerminalSnapshot}. */", "/** Narrows an unknown value to a {@link TerminalSnapshot}. */"),
]
apply(P, pairs)
