# map:research

## Question
What do primary external sources say about designing tool interfaces that small models (about 1B to 8B, including Qwen3 and Qwen3.5) drive reliably? The scope is tool count and overlap, observation formats, pagination, argument design, result wording, robustness to irrelevant changes, Qwen and Ollama behavior, and benchmark evidence. Each fact is tagged [M] measured or [O] opinion/guidance.

## Facts

**A. Tool count and overlapping tools**
1. [M] Offering fewer tools on BFCL lifted success on edge hardware (q4_0/q4_1/q4_K_M/q8_0): Qwen2-7B about 45% to 68%, Llama3.1-8B about 20% to 44.2%, Hermes2-Pro-8B about 40% to 71%. Execution time fell by up to 70 to 80%. Qwen2-1.5B was also tested. Source: https://arxiv.org/html/2411.15399 (Nov 2024, DATE 2025). The abstract says execution time was "reduced by up to 70%"; the per-model numbers come from the HTML body (Fig. 2).
2. [M] Adding about 3 semantically related tools (2.7 to 5.6 per case) cut BFCL accuracy by 1 to 8%. The 8B model lost the most: Granite3.1-8B went 0.945 to 0.870 (−8%), against −1% for Qwen2.5-72B. Expansion errors were wrong function (23 to 56%) or wrong parameter assignment (23 to 71%). Paraphrasing the query cost 8 to 19%. Source: https://arxiv.org/html/2504.00914 Table 2 (Apr 1 2025, TrustNLP 2025).
3. [M] Accuracy fell 7% to 85% as the tool catalog grew. Source: https://arxiv.org/abs/2505.10570 (Apr 30 2025). Quote: "performance drop of 7% to 85% as the number of tools increases".
4. [M] On WebArena with GPT-4-Turbo, removing non-essential actions (noop, tab ops, go_forward, goto, hover, press) raised success from 16.5% to 33.3%. This was the largest single step in the ablation. Source: https://arxiv.org/html/2410.13825 §4.1 Table 3 (Oct 2024, ICLR 2025).
5. [M] In MetaTool's similar-tools subtask, even the best models stayed under 73% correct selection (Vicuna-7B 73.46%, Llama2-13B 44.06%, zero-shot). Correct selection rose as description length grew. Five-shot prompting dropped Vicuna-7B by 9.79%. Source: https://arxiv.org/html/2310.03128 §3.2, Table 3, Fig. 7 (Oct 2023).
6. [M] Editing tool descriptions gave tools "over 10 times more usage" from GPT-4.1 and Qwen2.5-7B. 17 models were tested. Source: https://arxiv.org/abs/2505.18135 (May 2025, EMNLP 2025).
7. [M] Renaming tools and parameters toward names familiar from pretraining improved Qwen2.5-3B/7B and Llama3.2-3B/3.1-8B by up to 17%. Schema-misalignment errors (hallucinated tool names) fell 80%. Source: https://arxiv.org/html/2510.07248 (Oct 8 2025, ACL 2026).
8. [O] OpenAI: "Aim for fewer than 20 functions available at the start of a turn." Also: don't make the model fill arguments you already know, merge functions that always run in sequence, and use enums. Source: https://developers.openai.com/api/docs/guides/function-calling (undated, read 2026-10-06).
9. [O] Anthropic: "More tools don't always lead to better outcomes." Overlapping tools distract agents; consolidate tools and use namespacing. Source: https://www.anthropic.com/engineering/writing-tools-for-agents (Sep 11 2025).
10. [M] Unnecessary tool calls are a measured failure. SMART cut tool use 24% while raising performance more than 37% at 7B scale (via training). Source: https://arxiv.org/abs/2502.11435 (Feb 17 2025).

**B. Observation format, length, pagination**
11. [M] Weaker models do better with accessibility trees than HTML: GPT-OSS-20B 46.4% (a11y) vs 27.6% (HTML). Stronger models gain from HTML: Claude Sonnet 4.6 67.0 vs 52.4. The paper says "lower-capability models suffer from increased hallucination under longer inputs" (more "not-found" grounding errors). Source: https://arxiv.org/html/2604.01535 Table 1, §3.3 (Apr 2 2026).
12. [M] Simplifying the page (tables and lists to Markdown, merged redundant elements) added +2.6 points. Removing scroll and loading the full page added +0.9. Model: GPT-4-Turbo. Source: https://arxiv.org/html/2410.13825 §4.1–4.2.
13. [M] A file-viewer window of 100 lines resolved 18.0%. A 30-line window gave 14.3%, 400 lines 17.0%, and the full file 12.7%. Summarized search (at most 50 results) beat iterative search, 18.0 vs 12.0. Iterative search did worse than having no search tool. Source: https://arxiv.org/html/2405.15793v1 Table 2 (May 2024).
14. [M] As tool response length grew, answer retrieval degraded 7% (GPT-4o) to 91%. Granite-3.1-8B degraded 30.5%. Source: https://arxiv.org/abs/2505.10570.
15. [M] Accuracy "significantly degrades" when relevant information sits mid-context rather than at the start or end. Source: https://arxiv.org/abs/2307.03172 (Jul 2023).
16. [M] Region-level grouping cut observation tokens about 43% and raised success about 2.3 points (Qwen3.5-27B: 38.2 to 39.9). Source: https://arxiv.org/html/2605.07134 Table 1 (May 8 2026).
17. [M] FocusAgent pruned the accessibility tree more than 50% with near-baseline success (WorkArena L1: 53.6 to 51.5/53.2). Source: https://arxiv.org/html/2510.03204 (Oct 2025).
18. [O/infra] BrowserGym gives each element an injected "bid" and offers bid-based actions (`click("169")`, `fill(bid, text)`). Its action_mapping restricts the action space. Default shrinking truncates the page from the bottom. Source: https://arxiv.org/html/2412.05467 §3, §5.5 (Dec 2024).
19. [O/infra] Playwright MCP uses an accessibility snapshot with `ref=e12` element references. Click takes a human-readable `element` plus the exact ref. Extra capabilities are opt-in (`--caps`), so by default only core tools load. Source: https://github.com/microsoft/playwright-mcp.

**C. How results should guide the next step; argument design**
20. [O] Anthropic: use pagination, filtering and truncation with sensible defaults. When output is truncated, tell the agent what to do next. Give "specific and actionable" errors, not opaque codes. Prefer natural-language identifiers over UUIDs (says this "significantly improves" precision) and `user_id` over `user`. Offer a concise/detailed response option (about 72 vs 206 tokens). Claude Code caps tool responses at 25,000 tokens. Source: https://www.anthropic.com/engineering/writing-tools-for-agents.
21. [O] SWE-agent design principles are simple actions, compact output, informative feedback (an explicit message when a command succeeds with no output), and guardrails. Linting on edit was worth +3.0 [M]. Source: https://arxiv.org/html/2405.15793v1 §2, Table 2.
22. [M, aggregate only] Agent-E uses DOM denoising plus a "change observation" (a description of each action's effect) and reports 10 to 30% gains on WebVoyager. No per-feature ablation was verified. Source: https://arxiv.org/abs/2407.13032 (Jul 17 2024).

**D. Robustness to irrelevant changes**
23. [M] Meaning-preserving format changes moved LLaMA-2-13B accuracy by up to 76 points. Sensitivity "remains even when increasing model size". Which format works best "only weakly correlates between models". Source: https://arxiv.org/abs/2310.11324 (Oct 2023, ICLR 2024).
24. [M] Irrelevant context in the prompt "dramatically" lowers accuracy. Mitigations: self-consistency, and an instruction to ignore irrelevant information. Source: https://arxiv.org/abs/2302.00093 (Feb 2023, ICML 2023).
25. [M] Small models do better going from zero-shot to few-shot to fine-tuned, and "struggle significantly with adhering to the given output format". Source: https://arxiv.org/abs/2504.19277 (Apr 27 2025).

**E. Qwen and Ollama**
26. [O] For Qwen3, the Qwen team recommends Hermes-style tool use. Avoid stopword-based templates such as ReAct with reasoning models. Expect malformed calls and add fallback parsing. Source: https://qwen.readthedocs.io/en/latest/framework/function_call.html.
27. [O] Qwen3.5-2B "operates in non-thinking mode by default". Its intended uses are "prototyping, task-specific fine-tuning". With the recommended sampling it is "more prone to entering thinking loops". Recommended non-thinking text settings: temperature 1.0, top_k 20, presence_penalty 2.0. BFCL-V4 is 43.6 and TAU2 48.8 (0.8B: 25.3 and 11.6). Source: https://huggingface.co/Qwen/Qwen3.5-2B (Feb 2026).
28. [O] Qwen3.5-4B: "Qwen3.5 models operate in thinking mode by default". BFCL-V4 is 50.3 and TAU2 79.9. Source: https://huggingface.co/Qwen/Qwen3.5-4B.
29. [O] Qwen3-4B card: avoid greedy decoding in thinking mode ("performance degradation and endless repetitions"). Exclude earlier thinking content from history. Source: https://huggingface.co/Qwen/Qwen3-4B.
30. [O] Ollama tool loop: return results with role `tool` and `tool_name`. Telling the model "that it is in a loop and can make multiple tool calls" may help. Source: https://docs.ollama.com/capabilities/tool-calling.
31. [O] Ollama: agent and tool workloads "should be set to at least 64000 tokens". Default context depends on VRAM (4k below 24GB). Source: https://docs.ollama.com/context-length.
32. [Report] Qwen3.5 tool calling in Ollama once used the wrong format: it was trained on Qwen3-Coder XML but Ollama sent Hermes JSON. Other reported bugs: unclosed `<think>` in multi-turn turns, no generation prompt after tool turns, and penalty sampling ignored on the Go runner. Only a parser fix (v0.17.3) is confirmed. Fix PR #15224 still shows Open. Sources: https://github.com/ollama/ollama/issues/14493 (Feb 27 2026), https://github.com/ollama/ollama/pull/15224.
33. [Report] On Ollama 0.32.1 with gpt-oss:20b, the effective prompt limit was num_ctx/2+2, seen at 16384 and three other sizes. The issue is closed with no fix documented. Source: https://github.com/ollama/ollama/issues/17427 (Jul 27 2026).

**F. How small web agents do zero-shot**
34. [M] Llama-3.1-8B scored 4.8% zero-shot on WebArena-Lite and 42.4% after WebRL training. Source: https://arxiv.org/abs/2411.02337 (Nov 2024).
35. [M] BrowserGym's leaderboard covers only models of 70B and up (Llama-3.1-70B: WebArena 18.4%). No 8B-or-smaller rows or observation ablations are reported. Source: https://arxiv.org/html/2412.05467 Table 2.

## Matrix
(The 8 to 12 findings most applicable to this toolset. Orchestrator rules on each row.)

| # | Finding | For | Against / limits |
|---|---|---|---|
| 1 | Advertising fewer, non-overlapping tools per page task raises small-model accuracy. A tool the task doesn't need (journey/capture) is a known distractor. | F1, F2 (8B hit hardest), F3, F4, F9; matches the local probe (adding the capture tool collapsed shipping) | F1/F4 tool sets are much larger than this toolset. AgentOccam's added note/stop actions helped. |
| 2 | Tool name and description wording strongly steers which tool a small model picks. Longer, specific descriptions tend to help; shortening one can hurt. | F5, F6, F7; matches the local probe (shortened edit description) | MetaTool's few-shot and rewrite effects vary by model; the user's 100-character parameter bound is fixed |
| 3 | Small models swing widely on meaning-preserving byte changes, so one fixed page text (e.g. one port) is a single sample. | F23 (76 points; weak cross-model correlation); matches the local port finding | No study at 2B/Qwen3.5 found |
| 4 | "Works for the 2B, so it works for larger models" is not supported. The best format and wording differ by capability. | F11 (HTML helps strong models, hurts weak), F23 | F27/F28: 4B scores higher on BFCL-V4 and TAU2. 4B fails here were oracle and limit violations, not wrong answers. |
| 5 | Compact text and accessibility-tree observations with stable element refs suit weaker models. Verbosity raises hallucination. | F11, F12, F16, F17, F18, F19 | All gains measured on models of 20B and up |
| 6 | Keep tool results short and bounded. Return a moderate window and a continuation, not the full page or tiny slices. | F13 (100 lines best), F14, F15, F20 | F12: dropping scroll for the full page helped GPT-4-Turbo slightly. Window size is task-specific. |
| 7 | Summarized, capped search beats search that makes the model page through results. A model may reasonably answer via search and skip a read continuation. | F13 (summarized 18.0 vs iterative 12.0); matches the 4B paging behavior | Bears on what the paging oracle pins; no source on continuation-specific oracles |
| 8 | Results should state the effect of the action and the expected next step, including "succeeded, nothing to show" and empty results. | F20, F21, F22 (aggregate), F30 | Mostly guidance; no isolated ablation found |
| 9 | Don't make the model supply arguments the harness already knows. Use refs or enums over free text; merge steps that always run together. | F8, F18, F19, F20, F2 (parameter-assignment errors) | Guidance plus indirect measurement |
| 10 | Unprompted tool calls (overuse) are a measured small-model failure. Not advertising the tool removes the chance. | F10, F1 | SMART fixes it by training, which is out of scope here |
| 11 | Temperature 0 departs from Qwen's sampling advice, and the 2B is officially pitched for prototyping and fine-tuning. | F27, F29 | Greedy warning is stated for Qwen3 thinking mode only; no such warning on the 3.5-2B card; temperature is fixed by user ruling |
| 12 | Ollama's rendering of Qwen3.5 tool turns and its context truncation could confound results independently of the toolset. | F32, F33, F31 | Not shown for 0.35.1 or qwen3.5:2b; F33 is an unconfirmed closed issue on another model |

## Unknowns
- Whether Ollama 0.35.1 renders Qwen3.5 tool definitions and results in the trained Qwen3-Coder XML format, and whether PR #15224's mis-assignment affects library qwen3.5 tags. `/api/show` renderer/parser fields would settle it; this was not checked.
- Whether the num_ctx/2+2 truncation (#17427) happens at num_ctx 16384 with qwen3.5. `prompt_eval_count` in the run records would show it; this was not checked.
- Whether the harness sets Ollama `think` for the 4B. The 4B thinks by default and the 2B does not, so the two runs may not be comparable.
- The Qwen3.5-2B BFCL-V4/TAU2 mode (thinking vs non-thinking): two reads of the same card disagreed.
- The Less-is-More per-model numbers came from a summarized HTML read. Only the abstract's "up to 70%" execution-time figure was confirmed verbatim.
- No primary source measured tool-count, observation-format or pagination effects on Qwen3/Qwen3.5 at 0.8B to 4B, or on browser tool continuation oracles.
- Agent-E's "change observation" has no isolated ablation in the abstract; the per-feature effect was not verified.
- No source found on whether a tool result that names the next tool (without giving the answer) improves small-model continuation.
