When the library in Mendeley is exported using 'BibTex', the fields are automatically formatted in braces.
  `month         = {feb},`
  
Overleaf complains for the field of 'month' that it is unreadable, because it expects "month = feb," (without braces).

A quick sed script would be : 

'''
sed -i 's/.*month.*=.*{\(.*\)},/  month = \1,/g' library.bib
'''
