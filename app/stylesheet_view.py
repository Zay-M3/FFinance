from django.views.generic import TemplateView
from django.shortcuts import render
from django.contrib.staticfiles.storage import staticfiles_storage

class StylesheetView(TemplateView):
  
    def get(self, request, *args, **kwargs):
        css_file = kwargs.get('css_file', 'modern-style.css')
        template_name = f'css/{css_file}'
        
        context = {
            # Aquí puedes agregar variables que quieras usar en tu CSS
            'primary_color': '#2e7d32',
            'primary_light': '#60ad5e',
            'primary_dark': '#005005',
            'secondary_color': '#424242',
        }
        
        response = render(request, template_name, context)
        response['Content-Type'] = 'text/css'
        return response
