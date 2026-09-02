# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
P = '/home/user/fleet/terminal/src/core/factories.ts'
pairs = [
 (" * Create the headless {@link PromptInterface} broker. It parks live forms and applies remote\n",
  " * Creates the headless {@link PromptInterface} broker. It parks live forms and applies remote\n"),
 (" * Create the SSE prompt {@link PromptClientInterface} BRIDGE — it connects to a remote broker's SSE\n",
  " * Creates the SSE prompt {@link PromptClientInterface} BRIDGE — it connects to a remote broker's SSE\n"),
 (" * Create the multi-endpoint {@link TerminalManager} — a named registry of\n",
  " * Creates the multi-endpoint {@link TerminalManager} — a named registry of\n"),
 (" * Create the in-memory {@link TerminalStoreInterface} — a process-lifetime `Map` of endpoint\n",
  " * Creates the in-memory {@link TerminalStoreInterface} — a process-lifetime `Map` of endpoint\n"),
 (" * Create a {@link TerminalStoreInterface} backed by one table of the `databases` layer — the\n",
  " * Creates a {@link TerminalStoreInterface} backed by one table of the `databases` layer — the\n"),
]
apply(P, pairs)
