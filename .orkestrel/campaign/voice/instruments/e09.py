# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, '/home/user/scaffold/tmp/units/voice/edits')
from apply import apply
apply('/home/user/fleet/terminal/src/core/types.ts', [
 (" * parties (agents, tools, humans) can ask forms of each other BY NAME,\n * attributed with a `from` → `to` edge on every parked record.\n",
  " * parties (agents, tools, humans) can ask forms of each other BY NAME, attributed with a\n * `from` → `to` edge on every parked record.\n"),
])
