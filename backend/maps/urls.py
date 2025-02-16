from django.urls import path
from .views import PromptFormView

urlpatterns = [
    path('submit_prompt_form/', PromptFormView.as_view(), name='submit_prompt_form'),
]
