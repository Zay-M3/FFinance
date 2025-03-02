from django import forms

class actives_ffinance(forms.Form):
    simbolActive = forms.CharField(required=True)
    objetiveActive = forms.IntegerField(min_value=0, max_value=1000000)


