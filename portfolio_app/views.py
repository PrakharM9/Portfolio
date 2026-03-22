from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
            return redirect('index')
    else:
        form = ContactForm()
    return render(request, 'portfolio_app/index.html', {'form': form})