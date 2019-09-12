---
layout: post
title: "Fix braces for 'month' field in Mendeley exported bibtex library (Overleaf doesn't like them) "
date: 2019-09-12
---

When the library in Mendeley is exported using 'BibTex', the fields are automatically formatted in braces.
  `month         = {feb},`
  
Overleaf complains for the field of 'month' that it is unreadable, because it expects "month = feb," (without braces).

A quick sed script would be : 

`
sed -i 's/.*month.*=.*{\(.*\)},/  month = \1,/g' library.bib
`
