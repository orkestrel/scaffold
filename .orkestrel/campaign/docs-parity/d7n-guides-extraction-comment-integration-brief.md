# Correct the accepted ownership comment

Root owns the comment immediately above the package-owned-guides selection test
in scaffold/tests/src/core/compilers.test.ts. Apply Astra's retained prose finding
from d7n-guides-extraction-final-verdict.md: state that the package owns the proof,
scaffold emits its command/project only when guides are selected, and scaffold
does not vendor the authored entry. Do not change test assertions or runtime code.

The applicable authority is AGENTS.md, .agents/orchestration.md, writing, tests,
documentation and quality rules, and guides/scaffold.md's package-ownership
contract. Root inspected the original comment beside the unchanged assertions.
Carry the exact comment delta into the independent correction review. No new test
execution is needed to measure a runtime change because none is made; the final
affected root chain follows the replacement Guide install.
