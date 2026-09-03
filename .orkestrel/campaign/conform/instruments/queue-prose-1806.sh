#!/bin/bash
# Prose follow-on checkers on Luna, one lane at a time behind the bench lock.
cd /home/user/scaffold || exit 2
export CURSOR_GROK_MODEL=gpt-5.6-luna-high
bash /home/user/scaffold/tmp/work/grok4.sh database-prose-checker-luna /home/user/scaffold/tmp/cursor/database-prose-audit-brief.md /home/user/fleet/database
bash /home/user/scaffold/tmp/work/grok4.sh form-prose-r2-checker-luna /home/user/scaffold/tmp/cursor/form-prose-r2-audit-brief.md /home/user/fleet/form
