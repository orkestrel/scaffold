The margin and padding steps split the same way the offsets do. The `m-*`, `mt-*`, `mb-*`, `p-*`,
`pt-*`, and `pb-*` names are shipped names off the line: Tailwind's rule for each declares the
physical margin or padding longhands, and Veneer declares each of those with `!important`. The
`mx-*`, `my-*`, `me-*`, `ms-*`, `px-*`, `py-*`, `pe-*`, and `ps-*` names stay on the line:
Tailwind's rule for each declares logical longhands, such as the `margin-inline-start` or the
`padding-block-end` longhand, and Veneer's important declarations sit on the physical sides, which
do not cover them. The `pe-none`, `pe-auto`, and `user-select-*` names are not shared, because
Tailwind names those utilities `pointer-events-none`, `pointer-events-auto`, and `select-*`.
