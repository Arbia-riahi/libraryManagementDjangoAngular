from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    MeView,
    UserListCreateView,
    UserDetailView,
    LivreListCreateView, LivreDetailView
)

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),

    path('utilisateurs/me', MeView.as_view()),
    path('utilisateurs', UserListCreateView.as_view()),
    path('utilisateurs/<int:id>', UserDetailView.as_view()),


    path('livres', LivreListCreateView.as_view()),
    path('livres/<int:id>', LivreDetailView.as_view()),
]



