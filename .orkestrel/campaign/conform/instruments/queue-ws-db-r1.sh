#!/bin/bash
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
bash /home/user/scaffold/tmp/work/grok3.sh websocket-r1-distill-luna /home/user/scaffold/tmp/cursor/websocket-r1-distill-brief.md /home/user/fleet/websocket
bash /home/user/scaffold/tmp/work/grok3.sh websocket-r1-checker-luna /home/user/scaffold/tmp/cursor/websocket-r1-checker-brief.md /home/user/fleet/websocket
bash /home/user/scaffold/tmp/work/grok3.sh database-r1-distill-luna /home/user/scaffold/tmp/cursor/database-r1-distill-brief.md /home/user/fleet/database
bash /home/user/scaffold/tmp/work/grok3.sh database-r1-checker-luna /home/user/scaffold/tmp/cursor/database-r1-checker-brief.md /home/user/fleet/database
