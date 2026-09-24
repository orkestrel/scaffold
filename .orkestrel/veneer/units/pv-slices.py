# pv-slices.py: writes the portfolio-verdict slice arguments for the families no portfolio round has ruled
# (B-PASSIVE, B-FORMS, B-MODAL, B-UTILITIES) and the focus-frame slices FOCUS-FRAME's scoping reads (R7 of
# pf-design-verdict.md). Reads the registry partition pv/by-table.json (partition.py) and the frame directory,
# and refuses when a scenario of a named table has no frame at every variant, or when a stem lands in no slice.
# Usage: python3 pv-slices.py <frames dir> <out dir>
import json, pathlib, re, sys
FR = pathlib.Path(sys.argv[1]); OUT = pathlib.Path(sys.argv[2])
S = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/pv'
by = json.load(open(f'{S}/by-table.json'))
# The generated rows the partition could not resolve, mapped by their stem prefix.
for k in list(by):
    if not k.startswith('UNKNOWN:'): continue
    for sc in by.pop(k):
        t = ('OFFCANVAS_SPECIMENS' if 'offcanvas' in sc else 'MODAL_SPECIMENS' if 'modal' in sc
             else 'LIST_GROUP_SPECIMENS' if sc.startswith('list-group') else 'DROPDOWN_SPECIMENS' if sc.startswith('dropdown')
             else 'NAVBAR_SPECIMENS' if sc.startswith('navbar') else 'SHOWCASE')
        by.setdefault(t, []).append(sc)
BS = 'node_modules/bootstrap/scss/'
FAMILIES = {
  'passive': {
    'button': (['BUTTON_SPECIMENS', 'BUTTON_GROUP_SPECIMENS'], ['_buttons.scss', '_button-group.scss', 'mixins/_buttons.scss']),
    'close-badge-breadcrumb': (['CLOSE_SPECIMENS', 'BADGE_SPECIMENS', 'BREADCRUMB_SPECIMENS'], ['_close.scss', '_badge.scss', '_breadcrumb.scss']),
    'card-spinner-placeholder': (['CARD_SPECIMENS', 'SPINNER_SPECIMENS', 'PLACEHOLDER_SPECIMENS'], ['_card.scss', '_spinners.scss', '_placeholders.scss']),
    'list-group': (['LIST_GROUP_SPECIMENS'], ['_list-group.scss', 'mixins/_list-group.scss']),
    'pagination-progress': (['PAGINATION_SPECIMENS', 'PROGRESS_SPECIMENS'], ['_pagination.scss', 'mixins/_pagination.scss', '_progress.scss']),
  },
  'forms': {
    'check-range': (['FORM_CHECK_SPECIMENS', 'FORM_RANGE_SPECIMENS'], ['forms/_form-check.scss', 'forms/_form-range.scss']),
    'control-label': (['FORM_CONTROL_SPECIMENS', 'FORM_LABEL_SPECIMENS'], ['forms/_form-control.scss', 'forms/_labels.scss', 'forms/_form-text.scss']),
    'select-floating': (['FORM_SELECT_SPECIMENS', 'FORM_FLOATING_SPECIMENS'], ['forms/_form-select.scss', 'forms/_floating-labels.scss']),
    'input-group': (['INPUT_GROUP_SPECIMENS'], ['forms/_input-group.scss']),
    'validation': (['VALIDATION_SPECIMENS'], ['forms/_validation.scss', 'mixins/_forms.scss']),
  },
  'overlays': {
    'modal': (['MODAL_SPECIMENS'], ['_modal.scss']),
    'offcanvas': (['OFFCANVAS_SPECIMENS'], ['_offcanvas.scss']),
    'tooltip-popover': (['TOOLTIP_SPECIMENS', 'POPOVER_SPECIMENS'], ['_tooltip.scss', '_popover.scss']),
    'alert-toast-carousel-fade': (['ALERT_SPECIMENS', 'TOAST_SPECIMENS', 'CAROUSEL_SPECIMENS', 'FADE_SPECIMENS'], ['_alert.scss', '_toasts.scss', '_carousel.scss', '_transitions.scss']),
  },
  'utilities': {
    'paint': (['BACKGROUND_SPECIMENS', 'BORDER_SPECIMENS', 'SHADOW_SPECIMENS', 'OPACITY_SPECIMENS'], ['_utilities.scss']),
    'color-type': (['COLOR_SPECIMENS', 'TYPE_SPECIMENS'], ['_utilities.scss', 'helpers/_color-bg.scss', 'helpers/_text-truncation.scss']),
    'text-helpers': (['TEXT_SPECIMENS', 'LINK_SPECIMENS', 'INTERACTION_SPECIMENS', 'VISIBILITY_SPECIMENS'], ['_utilities.scss', 'helpers/_stretched-link.scss', 'helpers/_visually-hidden.scss', 'helpers/_colored-links.scss']),
    'display-flex': (['DISPLAY_SPECIMENS', 'FLEX_SPECIMENS'], ['_utilities.scss', 'helpers/_stacks.scss']),
    'place-size': (['POSITION_SPECIMENS', 'SIZING_SPECIMENS', 'FLOAT_SPECIMENS', 'OVERFLOW_SPECIMENS', 'OBJECT_FIT_SPECIMENS'], ['_utilities.scss', 'helpers/_position.scss', 'helpers/_clearfix.scss']),
    'space-focus': (['SPACING_SPECIMENS', 'LAYOUT_SPECIMENS', 'FOCUS_RING_SPECIMENS'], ['_utilities.scss', 'helpers/_focus-ring.scss']),
  },
}
VARIANTS = ['light-1280', 'dark-1280', 'light-390', 'dark-390']
missing = []; placed = set()
for fam, slices in FAMILIES.items():
    out = {}
    for name, (tables, sources) in slices.items():
        stems = sorted(sc for t in tables for sc in by.get(t, []))
        files = []
        for sc in stems:
            placed.add(sc)
            for v in VARIANTS:
                f = f'{sc}--{v}.png'
                (files if (FR / f).exists() else missing).append(f)
        out[name] = {'files': files, 'sources': [BS + s for s in sources]}
    (OUT / f'pv-{fam}-args.json').write_text(json.dumps(out, indent=1))
    print(fam, {k: len(v['files']) for k, v in out.items()})
# The focus frames, for FOCUS-FRAME's ring-findability reading.
focus = sorted(f.name for f in FR.glob('*-focus--*.png'))
half = len(focus) // 2
(OUT / 'pv-focus-args.json').write_text(json.dumps({'focus-a': {'files': focus[:half], 'sources': []}, 'focus-b': {'files': focus[half:], 'sources': []}}, indent=1))
print('focus', len(focus))
ruled = {'ACCORDION_SPECIMENS', 'COLLAPSE_SPECIMENS', 'DROPDOWN_SPECIMENS', 'NAV_SPECIMENS', 'NAVBAR_SPECIMENS', 'CONTENT_SPECIMENS', 'MEDIA_SPECIMENS', 'TABLE_SPECIMENS', 'SHOWCASE'}
unplaced = sorted(sc for t, scs in by.items() if t not in ruled for sc in scs if sc not in placed)
print('missing frames', missing); print('unplaced stems', unplaced)
sys.exit(1 if missing or unplaced else 0)
