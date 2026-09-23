import sys
# usage: plant.py <name> apply|revert
P={
 'barrel': ('/home/user/veneer-bff/src/styles/index.scss',
   "@use 'components/vr';\n@use 'components/pagination';\n@use 'components/button-group';\n@use 'components/progress' as progress-component;\n@use 'components/spinner';\n@use 'components/placeholder';\n@use 'components/form-range';\n@use 'components/form-floating';\n@use 'components/validation';\n",
   "@use 'components/vr';\n@use 'components/validation';\n@use 'components/pagination';\n@use 'components/button-group';\n@use 'components/progress' as progress-component;\n@use 'components/spinner';\n@use 'components/placeholder';\n@use 'components/form-range';\n@use 'components/form-floating';\n"),
 'control': ('/home/user/veneer-bff/src/styles/index.scss',
   "@use 'components/vr';\n@use 'components/pagination';\n",
   "@use 'components/vr';\n"),
 'height': ('/home/user/veneer-bff/src/styles/components/_form-floating.scss',
   "\t\theight: calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2));\n\t\tmin-height: calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2));\n",
   "\t\theight: calc(3.5rem + calc(var(--bs-border-width) * 2));\n\t\tmin-height: calc(3.5rem + calc(var(--bs-border-width) * 2));\n"),
 'backdrop': ('/home/user/veneer-bff/src/styles/components/_form-floating.scss',
   "\t.form-floating > textarea:disabled ~ label::after {\n\t\tbackground-color: var(--bs-secondary-bg);\n",
   "\t.form-floating > textarea:disabled ~ label::after {\n\t\tbackground-color: #e9ecef;\n"),
}
name, mode = sys.argv[1], sys.argv[2]
path, good, bad = P[name]
s=open(path).read()
a,b = (good,bad) if mode=='apply' else (bad,good)
assert s.count(a)==1, (name, mode, s.count(a))
s=s.replace(a,b)
if name=='control' and mode=='apply':
    anchor="@use 'components/validation';\n"
    assert s.count(anchor)==1
    s=s.replace(anchor, anchor+"@use 'components/pagination';\n")
if name=='control' and mode=='revert':
    extra="@use 'components/validation';\n@use 'components/pagination';\n"
    assert s.count(extra)==1
    s=s.replace(extra,"@use 'components/validation';\n")
open(path,'w').write(s)
print(name, mode, 'ok')
