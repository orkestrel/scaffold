# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
apply('/home/user/fleet/terminal/src/core/Prompt.ts', [
 (" * The headless form broker. It parks live forms, exposes their serialized schemas, and applies\n",
  " * Implements the headless form broker. It parks live forms, exposes their serialized schemas, and applies\n"),
])
apply('/home/user/fleet/terminal/src/core/PromptClient.ts', [
 (" * The SSE form bridge. It ingests serialized forms from a remote broker, renders them through a\n",
  " * Implements the SSE form bridge. It ingests serialized forms from a remote broker, renders them through a\n"),
])
apply('/home/user/fleet/terminal/src/core/TerminalManager.ts', [
 (" * The multi-endpoint terminal MANAGER — a registry of named {@link PromptInterface} brokers (one\n * per endpoint), so several parties can `ask` forms of each other by NAME with a `from` → `to`\n * attribution edge on every parked form, and a transitive DEADLOCK check across all in-flight\n * asks.\n",
  " * Registers named {@link PromptInterface} brokers (one per endpoint), so several parties can\n * `ask` forms of each other by NAME with a `from` → `to` attribution edge on every parked form,\n * and a transitive DEADLOCK check across all in-flight asks.\n"),
])
