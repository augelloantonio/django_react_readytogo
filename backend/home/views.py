from django.shortcuts import render
from django.views.generic import TemplateView

class React(TemplateView):
    """A view that renders the React frontend"""
    template_name = 'index.html'