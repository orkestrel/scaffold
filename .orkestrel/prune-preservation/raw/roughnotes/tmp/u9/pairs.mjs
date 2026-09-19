const C = {
 'rn-navy':'#0a2540','rn-navy-mid':'#123a63','rn-navy-deep':'#071a2f','rn-blue':'#1f6feb',
 'rn-blue-deep':'#155ac9','rn-gold':'#c8952b','rn-gold-soft':'#e7c67a','rn-gold-ink':'#6b4a12',
 'rn-hero-muted':'#c4d2e2','secondary':'#4a5a6e','body-color':'#0f1b2d','body-bg':'#ffffff',
 'body-secondary-color':'#4a5a6e','body-secondary-bg':'#e7edf5','body-tertiary-bg':'#f5f7fa',
 'body-bg-dark':'#0a2540','body-color-dark':'#e8eef5','emphasis-dark':'#ffffff',
 'body-secondary-color-dark':'#c4d2e2','body-secondary-bg-dark':'#123a63','body-tertiary-bg-dark':'#0d2c4d',
 'border-color-dark':'#1b4b7e','link-color-dark':'#8bb4e8','link-hover-color-dark':'#c4d2e2',
 'primary-text-emphasis':'#0a2540','primary-bg-subtle':'#e7edf5','primary-border-subtle':'#b7c5d6',
 'primary-text-emphasis-dark':'#d0dcea','primary-bg-subtle-dark':'#1b4b7e','primary-border-subtle-dark':'#2a6aaa',
 'warning':'#c8952b','warning-text-emphasis':'#6b4a12','warning-bg-subtle':'#f6ecd4','warning-border-subtle':'#e7c67a',
 'warning-text-emphasis-dark':'#e7c67a','warning-bg-subtle-dark':'#3a2a10','warning-border-subtle-dark':'#c8952b',
 'bs-gray-600':'#6c757d','bs-gray-700':'#495057','bs-gray-800':'#343a40','bs-gray-900':'#212529',
 'black':'#000000','white':'#ffffff','bs-border-color':'#dee2e6','bs-tertiary-color':'rgba',
}
function lin(v){v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)}
function lum(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)}
const target=1.441705213956706
const names=Object.keys(C).filter(k=>/^#/.test(C[k]))
for(const a of names)for(const b of names){
 const la=lum(C[a]),lb=lum(C[b]);const r=(Math.max(la,lb)+0.05)/(Math.min(la,lb)+0.05)
 if(Math.abs(r-target)<0.004)console.log(a,C[a],'vs',b,C[b],r.toFixed(6))
}
