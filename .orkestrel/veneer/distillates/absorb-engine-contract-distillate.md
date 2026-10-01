I'll read the brief and follow it exactly, then return only the document it specifies.The brief is a read-only distillate of two files. I'll read both completely, then write the document it specifies.The constants file and the types file are both in hand. The distillate follows the brief’s sections.# Old engine contract distillate

## Wire tables

| Constant | Component | What it holds (one sentence) | Bootstrap source it mirrors (as the file claims) | Citation |
| --- | --- | --- | --- | --- |
| `COLOR_MODE_ATTRIBUTES` | color mode | Holds `theme` as `data-bs-theme`. | the attribute Bootstrap's cascade reads | `tmp/mikesaintsg-veneer/src/browser/constants.ts:71` |
| `COLOR_MODE_KEY` | color mode | Holds the storage key `color-mode`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:76` |
| `BUTTON_EVENTS` | button | Holds `toggle` as `toggle.vn.button`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:79` |
| `BUTTON_CLASSES` | button | Holds `pressed` as `active`. | the token Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:84` |
| `BUTTON_SELECTORS` | button | Holds `trigger` as `[data-bs-toggle="button"]`. | Bootstrap's data-attribute selector | `tmp/mikesaintsg-veneer/src/browser/constants.ts:89` |
| `TARGET_ATTRIBUTE` | target | Holds `data-bs-target`. | Bootstrap's attribute name | `tmp/mikesaintsg-veneer/src/browser/constants.ts:94` |
| `COLLAPSE_EVENTS` | collapse | Holds `show` as `show.vn.collapse`, `shown` as `shown.vn.collapse`, `hide` as `hide.vn.collapse`, and `hidden` as `hidden.vn.collapse`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:97` |
| `COLLAPSE_CLASSES` | collapse | Holds `host` as `collapse`, `shown` as `show`, `transition` as `collapsing`, `horizontal` as `collapse-horizontal`, and `collapsed` as `collapsed`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:105` |
| `COLLAPSE_ATTRIBUTES` | collapse | Holds `target` as `data-bs-target` and `parent` as `data-bs-parent`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:114` |
| `COLLAPSE_SELECTORS` | collapse | Holds `trigger` as `[data-bs-toggle="collapse"]`. | Bootstrap's data-attribute selector | `tmp/mikesaintsg-veneer/src/browser/constants.ts:120` |
| `ALERT_EVENTS` | alert | Holds `close` as `close.vn.alert` and `closed` as `closed.vn.alert`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:125` |
| `ALERT_CLASSES` | alert | Holds `host` as `alert`, `shown` as `show`, `fade` as `fade`, and `disabled` as `disabled`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:131` |
| `ALERT_ATTRIBUTES` | alert | Holds `target` as `data-bs-target`. | Bootstrap's attribute name | `tmp/mikesaintsg-veneer/src/browser/constants.ts:139` |
| `ALERT_SELECTORS` | alert | Holds `dismiss` as `[data-bs-dismiss="alert"]`. | Bootstrap's data-attribute selector | `tmp/mikesaintsg-veneer/src/browser/constants.ts:144` |
| `TAB_EVENTS` | tab | Holds `show` as `show.vn.tab`, `shown` as `shown.vn.tab`, `hide` as `hide.vn.tab`, and `hidden` as `hidden.vn.tab`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:149` |
| `TAB_CLASSES` | tab | Holds `active` as `active`, `shown` as `show`, `fade` as `fade`, `disabled` as `disabled`, and `dropdown` as `dropdown`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:157` |
| `TAB_ATTRIBUTES` | tab | Holds `target` as `data-bs-target`. | Bootstrap's attribute name | `tmp/mikesaintsg-veneer/src/browser/constants.ts:166` |
| `TAB_SELECTORS` | tab | Holds `trigger` as `[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`, `list` as `.list-group, .nav, [role="tablist"]`, `wrapper` as `.nav-item`, `entry` as `.list-group-item`, `link` as `.nav-link, [role="tab"]`, `toggle` as `.dropdown-toggle`, and `menu` as `.dropdown-menu`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:171` |
| `SCROLL_SPY_EVENTS` | scrollspy | Holds `activate` as `activate.vn.scrollspy`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:182` |
| `SCROLL_SPY_CLASSES` | scrollspy | Holds `active` as `active`, `entry` as `dropdown-item`, and `disabled` as `disabled`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:187` |
| `SCROLL_SPY_ATTRIBUTES` | scrollspy | Holds `target` as `data-bs-target`, `margin` as `data-bs-root-margin`, `threshold` as `data-bs-threshold`, and `smooth` as `data-bs-smooth-scroll`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:194` |
| `SCROLL_SPY_SELECTORS` | scrollspy | Holds `host` as `[data-bs-spy="scroll"]`, `list` as `.nav, .list-group`, `parent` as `.nav-link, .nav-item > .nav-link, .list-group-item`, `dropdown` as `.dropdown`, and `toggle` as `.dropdown-toggle`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:202` |
| `SCROLL_SPY_DEFAULTS` | scrollspy | Holds `smooth` as `false` and `intersection` as margin `0px 0px -25%` with threshold `[0.1, 0.5, 1]`. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:211` |
| `DROPDOWN_EVENTS` | dropdown | Holds `show` as `show.vn.dropdown`, `shown` as `shown.vn.dropdown`, `hide` as `hide.vn.dropdown`, and `hidden` as `hidden.vn.dropdown`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:219` |
| `DROPDOWN_CLASSES` | dropdown | Holds `shown` as `show`, `disabled` as `disabled`, `up` as `dropup`, `end` as `dropend`, `start` as `dropstart`, and `center` as `down` `dropdown-center` and `up` `dropup-center`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:227` |
| `DROPDOWN_ATTRIBUTES` | dropdown | Holds `dismiss` as `data-bs-auto-close`, `offset` as `data-bs-offset`, `static` as `data-bs-display`, `reference` as `data-bs-reference`, `popper` as `data-bs-popper`, and `side` as `data-popper-placement`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:237` |
| `DROPDOWN_SELECTORS` | dropdown | Holds `trigger` as `[data-bs-toggle="dropdown"]`, `menu` as `.dropdown-menu`, `navbar` as `.navbar`, and `entry` as `.dropdown-item`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:247` |
| `DROPDOWN_DEFAULTS` | dropdown | Holds `dismiss` as `inside` true and `outside` true, and `placement` as offset `[0, 2]` and `static` false. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:255` |
| `PLACEMENT_ATTRIBUTES` | placement | Holds `popper` as `data-bs-popper` and `side` as `data-popper-placement`. | the attribute names Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:261` |
| `PLACEMENT_DEFAULTS` | placement | Holds `position` as `bottom`, `offset` as `[0, 0]`, and `static` as false. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:267` |
| `PLACEMENT_AREAS` | placement | Holds `auto` as `bottom`, `top` as `top`, `top-start` as `top span-right`, `top-end` as `top span-left`, `right` as `right`, `right-start` as `right span-bottom`, `right-end` as `right span-top`, `bottom` as `bottom`, `bottom-start` as `bottom span-right`, `bottom-end` as `bottom span-left`, `left` as `left`, `left-start` as `left span-bottom`, and `left-end` as `left span-top`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:276` |
| `POPOVER_PROPERTIES` | placement | Holds the inline properties `border-top-width`, `border-right-width`, `border-bottom-width`, `border-left-width`, `border-top-style`, `border-right-style`, `border-bottom-style`, `border-left-style`, `border-top-color`, `border-right-color`, `border-bottom-color`, `border-left-color`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, `background-color`, `color`, `overflow-x`, and `overflow-y`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:293` |
| `CAROUSEL_EVENTS` | carousel | Holds `slide` as `slide.vn.carousel` and `slid` as `slid.vn.carousel`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:317` |
| `CAROUSEL_CLASSES` | carousel | Holds `host` as `carousel`, `active` as `active`, `slide` as `slide`, `start` as `carousel-item-start`, `end` as `carousel-item-end`, `next` as `carousel-item-next`, `previous` as `carousel-item-prev`, and `pointer` as `pointer-event`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:323` |
| `CAROUSEL_ATTRIBUTES` | carousel | Holds `target` as `data-bs-target`, `step` as `data-bs-slide`, `index` as `data-bs-slide-to`, `ride` as `data-bs-ride`, `interval` as `data-bs-interval`, `keyboard` as `data-bs-keyboard`, `pause` as `data-bs-pause`, `touch` as `data-bs-touch`, and `wrap` as `data-bs-wrap`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:335` |
| `CAROUSEL_SELECTORS` | carousel | Holds `entry` as `.carousel-item`, `image` as `img`, and `indicators` as `.carousel-indicators`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:348` |
| `CAROUSEL_DEFAULTS` | carousel | Holds `interval` as `5000`, `keyboard` as true, `pause` as true, `touch` as true, and `wrap` as true. | Bootstrap's defaults with hover pausing as `true` | `tmp/mikesaintsg-veneer/src/browser/constants.ts:355` |
| `CAROUSEL_TOUCH_DELAY` | carousel | Holds `500` milliseconds. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:366` |
| `SWIPE_CLASSES` | swipe | Holds `pointer` as `pointer-event`. | the token Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:369` |
| `SWIPE_DEFAULTS` | swipe | Holds `threshold` as `40`. | Bootstrap's swipe threshold in pixels | `tmp/mikesaintsg-veneer/src/browser/constants.ts:374` |
| `BACKDROP_CLASSES` | backdrop | Holds `host` as `modal-backdrop`, `shown` as `show`, and `fade` as `fade`. | the tokens Bootstrap's cascade selects on for a modal's backdrop | `tmp/mikesaintsg-veneer/src/browser/constants.ts:378` |
| `SCROLL_LOCK_SELECTORS` | scroll lock | Holds `fixed` as `.fixed-top, .fixed-bottom, .is-fixed` and `sticky` as `.sticky-top`. | Bootstrap's fixed and sticky selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:385` |
| `MODAL_EVENTS` | modal | Holds `show` as `show.vn.modal`, `shown` as `shown.vn.modal`, `hide` as `hide.vn.modal`, `hidden` as `hidden.vn.modal`, and `prevent` as `prevent.vn.modal`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:391` |
| `MODAL_CLASSES` | modal | Holds `host` as `modal`, `shown` as `show`, `fade` as `fade`, `static` as `modal-static`, `open` as `modal-open`, `backdrop` as `modal-backdrop`, and `disabled` as `disabled`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:400` |
| `MODAL_ATTRIBUTES` | modal | Holds `target` as `data-bs-target`, `backdrop` as `data-bs-backdrop`, `escape` as `data-bs-keyboard`, and `focus` as `data-bs-focus`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:411` |
| `MODAL_SELECTORS` | modal | Holds `trigger` as `[data-bs-toggle="modal"]`, `dismiss` as `[data-bs-dismiss="modal"]`, `dialog` as `.modal-dialog`, `body` as `.modal-body`, `fixed` as `.fixed-top, .fixed-bottom, .is-fixed`, and `sticky` as `.sticky-top`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:419` |
| `MODAL_DEFAULTS` | modal | Holds `backdrop` as true, `dismiss` as `backdrop` true and `escape` true, and `focus` as true. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:429` |
| `TOAST_EVENTS` | toast | Holds `show` as `show.vn.toast`, `shown` as `shown.vn.toast`, `hide` as `hide.vn.toast`, and `hidden` as `hidden.vn.toast`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:438` |
| `TOAST_CLASSES` | toast | Holds `host` as `toast`, `shown` as `show`, `transition` as `showing`, `fade` as `fade`, and `disabled` as `disabled`. | the tokens Bootstrap's cascade and data API use | `tmp/mikesaintsg-veneer/src/browser/constants.ts:446` |
| `TOAST_ATTRIBUTES` | toast | Holds `animated` as `data-bs-animation`, `autohide` as `data-bs-autohide`, `delay` as `data-bs-delay`, and `target` as `data-bs-target`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:455` |
| `TOAST_SELECTORS` | toast | Holds `dismiss` as `[data-bs-dismiss="toast"]`. | Bootstrap's data-attribute selector | `tmp/mikesaintsg-veneer/src/browser/constants.ts:463` |
| `TOAST_DEFAULTS` | toast | Holds `animated` as true, `autohide` as true, and `delay` as `5000`. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:468` |
| `OFFCANVAS_EVENTS` | offcanvas | Holds `show` as `show.vn.offcanvas`, `shown` as `shown.vn.offcanvas`, `hide` as `hide.vn.offcanvas`, `hidden` as `hidden.vn.offcanvas`, and `prevent` as `prevent.vn.offcanvas`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:476` |
| `OFFCANVAS_CLASSES` | offcanvas | Holds `host` as `offcanvas`, `shown` as `show`, `showing` as `showing`, `hiding` as `hiding`, `backdrop` as `offcanvas-backdrop`, `fade` as `fade`, and `disabled` as `disabled`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:485` |
| `OFFCANVAS_ATTRIBUTES` | offcanvas | Holds `target` as `data-bs-target`, `backdrop` as `data-bs-backdrop`, `escape` as `data-bs-keyboard`, and `scroll` as `data-bs-scroll`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:496` |
| `OFFCANVAS_SELECTORS` | offcanvas | Holds `trigger` as `[data-bs-toggle="offcanvas"]` and `dismiss` as `[data-bs-dismiss="offcanvas"]`. | Bootstrap's data-attribute selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:504` |
| `OFFCANVAS_DEFAULTS` | offcanvas | Holds `backdrop` as true, `dismiss` as `backdrop` true and `escape` true, and `scroll` as false. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:510` |
| `TOOLTIP_EVENTS` | tooltip | Holds `show` as `show.vn.tooltip`, `shown` as `shown.vn.tooltip`, `hide` as `hide.vn.tooltip`, `hidden` as `hidden.vn.tooltip`, and `inserted` as `inserted.vn.tooltip`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:519` |
| `TOOLTIP_CLASSES` | tooltip | Holds `shown` as `show`, `fade` as `fade`, `auto` as `bs-tooltip-auto`, and `modal` as `modal`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:528` |
| `TOOLTIP_ATTRIBUTES` | tooltip | Holds `animated` as `data-bs-animation`, `delay` as `data-bs-delay`, `trigger` as `data-bs-trigger`, `title` as `data-bs-title`, `html` as `data-bs-html`, `template` as `data-bs-template`, `class` as `data-bs-custom-class`, `container` as `data-bs-container`, `position` as `data-bs-placement`, `offset` as `data-bs-offset`, `fallbacks` as `data-bs-fallback-placements`, `descendants` as `data-bs-selector`, and `side` as `data-popper-placement`. | Bootstrap's attribute names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:536` |
| `TOOLTIP_SELECTORS` | tooltip | Holds `title` as `.tooltip-inner` and `arrow` as `.tooltip-arrow`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:553` |
| `TOOLTIP_TEMPLATE` | tooltip | Holds `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`. | Bootstrap's tooltip template | `tmp/mikesaintsg-veneer/src/browser/constants.ts:559` |
| `TOOLTIP_DEFAULTS` | tooltip | Holds `animated` true, `delay` show `0` and hide `0`, `trigger` hover true, focus true, and click false, `html` false, `tip.template` as `TOOLTIP_TEMPLATE`, and `placement` position `top`, offset `[0, 6]`, fallbacks `top`, `right`, `bottom`, `left`. | Bootstrap's defaults | `tmp/mikesaintsg-veneer/src/browser/constants.ts:563` |
| `POPOVER_EVENTS` | popover | Holds `show` as `show.vn.popover`, `shown` as `shown.vn.popover`, `hide` as `hide.vn.popover`, `hidden` as `hidden.vn.popover`, and `inserted` as `inserted.vn.popover`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:577` |
| `POPOVER_CLASSES` | popover | Holds `shown` as `show`, `fade` as `fade`, `auto` as `bs-popover-auto`, and `modal` as `modal`. | the tokens Bootstrap's cascade selects on | `tmp/mikesaintsg-veneer/src/browser/constants.ts:586` |
| `POPOVER_ATTRIBUTES` | popover | Holds every `TOOLTIP_ATTRIBUTES` key plus `content` as `data-bs-content`. | Bootstrap's names | `tmp/mikesaintsg-veneer/src/browser/constants.ts:594` |
| `POPOVER_SELECTORS` | popover | Holds `title` as `.popover-header`, `content` as `.popover-body`, and `arrow` as `.popover-arrow`. | Bootstrap's selectors | `tmp/mikesaintsg-veneer/src/browser/constants.ts:600` |
| `POPOVER_TEMPLATE` | popover | Holds `<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`. | Bootstrap's popover template | `tmp/mikesaintsg-veneer/src/browser/constants.ts:607` |
| `POPOVER_DEFAULTS` | popover | Holds the tooltip defaults with `trigger` hover false, focus false, and click true, `tip.template` as `POPOVER_TEMPLATE`, and `placement` position `right`, offset `[0, 8]`, fallbacks `top`, `right`, `bottom`, `left`. | Bootstrap's popover click trigger, template, position, and offset | `tmp/mikesaintsg-veneer/src/browser/constants.ts:611` |
| `SANITIZER_ALLOWLIST` | sanitizer | Holds elements `a` (attributes `target`, `href`, `title`, `rel`), `area`, `b`, `br`, `col`, `code`, `dd`, `div`, `dl`, `dt`, `em`, `hr`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `i`, `img` (attributes `src`, `srcset`, `alt`, `title`, `width`, `height`), `li`, `ol`, `p`, `pre`, `s`, `small`, `span`, `sub`, `sup`, `strong`, `u`, and `ul`, plus global attributes `class`, `dir`, `id`, `lang`, `role`, `aria-actions`, `aria-activedescendant`, `aria-atomic`, `aria-autocomplete`, `aria-braillelabel`, `aria-brailleroledescription`, `aria-busy`, `aria-checked`, `aria-colcount`, `aria-colindex`, `aria-colindextext`, `aria-colspan`, `aria-controls`, `aria-current`, `aria-describedby`, `aria-description`, `aria-details`, `aria-disabled`, `aria-dropeffect`, `aria-errormessage`, `aria-expanded`, `aria-flowto`, `aria-grabbed`, `aria-haspopup`, `aria-hidden`, `aria-invalid`, `aria-keyshortcuts`, `aria-label`, `aria-labelledby`, `aria-level`, `aria-live`, `aria-modal`, `aria-multiline`, `aria-multiselectable`, `aria-orientation`, `aria-owns`, `aria-placeholder`, `aria-posinset`, `aria-pressed`, `aria-readonly`, `aria-relevant`, `aria-required`, `aria-roledescription`, `aria-rowcount`, `aria-rowindex`, `aria-rowindextext`, `aria-rowspan`, `aria-selected`, `aria-setsize`, `aria-sort`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, and `aria-valuetext`, with `dataAttributes` false. | Bootstrap's `DefaultAllowlist` | `tmp/mikesaintsg-veneer/src/browser/constants.ts:632` |
| `SANITIZER_NAMESPACE` | sanitizer | Holds `http://www.w3.org/1999/xhtml`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:741` |
| `SANITIZER_MATHML_NAMESPACE` | sanitizer | Holds `http://www.w3.org/1998/Math/MathML`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:746` |
| `SANITIZER_SVG_NAMESPACE` | sanitizer | Holds `http://www.w3.org/2000/svg`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:751` |
| `SANITIZER_BASELINE` | sanitizer | Holds HTML elements `base`, `embed`, `frame`, `iframe`, `object`, and `script`, SVG elements `script` and `use`, handler prefix `on`, URL attributes `action`, `formaction`, `href`, and `xlink:href`, and SVG animation elements `animate`, `animateMotion`, `animateTransform`, and `set`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:763` |
| `SANITIZER_SVG_INTEGRATIONS` | sanitizer | Holds `foreignObject`, `desc`, and `title`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:794` |
| `SANITIZER_ENCODINGS` | sanitizer | Holds `text/html` and `application/xhtml+xml`. | none | `tmp/mikesaintsg-veneer/src/browser/constants.ts:807` |

## Contracts

| Interface | Members (names only, comma-separated) | Events (map keys) | Option paths (top-level keys and their grouped leaves) | Citation |
| --- | --- | --- | --- | --- |
| `ColorModeAttributeMap` | theme | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:7` |
| `ColorModeOptions` | root, storage, attributes | none | root, storage, attributes | `tmp/mikesaintsg-veneer/src/browser/types.ts:13` |
| `ColorModeInterface` | root, mode, apply, toggle, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:23` |
| `ButtonDetail` | pressed | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:37` |
| `ButtonEventMap` | toggle | toggle | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:42` |
| `ButtonHooks` | toggle | toggle | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:48` |
| `ButtonClassMap` | pressed | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:51` |
| `ButtonSelectorMap` | trigger | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:57` |
| `ButtonOptions` | classes, selectors, on, signal | none | classes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:63` |
| `ButtonInterface` | host, pressed, toggle, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:75` |
| `ButtonVocabulary` | classes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:87` |
| `CollapseVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:95` |
| `AlertVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:105` |
| `TabVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:115` |
| `DropdownVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:125` |
| `CarouselVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:135` |
| `ModalVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:145` |
| `OffcanvasVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:155` |
| `ToastVocabulary` | classes, attributes, selectors | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:165` |
| `DelegateOptions` | root, button, collapse, dropdown, tab, scrollspy, modal, offcanvas, alert, toast, carousel | none | root, button (classes, selectors), collapse (classes, attributes, selectors), dropdown (classes, attributes, selectors), tab (classes, attributes, selectors), scrollspy (classes, attributes, selectors), modal (classes, attributes, selectors), offcanvas (classes, attributes, selectors), alert (classes, attributes, selectors), toast (classes, attributes, selectors), carousel (classes, attributes, selectors) | `tmp/mikesaintsg-veneer/src/browser/types.ts:183` |
| `DelegateInterface` | root, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:209` |
| `EventHooks` | none | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:224` |
| `EventWire` | none | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:245` |
| `RelatedDetail` | relatedTarget | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:250` |
| `AttributeMap` | none | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:267` |
| `ParserMap` | none | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:278` |
| `RegistryOptions` | code | none | code | `tmp/mikesaintsg-veneer/src/browser/types.ts:281` |
| `RegistryInterface` | claim, find, release | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:291` |
| `LifetimeInterface` | signal, hold, release, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:337` |
| `LifetimeHolding` | record, release | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:393` |
| `HostSnapshotTarget` | category, element, name | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:404` |
| `HostWrite` | target, value, priority | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:414` |
| `HostSnapshotInterface` | save, write, restore, clear | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:424` |
| `HostSnapshotEntry` | target, key | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:527` |
| `HostSnapshotRecord` | value, priority, holders, owner, written | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:535` |
| `HostSnapshotHolding` | element, attribute | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:549` |
| `HostSnapshotPresence` | present, holders | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:557` |
| `IsolationOptions` | trigger, spare, signal | none | trigger, spare, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:565` |
| `IsolationInterface` | host, trigger, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:575` |
| `BackdropClassMap` | host, shown, fade | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:594` |
| `BackdropOptions` | classes, parent, animated | none | classes, parent, animated | `tmp/mikesaintsg-veneer/src/browser/types.ts:604` |
| `BackdropInterface` | element, show, hide, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:614` |
| `ScrollLockSelectorMap` | fixed, sticky | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:661` |
| `ScrollLockOptions` | document, selectors, signal | none | document, selectors, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:669` |
| `ScrollLockInterface` | document, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:679` |
| `PlacementAttributeMap` | popper, side | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:716` |
| `PlacementOptions` | attributes, position, offset, fallbacks, static, signal, owned | none | attributes, position, offset, fallbacks, static, signal, owned | `tmp/mikesaintsg-veneer/src/browser/types.ts:724` |
| `PlacementInput` | reference, element, popover, arrow | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:742` |
| `PlacementInterface` | reference, element, side, update, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:754` |
| `SwipeClassMap` | pointer | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:785` |
| `SwipeOptions` | handler, threshold, classes | none | handler, threshold, classes | `tmp/mikesaintsg-veneer/src/browser/types.ts:791` |
| `SwipeInterface` | host, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:801` |
| `SanitizerInterface` | write | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:816` |
| `ConfigSanitizerOptions` | config | none | config | `tmp/mikesaintsg-veneer/src/browser/types.ts:835` |
| `SanitizerElementNamespace` | name, namespace | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:848` |
| `SanitizerBaseline` | elements, handlers, urls, animations | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:870` |
| `SanitizerElementNamespaceWithAttributes` | name, attributes | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:890` |
| `SanitizerConfig` | elements, attributes, dataAttributes | none | elements, attributes, dataAttributes | `tmp/mikesaintsg-veneer/src/browser/types.ts:904` |
| `SetHTMLOptions` | sanitizer | none | sanitizer | `tmp/mikesaintsg-veneer/src/browser/types.ts:922` |
| `SanitizeTargetInterface` | setHTML | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:934` |
| `CollapseEventMap` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:952` |
| `CollapseHooks` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:964` |
| `CollapseClassMap` | host, shown, transition, horizontal, collapsed | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:967` |
| `CollapseAttributeMap` | target, parent | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:981` |
| `CollapseSelectorMap` | trigger | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:989` |
| `CollapseOptions` | parent, classes, attributes, selectors, on, signal | none | parent, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:995` |
| `CollapseInterface` | host, shown, show, hide, toggle, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1011` |
| `DropdownDetail` | click | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1059` |
| `DropdownEventMap` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1065` |
| `DropdownHooks` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1077` |
| `DropdownClassMap` | shown, disabled, up, end, start, center (down, up) | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1080` |
| `DropdownAttributeMap` | dismiss, offset, static, reference, popper, side | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1101` |
| `DropdownSelectorMap` | trigger, menu, navbar, entry | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1117` |
| `DropdownOptions` | dismiss, placement, reference, classes, attributes, selectors, on, signal | none | dismiss (inside, outside), placement (offset, static), reference, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1129` |
| `DropdownDefaults` | dismiss, placement | none | dismiss (inside, outside), placement (offset, static) | `tmp/mikesaintsg-veneer/src/browser/types.ts:1159` |
| `DropdownInterface` | host, menu, shown, show, hide, toggle, update, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1177` |
| `TabEventMap` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1235` |
| `TabHooks` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1247` |
| `TabClassMap` | active, shown, fade, disabled, dropdown | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1250` |
| `TabAttributeMap` | target | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1264` |
| `TabSelectorMap` | trigger, list, wrapper, entry, link, toggle, menu | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1270` |
| `TabOptions` | classes, attributes, selectors, on, signal | none | classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1288` |
| `TabInitialWrite` | element, name, value | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1302` |
| `TabDropdown` | wrapper, toggle, menu | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1312` |
| `TabInterface` | host, pane, active, show, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1322` |
| `ScrollSpyDetail` | relatedTarget | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1351` |
| `ScrollSpyEventMap` | activate | activate | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1357` |
| `ScrollSpyHooks` | activate | activate | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1363` |
| `ScrollSpyClassMap` | active, entry, disabled | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1366` |
| `ScrollSpyAttributeMap` | target, margin, threshold, smooth | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1376` |
| `ScrollSpySelectorMap` | host, list, parent, dropdown, toggle | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1388` |
| `ScrollSpyOptions` | target, smooth, intersection, classes, attributes, selectors, on, signal | none | target, smooth, intersection (margin, threshold), classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1402` |
| `ScrollSpyInterface` | host, target, link, refresh, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1427` |
| `DismissOptions` | backdrop, escape | none | backdrop, escape | `tmp/mikesaintsg-veneer/src/browser/types.ts:1455` |
| `ModalEventMap` | show, shown, hide, hidden, prevent | show, shown, hide, hidden, prevent | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1463` |
| `ModalHooks` | show, shown, hide, hidden, prevent | show, shown, hide, hidden, prevent | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1477` |
| `ModalClassMap` | host, shown, fade, static, open, backdrop, disabled | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1480` |
| `ModalAttributeMap` | target, backdrop, escape, focus | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1498` |
| `ModalSelectorMap` | trigger, dismiss, dialog, body, fixed, sticky | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1510` |
| `ModalOptions` | backdrop, dismiss, focus, classes, attributes, selectors, on, signal | none | backdrop, dismiss (backdrop, escape), focus, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1526` |
| `ModalInterface` | host, shown, show, hide, toggle, update, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1546` |
| `OffcanvasEventMap` | show, shown, hide, hidden, prevent | show, shown, hide, hidden, prevent | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1604` |
| `OffcanvasHooks` | show, shown, hide, hidden, prevent | show, shown, hide, hidden, prevent | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1618` |
| `OffcanvasClassMap` | host, shown, showing, hiding, backdrop, fade, disabled | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1621` |
| `OffcanvasAttributeMap` | target, backdrop, escape, scroll | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1639` |
| `OffcanvasSelectorMap` | trigger, dismiss | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1651` |
| `OffcanvasOptions` | backdrop, dismiss, scroll, classes, attributes, selectors, on, signal | none | backdrop, dismiss (backdrop, escape), scroll, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1659` |
| `OffcanvasInterface` | host, shown, show, hide, toggle, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1686` |
| `TooltipEventMap` | show, shown, hide, hidden, inserted | show, shown, hide, hidden, inserted | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1735` |
| `TooltipHooks` | show, shown, hide, hidden, inserted | show, shown, hide, hidden, inserted | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1749` |
| `TooltipClassMap` | shown, fade, auto, modal | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1752` |
| `TooltipAttributeMap` | animated, delay, trigger, title, html, template, class, container, position, offset, fallbacks, descendants, side | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1764` |
| `TooltipSelectorMap` | title, arrow | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1794` |
| `TooltipOptions` | animated, delay, trigger, title, html, tip, container, placement, sanitizer, descendants, classes, attributes, selectors, on, signal | none | animated, delay (show, hide), trigger (hover, focus, click), title, html, tip (template, class), container, placement (position, offset, fallbacks), sanitizer, descendants, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:1802` |
| `TooltipDefaults` | animated, delay, trigger, html, tip, placement | none | animated, delay (show, hide), trigger (hover, focus, click), html, tip (template), placement (position, offset, fallbacks) | `tmp/mikesaintsg-veneer/src/browser/types.ts:1860` |
| `TooltipProfile` | name, events, classes, attributes, selectors, defaults, popover | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1909` |
| `TooltipInterface` | host, shown, enabled, show, hide, toggle, enable, disable, fill, update, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:1927` |
| `PopoverEventMap` | show, shown, hide, hidden, inserted | show, shown, hide, hidden, inserted | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2041` |
| `PopoverHooks` | show, shown, hide, hidden, inserted | show, shown, hide, hidden, inserted | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2055` |
| `PopoverClassMap` | shown, fade, auto, modal | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2058` |
| `PopoverAttributeMap` | animated, delay, trigger, title, html, template, class, container, position, offset, fallbacks, descendants, side, content | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2064` |
| `PopoverSelectorMap` | title, content, arrow | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2070` |
| `PopoverOptions` | animated, delay, trigger, title, html, tip, container, placement, sanitizer, descendants, classes, attributes, selectors, on, signal, content | none | animated, delay (show, hide), trigger (hover, focus, click), title, html, tip (template, class), container, placement (position, offset, fallbacks), sanitizer, descendants, classes, attributes, selectors, on, signal, content | `tmp/mikesaintsg-veneer/src/browser/types.ts:2088` |
| `PopoverInterface` | host, shown, enabled, show, hide, toggle, enable, disable, fill, update, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2102` |
| `AlertEventMap` | close, closed | close, closed | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2216` |
| `AlertHooks` | close, closed | close, closed | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2224` |
| `AlertClassMap` | host, shown, fade, disabled | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2227` |
| `AlertAttributeMap` | target | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2239` |
| `AlertSelectorMap` | dismiss | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2245` |
| `AlertOptions` | classes, attributes, selectors, on, signal | none | classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:2251` |
| `AlertInterface` | host, close, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2265` |
| `ToastEventMap` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2290` |
| `ToastHooks` | show, shown, hide, hidden | show, shown, hide, hidden | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2302` |
| `ToastClassMap` | host, shown, transition, fade, disabled | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2305` |
| `ToastAttributeMap` | animated, autohide, delay, target | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2319` |
| `ToastSelectorMap` | dismiss | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2331` |
| `ToastOptions` | animated, autohide, delay, classes, attributes, selectors, on, signal | none | animated, autohide, delay, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:2337` |
| `ToastInterface` | host, shown, show, hide, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2357` |
| `CarouselDetail` | relatedTarget, direction, from, to | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2394` |
| `CarouselEventMap` | slide, slid | slide, slid | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2406` |
| `CarouselHooks` | slide, slid | slide, slid | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2414` |
| `CarouselClassMap` | host, active, slide, start, end, next, previous, pointer | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2420` |
| `CarouselAttributeMap` | target, step, index, ride, interval, keyboard, pause, touch, wrap | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2440` |
| `CarouselSelectorMap` | entry, image, indicators | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2462` |
| `CarouselOptions` | interval, keyboard, pause, ride, touch, wrap, classes, attributes, selectors, on, signal | none | interval, keyboard, pause, ride, touch, wrap, classes, attributes, selectors, on, signal | `tmp/mikesaintsg-veneer/src/browser/types.ts:2472` |
| `CarouselInterface` | host, index, next, previous, slide, start, pause, destroy | none | none | `tmp/mikesaintsg-veneer/src/browser/types.ts:2498` |

## Shared shapes

- The `on` hook is carried by `ButtonOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:69`), `CollapseOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1005`), `DropdownOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1153`), `TabOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1296`), `ScrollSpyOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1421`), `ModalOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1540`), `OffcanvasOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1673`), `TooltipOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1854`), `PopoverOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2098`), `AlertOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2259`), `ToastOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2351`), and `CarouselOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2492`).
- The `signal` option is carried by `ButtonOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:71`), `CollapseOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1007`), `DropdownOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1155`), `TabOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1298`), `ScrollSpyOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1423`), `ModalOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1542`), `OffcanvasOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1675`), `TooltipOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1856`), `PopoverOptions` through `TooltipOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2088`), `AlertOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2261`), `ToastOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2353`), `CarouselOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2494`), `IsolationOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:571`), `ScrollLockOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:674`), and `PlacementOptions` (`tmp/mikesaintsg-veneer/src/browser/types.ts:736`).
- `find` is the instance method on `RegistryInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:314`).
- `destroy` is carried by `ColorModeInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:33`), `ButtonInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:83`), `DelegateInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:212`), `LifetimeInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:389`), `IsolationInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:590`), `BackdropInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:657`), `ScrollLockInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:693`), `PlacementInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:778`), `SwipeInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:812`), `CollapseInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1055`), `DropdownInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1230`), `TabInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1347`), `ScrollSpyInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1450`), `ModalInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1600`), `OffcanvasInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1731`), `TooltipInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2037`), `PopoverInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2212`), `AlertInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2286`), `ToastInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2390`), and `CarouselInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2562`).
- `Promise<boolean>` change methods are `BackdropInterface.show` and `BackdropInterface.hide` (`tmp/mikesaintsg-veneer/src/browser/types.ts:634`, `tmp/mikesaintsg-veneer/src/browser/types.ts:648`), `CollapseInterface.show`, `CollapseInterface.hide`, and `CollapseInterface.toggle` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1025`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1035`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1045`), `DropdownInterface.show`, `DropdownInterface.hide`, and `DropdownInterface.toggle` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1193`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1203`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1212`), `TabInterface.show` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1338`), `ModalInterface.show`, `ModalInterface.hide`, and `ModalInterface.toggle` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1561`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1570`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1582`), `OffcanvasInterface.show`, `OffcanvasInterface.hide`, and `OffcanvasInterface.toggle` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1701`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1710`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1722`), `TooltipInterface.show`, `TooltipInterface.hide`, `TooltipInterface.toggle`, and `TooltipInterface.fill` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1964`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1980`, `tmp/mikesaintsg-veneer/src/browser/types.ts:1990`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2019`), `PopoverInterface.show`, `PopoverInterface.hide`, `PopoverInterface.toggle`, and `PopoverInterface.fill` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2139`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2155`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2165`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2194`), `AlertInterface.close` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2277`), `ToastInterface.show` and `ToastInterface.hide` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2371`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2381`), and `CarouselInterface.next`, `CarouselInterface.previous`, and `CarouselInterface.slide` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2512`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2522`, `tmp/mikesaintsg-veneer/src/browser/types.ts:2533`).
- The `shown` getter is carried by `CollapseInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1015`), `DropdownInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1183`), `ModalInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1550`), `OffcanvasInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1690`), `TooltipInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1931`), `PopoverInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2106`), and `ToastInterface` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2361`).

## Departures the TSDoc records

- `EventWire` rejects Bootstrap's own wire name; each name is its key, the `.vn.` namespace, and the entity name (`tmp/mikesaintsg-veneer/src/browser/types.ts:233`).
- `PlacementOptions.position` mirrors Bootstrap's `placement` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:727`).
- `PlacementOptions.fallbacks` mirrors Bootstrap's `fallbackPlacements` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:731`).
- `PlacementOptions.static` mirrors Bootstrap's `display: 'static'` (`tmp/mikesaintsg-veneer/src/browser/types.ts:733`).
- `DropdownAttributeMap.dismiss` feeds the `dismiss` option, Bootstrap's `autoClose` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1102`).
- `DropdownAttributeMap.static` feeds `placement.static`, Bootstrap's `display` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1106`).
- `DropdownOptions.dismiss` mirrors Bootstrap's `autoClose` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1130`).
- `DropdownOptions.placement.static` mirrors Bootstrap's `display: 'static'` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1141`).
- `ScrollSpyAttributeMap.margin` feeds `intersection.margin`, Bootstrap's `rootMargin` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1379`).
- `ScrollSpyAttributeMap.smooth` feeds the `smooth` option, Bootstrap's `smoothScroll` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1383`).
- `ScrollSpyOptions.smooth` mirrors Bootstrap's `smoothScroll` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1405`).
- `ScrollSpyOptions.intersection.margin` mirrors Bootstrap's `rootMargin` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1409`).
- `DismissOptions.backdrop` false mirrors Bootstrap's `backdrop: 'static'` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1456`).
- `DismissOptions.escape` mirrors Bootstrap's `keyboard: false` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1458`).
- `ModalAttributeMap.escape` feeds `dismiss.escape`, Bootstrap's `keyboard` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1503`).
- `OffcanvasAttributeMap.escape` feeds `dismiss.escape`, Bootstrap's `keyboard` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1644`).
- `TooltipAttributeMap.animated` feeds the `animated` option, Bootstrap's `animation` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1765`).
- `TooltipAttributeMap.class` feeds `tip.class`, Bootstrap's `customClass` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1777`).
- `TooltipAttributeMap.position` feeds `placement.position`, Bootstrap's `placement` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1781`).
- `TooltipAttributeMap.fallbacks` feeds `placement.fallbacks`, Bootstrap's `fallbackPlacements` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1785`).
- `TooltipAttributeMap.descendants` feeds the `descendants` option, Bootstrap's `selector` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1787`).
- `TooltipOptions.animated` mirrors Bootstrap's `animation` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1803`).
- `TooltipOptions.trigger` with hover, focus, and click all false is Bootstrap's `manual` (`tmp/mikesaintsg-veneer/src/browser/types.ts:1812`).
- A tooltip with `descendants` set leaves the trigger's `title` attribute unread (`tmp/mikesaintsg-veneer/src/browser/types.ts:1821`).
- `TooltipOptions.tip.class` mirrors Bootstrap's `customClass` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1829`).
- `TooltipOptions.placement.position` mirrors Bootstrap's `placement` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1836`).
- `TooltipOptions.placement.fallbacks` mirrors Bootstrap's `fallbackPlacements` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1840`).
- `TooltipOptions.descendants` mirrors Bootstrap's `selector` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:1845`).
- Bootstrap's `show` runs again while a tooltip change is in flight; this contract resolves false there (`tmp/mikesaintsg-veneer/src/browser/types.ts:1940`).
- Bootstrap throws for a tooltip trigger whose inline `display` is `none`; this contract resolves false there (`tmp/mikesaintsg-veneer/src/browser/types.ts:1941`).
- Bootstrap's `show` runs again while a popover change is in flight; this contract resolves false there (`tmp/mikesaintsg-veneer/src/browser/types.ts:2115`).
- Bootstrap throws for a popover trigger whose inline `display` is `none`; this contract resolves false there (`tmp/mikesaintsg-veneer/src/browser/types.ts:2116`).
- `ToastAttributeMap.animated` feeds the `animated` option, Bootstrap's `animation` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2320`).
- `ToastOptions.animated` mirrors Bootstrap's `animation` option (`tmp/mikesaintsg-veneer/src/browser/types.ts:2338`).
- `CarouselOptions.pause` true mirrors Bootstrap's `pause: 'hover'` (`tmp/mikesaintsg-veneer/src/browser/types.ts:2477`).
- `CAROUSEL_DEFAULTS` records Bootstrap's defaults with hover pausing as `true` (`tmp/mikesaintsg-veneer/src/browser/constants.ts:354`).
- The sanitizer allowlist lists WAI-ARIA names because the platform dictionary carries no pattern for Bootstrap's `aria-*` rule (`tmp/mikesaintsg-veneer/src/browser/constants.ts:628`).
- No `data-*` attribute is kept (`tmp/mikesaintsg-veneer/src/browser/constants.ts:630`).

## Unknowns

none