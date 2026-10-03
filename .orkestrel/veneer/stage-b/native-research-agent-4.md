{
  "gaps": [
    {
      "key": "close-request-veto",
      "question": "Per WHATWG HTML §6.10.2 (close watcher establishment, canPreventClose, and the popover and dialog close-watcher cancelAction steps) and Chromium 153 source, can Escape or Android Back on an auto or hint popover, a closedby dialog, and a modal dialog be vetoed by the page, and under exactly which user-activation and grouping conditions is the cancel step skipped? This decides whether Bootstrap's cancelable hide.bs.dropdown, hide.bs.popover, hide.bs.modal, and hide.bs.offcanvas contract survives on native surfaces."
    },
    {
      "key": "153-default-flag-state",
      "question": "In Chromium 153.0.8010.12 with default flags, which of these disputed items are enabled at runtime: the full popover=hint model from whatwg/html PR 12345 (re-enable planned for M151), CSS interactivity: inert, focusgroup, interestfor with InterestEvent and ::interest-button, position-visibility anchors-visible and no-overflow (and the computed initial value), TransitionEvent.animation, document.activeViewTransition, ViewTransition.waitUntil, :target-before and :target-after, and dialog focusing steps per HTML PR 8199? The overlays report lists interactivity as shipped in 135 while the disclosure report says its flag status is unclear, and chromestatus status texts contradict release notes for several of these."
    },
    {
      "key": "native-scroll-lock",
      "question": "In Chromium 153, which native mechanism can lock page scroll while a modal dialog or offcanvas is open without Bootstrap's ScrollBarHelper padding: overflow:hidden on the root combined with scrollbar-gutter: stable (does innerWidth minus documentElement.clientWidth stay non-zero and double Bootstrap's compensation, and do .fixed-top and .sticky-top shift), html:has(dialog:modal) or :has(:popover-open) selectors, or overscroll-behavior: contain on the dialog and ::backdrop? No report examined a candidate that replaces the scroll lock itself."
    },
    {
      "key": "invoker-a11y-mapping",
      "question": "Does Chromium 153 (accessibility source under third_party/blink/renderer/modules/accessibility, and HTML-AAM) expose an implicit aria-expanded and aria-details on popovertarget, commandfor, and interestfor invokers, an expanded state on summary, and aria-modal on a showModal dialog, and does an author-set aria-expanded or aria-describedby (as Bootstrap writes) override or conflict with the implicit mapping?"
    },
    {
      "key": "alert-button-toast-native",
      "question": "Which native surfaces could carry Bootstrap's alert (close and closed.bs.alert after fade), button (data-bs-toggle=button with aria-pressed and .active), and toast (role=status or alert announcements) subjects in Chromium 153, specifically Element.ariaNotify() (chromestatus milestone and default state), live-region behavior of role=status inside a manual popover in the top layer, and any native pressed-toggle button? These three subjects received no candidate examination beyond custom -- commands and popover=manual."
    },
    {
      "key": "uncovered-dom-apis",
      "question": "For Bootstrap engine mechanisms no report examined, what do the specs and chromestatus say about Element.moveBefore() (state-preserving move for the tooltip container option and modal append-to-body), Element.checkVisibility() (Bootstrap's isVisible and isDisabled utilities), scrollIntoView({container}) (scrollspy smoothScroll and tab reveal), focus({focusVisible}) (focus-ring behavior when the focus trap or dialog moves focus), and ARIA element reflection (ariaControlsElements, ariaDescribedByElements across shadow boundaries): milestone, presence in 153, and the Bootstrap contract each would change?"
    }
  ]
}