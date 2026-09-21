// The Orchestrator's probe for CL6's stop: the calibration record gives the anchor's hover colour
// as an sRGB triple and its own colour property unchanged between rest and hover, so the record
// does not say how the hover colour is produced. This converts the candidate expressions to sRGB
// and compares them against the recorded hover values, to find which one the record's number is.
// Conversions follow the CSS Color 4 definitions: OKLCH to OKLab to linear sRGB to sRGB.

function oklchToOklab(l, c, hDegrees) {
	const h = (hDegrees * Math.PI) / 180
	return [l, c * Math.cos(h), c * Math.sin(h)]
}

function oklabToLinear(L, a, b) {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
	return [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	]
}

function linearToSrgb(value) {
	return value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055
}

function oklchToSrgb(l, c, h) {
	const [L, a, b] = oklchToOklab(l, c, h)
	return oklabToLinear(L, a, b).map(linearToSrgb)
}

function oklabToSrgb(L, a, b) {
	return oklabToLinear(L, a, b).map(linearToSrgb)
}

function show(name, triple) {
	const clamped = triple.map((value) => Math.min(1, Math.max(0, value)))
	const bytes = clamped.map((value) => Math.round(value * 255))
	console.log(
		`${name.padEnd(34)} srgb ${clamped.map((v) => v.toFixed(6)).join(' ')}   rgb(${bytes.join(', ')})`,
	)
}

console.log('== what the record carries')
show('light rest, from oklab', oklabToSrgb(0.3984, -0.019591, -0.190088))
show('light hover, as recorded', [0.0407929, 0.170295, 0.538144])
show('dark rest, from oklab', oklabToSrgb(0.7458, -0.0728685, -0.0983535))
show('dark hover, as recorded', [0.248988, 0.580565, 0.745237])

console.log('\n== the candidate expressions')
show('primary light, oklch(48% .255 264)', oklchToSrgb(0.48, 0.255, 264))
show('primary dark, oklch(70% .15 233)', oklchToSrgb(0.7, 0.15, 233))
