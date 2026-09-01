// U3 dist surgery: single-slot call ledger in #trackGuard and #trackFaults -
// an inline one-entry slot serves the common one-object-per-node call; a
// WeakMap is allocated only when a second distinct object arrives in the same
// scope, carrying the slot entry. #trackFaults retains only clean reports,
// exactly as today.
// Run: node u3-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
const text = readFileSync(source, 'utf8')

const guardAnchor = `	#trackGuard(plan) {
		let filled = 0;
		let memo;
		return (value) => {
			if (!isObject(value)) return plan(value);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (memo === void 0 || filled !== scope) {
					memo = new ContractCompiler.#weakMap();
					filled = scope;
				}
				const recalled = INTRINSICS.apply(INTRINSICS.recall, memo, [value]);
				if (recalled !== void 0) return recalled;
				const answer = plan(value);
				INTRINSICS.apply(INTRINSICS.retain, memo, [value, answer]);
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}`

const guardReplacement = `	#trackGuard(plan) {
		let filled = 0;
		let memo;
		let slotUsed = false;
		let slotValue;
		let slotAnswer = false;
		return (value) => {
			if (!isObject(value)) return plan(value);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (filled !== scope) {
					memo = void 0;
					slotUsed = false;
					filled = scope;
				}
				if (slotUsed && slotValue === value) return slotAnswer;
				if (memo !== void 0) {
					const recalled = INTRINSICS.apply(INTRINSICS.recall, memo, [value]);
					if (recalled !== void 0) return recalled;
				}
				const answer = plan(value);
				if (!slotUsed) {
					slotUsed = true;
					slotValue = value;
					slotAnswer = answer;
				} else {
					if (memo === void 0) {
						memo = new ContractCompiler.#weakMap();
						INTRINSICS.apply(INTRINSICS.retain, memo, [slotValue, slotAnswer]);
					}
					INTRINSICS.apply(INTRINSICS.retain, memo, [value, answer]);
				}
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}`

const faultsHead = `	#trackFaults(plan) {
		let filled = 0;
		let memo;
		return (value, path) => {
			if (!isObject(value)) return plan(value, path);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (memo === void 0 || filled !== scope) {
					memo = new ContractCompiler.#weakMap();
					filled = scope;
				}
				const recalled = INTRINSICS.apply(INTRINSICS.recall, memo, [value]);
				if (recalled !== void 0) return recalled;
				const answer = plan(value, path);
				if (answer.length === 0) INTRINSICS.apply(INTRINSICS.retain, memo, [value, answer]);
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}`

const faultsReplacement = `	#trackFaults(plan) {
		let filled = 0;
		let memo;
		let slotUsed = false;
		let slotValue;
		let slotAnswer;
		return (value, path) => {
			if (!isObject(value)) return plan(value, path);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (filled !== scope) {
					memo = void 0;
					slotUsed = false;
					filled = scope;
				}
				if (slotUsed && slotValue === value && slotAnswer !== void 0) return slotAnswer;
				if (memo !== void 0) {
					const recalled = INTRINSICS.apply(INTRINSICS.recall, memo, [value]);
					if (recalled !== void 0) return recalled;
				}
				const answer = plan(value, path);
				if (answer.length === 0) {
					if (!slotUsed) {
						slotUsed = true;
						slotValue = value;
						slotAnswer = answer;
					} else {
						if (memo === void 0) {
							memo = new ContractCompiler.#weakMap();
							if (slotAnswer !== void 0) INTRINSICS.apply(INTRINSICS.retain, memo, [slotValue, slotAnswer]);
						}
						INTRINSICS.apply(INTRINSICS.retain, memo, [value, answer]);
					}
				} else if (!slotUsed) {
					slotUsed = true;
					slotValue = value;
					slotAnswer = void 0;
				}
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}`

if (!text.includes(guardAnchor)) { console.error('U3: guard anchor missing'); process.exit(1) }
if (!text.includes(faultsHead)) { console.error('U3: faults anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(guardAnchor, guardReplacement).replace(faultsHead, faultsReplacement))
console.log(`U3 patched -> ${target}`)
