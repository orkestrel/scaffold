#!/usr/bin/env bash
# ER-MECH round 3: does `npm run` refuse a script when engines.node is not met, and when
# devEngines.packageManager is not met, under npm_config_engine_strict=true? Scratch packages
# live under the session scratchpad.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH"
export npm_config_engine_strict=true
echo "npm=$(npm --version) node=$(node --version) engine-strict=$(npm config get engine-strict)"
probe() {
	local name="$1" manifest="$2"
	local dir="$S/erm3/erm-3-engines-$name"
	rm -rf "$dir" && mkdir -p "$dir"
	printf '%s\n' "$manifest" > "$dir/package.json"
	echo "--- $name: $(cat "$dir/package.json")"
	(cd "$dir" && npm run hello 2>&1)
	echo "exit=$?"
}
probe engines '{"name":"engines-probe","version":"0.0.0","private":true,"engines":{"node":">=99"},"scripts":{"hello":"echo script ran"}}'
probe devengines '{"name":"devengines-probe","version":"0.0.0","private":true,"devEngines":{"packageManager":{"name":"npm","version":">=99.0.0","onFail":"error"}},"scripts":{"hello":"echo script ran"}}'
