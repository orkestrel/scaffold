// Orchestrator probe for the E-ID-FLOW audit: renders Bootstrap 5.3.8's documented component markup
// that carries h1-h6, p, ul, ol, or address under Veneer's built cascade (the flow worktree) and under
// Bootstrap's, and prints each marked element's margins where the two differ.
import { chromium } from '/home/user/veneer-flow/node_modules/playwright/index.mjs'
const root = process.argv[2] ?? '/home/user/veneer-flow'
const cascades = { veneer: `${root}/dist/src/styles/index.css`, bootstrap: `${root}/node_modules/bootstrap/dist/css/bootstrap.css` }
const markup = `
<ul class="nav" data-m="nav"><li class="nav-item"><a class="nav-link" href="#a">A</a></li></ul>
<ul class="nav nav-tabs" data-m="nav-tabs"><li class="nav-item"><a class="nav-link active" href="#a">A</a></li></ul>
<ul class="nav nav-pills" data-m="nav-pills"><li class="nav-item"><a class="nav-link" href="#a">A</a></li></ul>
<nav class="navbar navbar-expand-lg"><div class="container-fluid"><ul class="navbar-nav" data-m="navbar-nav"><li class="nav-item"><a class="nav-link" href="#a">A</a></li></ul><span class="navbar-text" data-m="navbar-text">T</span></div></nav>
<ul class="list-group" data-m="list-group"><li class="list-group-item">A</li></ul>
<ol class="list-group list-group-numbered" data-m="list-group-numbered"><li class="list-group-item">A</li></ol>
<ul class="list-group list-group-horizontal" data-m="list-group-horizontal"><li class="list-group-item">A</li><li class="list-group-item active">B</li></ul>
<nav><ol class="breadcrumb" data-m="breadcrumb"><li class="breadcrumb-item">A</li></ol></nav>
<nav><ul class="pagination" data-m="pagination"><li class="page-item"><a class="page-link" href="#a">1</a></li></ul></nav>
<ul class="dropdown-menu show" data-m="dropdown-menu" style="position:static"><li><h6 class="dropdown-header" data-m="dropdown-header">H</h6></li><li><a class="dropdown-item" href="#a">A</a></li></ul>
<div class="card"><div class="card-header"><ul class="nav nav-tabs card-header-tabs" data-m="card-header-tabs"><li class="nav-item"><a class="nav-link active" href="#a">A</a></li></ul></div><div class="card-body"><h5 class="card-title" data-m="card-title">T</h5><h6 class="card-subtitle mb-2" data-m="card-subtitle">S</h6><p class="card-text" data-m="card-text-last">X</p></div></div>
<div class="card"><div class="card-header"><ul class="nav nav-pills card-header-pills" data-m="card-header-pills"><li class="nav-item"><a class="nav-link active" href="#a">A</a></li></ul></div><div class="card-body"><p class="card-text" data-m="card-text-first">X</p><a class="card-link" href="#a">L</a></div></div>
<div class="modal" style="display:block;position:static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" data-m="modal-title">T</h1></div><div class="modal-body"><p data-m="modal-body-p">B</p></div></div></div></div>
<div class="offcanvas offcanvas-start show" style="position:static;visibility:visible;transform:none"><div class="offcanvas-header"><h5 class="offcanvas-title" data-m="offcanvas-title">T</h5></div></div>
<div class="popover bs-popover-auto" style="position:static"><h3 class="popover-header" data-m="popover-header">H</h3><div class="popover-body">B</div></div>
<div class="accordion"><div class="accordion-item"><h2 class="accordion-header" data-m="accordion-header"><button class="accordion-button" type="button">A</button></h2></div></div>
<div class="alert alert-success"><h4 class="alert-heading" data-m="alert-heading">H</h4><p data-m="alert-p">P</p><hr><p class="mb-0" data-m="alert-p-mb0">L</p></div>
<figure><blockquote class="blockquote" data-m="blockquote"><p data-m="blockquote-p">Q</p></blockquote><figcaption class="blockquote-footer" data-m="blockquote-footer">F</figcaption></figure>
<ul class="list-unstyled" data-m="list-unstyled"><li>A<ul><li data-m="nested-li">B</li></ul></li></ul>
<ul class="list-inline" data-m="list-inline"><li class="list-inline-item">A</li></ul>
<div class="carousel slide"><div class="carousel-inner"><div class="carousel-item active"><div class="carousel-caption d-none d-md-block"><h5 data-m="carousel-caption-h5">L</h5><p data-m="carousel-caption-p">C</p></div></div></div><div class="carousel-indicators" data-m="carousel-indicators"><button type="button" class="active"></button></div></div>
<div class="toast show"><div class="toast-header"><strong class="me-auto">B</strong></div><div class="toast-body"><p data-m="toast-p">P</p></div></div>
<h1 class="display-1" data-m="display-1">D</h1><p class="lead" data-m="lead">L</p>
<div class="form-text" data-m="form-text">F</div>
<dl class="row"><dt class="col-sm-3">T</dt><dd class="col-sm-9"><p data-m="dd-p">D</p></dd></dl>
<ul class="list-group list-group-flush" data-m="list-group-flush"><li class="list-group-item">A</li></ul>
<ol data-m="ol-nested"><li>A<ol data-m="ol-inner"><li>B</li></ol></li></ol>
<ul data-m="ul-nested"><li>A<ul data-m="ul-inner"><li>B</li></ul></li></ul>
`
const read = () => [...document.querySelectorAll('[data-m]')].map((n) => { const s = getComputedStyle(n); return { m: n.dataset.m, top: s.marginTop, bottom: s.marginBottom } })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const width of [390, 1280]) {
	const r = {}
	for (const [name, path] of Object.entries(cascades)) {
		const page = await browser.newPage({ viewport: { width, height: 900 } })
		await page.setContent(`<!doctype html><html><head></head><body>${markup}</body></html>`)
		await page.addStyleTag({ path })
		r[name] = await page.evaluate(read)
		await page.close()
	}
	console.log(`## @${width}`)
	r.veneer.forEach((v, i) => { const b = r.bootstrap[i]; const same = v.top === b.top && v.bottom === b.bottom; console.log(`  ${same ? 'same   ' : 'DIFFERS'} ${v.m}: veneer ${v.top} ${v.bottom} | bootstrap ${b.top} ${b.bottom}`) })
}
await browser.close()
