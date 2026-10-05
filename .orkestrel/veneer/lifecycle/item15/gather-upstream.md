# gather:upstream

Upstream research for browser ROADMAP item 15: one primary-source mechanism fits the captured failure, and every other candidate in the brief contradicts the evidence. That mechanism is Chromium's socket-pool flush on a Windows IP address change, which fails requests with ERR_NETWORK_CHANGED. Nothing was edited or launched. One limit applies to every Chromium citation: I read the source on GitHub `main`, not the Edge 154 branch, and I could not read issues.chromium.org because its pages render only with JavaScript.

What the local evidence shows

- The capture is `C:\Users\mikes\WebstormProjects\browser\tmp\codex\item15-failure-full-3.json`. Its lines 118-120 record the page as hidden, unfocused, and `readyState` complete.
- Two modules failed in that capture, `html` (line 485) and `markdown` (line 521). They are not `codec` and `sse`; in this run the failure struck a later import tier.
- Both started at 51.6 and 51.7 ms and both ended at the same instant, 51.9 ms. Each has `requestStart` 0, `transferSize` 0, `responseStatus` 0 and an empty `nextHopProtocol`. Neither request ever went out on the wire.
- The ten modules before them all answered 200 by 47.6 ms.
- Chrome does not cancel the remaining module downloads when one of them fails; it ignores their results (`NotifyModuleLoadFinished` in https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/loader/modulescript/module_tree_linker.cc).
- So the second failure is not a knock-on effect of the first. Two requests ending at the same instant before either was sent need one cause below the renderer.

Candidates ranked by fit

1. Socket-pool flush on a Windows IP address change (net::ERR_NETWORK_CHANGED). Best fit.
   - Mechanism: `NetworkChangeNotifierWin` listens with `NotifyAddrChange`. On every signal, `OnObjectSignaled` leads to `NotifyObserversOfIPAddressChange()`, with no filter for virtual or loopback adapters (https://raw.githubusercontent.com/chromium/chromium/main/net/base/network_change_notifier_win.cc).
   - In `TransportClientSocketPool::OnIPAddressChanged`, `FlushWithError(ERR_NETWORK_CHANGED)` runs `CancelAllConnectJobs`, `CloseIdleSockets` and `CancelAllRequestsWithError`. These cover every group, including 127.0.0.1 (https://raw.githubusercontent.com/chromium/chromium/main/net/socket/transport_client_socket_pool.cc).
   - The newer `HttpStreamPool::OnIPAddressChanged` does the same per group (https://raw.githubusercontent.com/chromium/chromium/main/net/http/http_stream_pool.cc).
   - The only exemption is `kMaintainConnectionsOnIpv6TempAddrChange`, enabled by default (https://raw.githubusercontent.com/chromium/chromium/main/net/base/features.cc). It applies only when the change type is `IP_ADDRESS_CHANGE_IPV6_TEMPADDR`, and the Windows notifier passes no change type.
   - `HttpNetworkTransaction` does not retry ERR_NETWORK_CHANGED; it only records it as a terminal state (https://raw.githubusercontent.com/chromium/chromium/main/net/http/http_network_transaction.cc).
   - Signature: every request still waiting for a socket or connect job at that instant fails together, before it is sent, and nothing retries it. Requests already reading from a socket complete. The failure does not depend on load, page visibility or the browser profile. Its rate follows host adapter activity (Wi-Fi, Hyper-V or WSL vEthernet, VPN), which matches a rate that moved by session.
   - Switch: the session parameter `ignore_ip_address_changes` exists and inverts `cleanup_on_ip_address_change` (https://raw.githubusercontent.com/chromium/chromium/main/net/http/http_network_session.cc). It does not appear in `services/network/network_context.cc` (https://raw.githubusercontent.com/chromium/chromium/main/services/network/network_context.cc). I found no command-line switch or policy that sets it.
   - Related tracker title (body unreadable): "Chromium aborts with ERR_NETWORK_CHANGED even when irrelevant network-interfaces change" (https://issues.chromium.org/issues/40175348).

2. Windows ephemeral port exhaustion (net::ERR_ADDRESS_IN_USE or ERR_NO_BUFFER_SPACE). Weak fit.
   - Chromium maps WSAEADDRINUSE to ERR_ADDRESS_IN_USE and WSAENOBUFS to ERR_NO_BUFFER_SPACE (https://raw.githubusercontent.com/chromium/chromium/main/net/base/net_errors_win.cc).
   - Windows takes outgoing ports from 49152-65535 by default (https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/default-dynamic-port-range-tcpip-chang).
   - Closed ports stay in TIME_WAIT for 4 minutes by default, and exhaustion logs System events 4227 and 4231 (https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcp-ip-port-exhaustion-troubleshooting).
   - Signature: an immediate connect failure that tracks host-wide load, including concurrent probe lanes.
   - Against it: exhaustion lasts minutes, so the next cases in the same run would fail as well. The capture shows the earlier cases passing (`order` array).
   - Switch: none in the browser. The remedies are fewer connections or a wider port range through `netsh`.

3. Network service crash or restart. Not verified. I did not read the source for this, so treat it as a hypothesis. It would also fail all in-flight requests at one instant, but browser-wide, and other targets would show losses.

4. Edge first-run, sync confirmation and sign-in. These explain why the page was hidden and unfocused, not why the requests were cancelled.
   - `HideFirstRunExperience` (Windows 80 and later) hides the first-run screens. The user stays signed in automatically when the Windows account is a Microsoft or Azure AD account, and is still prompted about sync. `SyncDisabled` or `ForceSync` controls that prompt (https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/hidefirstrunexperience).
   - `BrowserSignin` value 0 disables sign-in (https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/browsersignin).
   - All of these are machine-wide registry settings under `SOFTWARE\Policies\Microsoft\Edge`, so you would have to set them yourself.
   - `item15c` and the hidden-startup unit already showed that a hidden page alone does not reproduce the failure.

Ruled out by primary sources (low fit)

- **Local Network Access** (ships in Chrome 142): it checks only requests from a public network to a local or loopback address. A page on 127.0.0.1 loading from 127.0.0.1 is not checked (https://developer.chrome.com/blog/local-network-access). Edge 154 adds Local Network Access checks only to Background Fetch (https://learn.microsoft.com/en-us/microsoft-edge/web-platform/release-notes/154).
- **Edge Tracking Prevention**: it matches hosts against the disconnect.me lists, a match would recur on every run, and the console reports it (https://learn.microsoft.com/en-us/microsoft-edge/web-platform/tracking-prevention). 127.0.0.1 is not a tracker host.
- **SmartScreen**: it checks the reputation of visited sites and downloads, and stores the results locally, which is the `uriCache` seen in the profile (https://learn.microsoft.com/en-us/deployedge/microsoft-edge-security-smartscreen). The page names no checks on scripts loaded by a page.
- **Defender Network Protection**: it does not monitor Microsoft Edge on Windows and needs Windows 10 or 11 Pro or Enterprise (https://learn.microsoft.com/en-us/defender-endpoint/network-protection). This host runs Windows 11 Home.
- **Per-host and per-pool socket limits** (6 per group, 256 per pool; https://raw.githubusercontent.com/chromium/chromium/main/net/socket/client_socket_pool_manager.cc): hitting a limit queues a request, it does not fail it in 0.3 ms.
- **Edge 154 regressions**: the release notes name nothing about module loading or cancelled requests.
- **Efficiency mode, sleeping tabs and startup boost**: covered by the earlier `item15c` ruling, so I found nothing to add.

My opinion (not established by the evidence)

- Candidate 1 explains every captured fact with one event: two requests ending at the same instant, both unsent, the earlier modules completing, and a rate that moves by session rather than by load or instrumentation.
- The 0-of-4 instrumented and 0-of-6 net-log runs fall inside a stretch where 16 uninstrumented runs also passed. They say little about whether instrumentation hides the failure.
- Its weak point is that it needs address-change events often enough to have caught every full run on 2026-10-04. Whether a host adapter was changing state at that rate is the fact to verify.

Checks that would settle it

- After a run, read the Windows event log entries for adapter changes (NetworkProfile, Dhcp-Client and WLAN-AutoConfig) and match their timestamps to a failure.
- List the host's adapters (`ipconfig /all`) for Hyper-V, WSL or VPN interfaces.
- In a net log that catches a failure, look for the `NETWORK_IP_ADDRESSES_CHANGED` event and for ERR_NETWORK_CHANGED (-21) on a failed module request.
- For candidate 2, count connections by state (`Get-NetTCPConnection`) during a run and look for System events 4227 and 4231.
- If candidate 1 is confirmed: no browser flag disables the flush, so the fix belongs in the test harness or the host. Retries are excluded by the ROADMAP.
