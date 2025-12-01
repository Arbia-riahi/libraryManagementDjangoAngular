# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Livre
from .serializers import LivreSerializer, LivreCreateUpdateSerializer

from .models import User
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer
)

def create_jwt_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['role'] = user.role
    refresh['nameid'] = user.id
    return {'token': str(refresh.access_token)}


# -------------------------
# 🔐 REGISTER (inchangé)
# -------------------------
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=201)
        return Response(serializer.errors, status=400)


# -------------------------
# 🔐 LOGIN (inchangé)
# -------------------------
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)
        if user is None:
            return Response({"error": "Identifiants incorrects"}, status=400)

        token = create_jwt_for_user(user)
        return Response({"token": token["token"]})


# -------------------------
# 👤 ME
# -------------------------
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# -------------------------
# 👥 USERS CRUD
# -------------------------
class UserListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all().order_by('-id')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé"}, status=201)
        return Response(serializer.errors, status=400)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=404)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=404)

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur mis à jour"})
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=404)

        user.delete()
        return Response({"message": "Utilisateur supprimé"})







# ---------------------------
# 📚 LISTE + AJOUT
# ---------------------------
class LivreListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        livres = Livre.objects.all().order_by('-id')
        serializer = LivreSerializer(livres, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LivreCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Livre ajouté"}, status=201)
        return Response(serializer.errors, status=400)


# ---------------------------
# 📚 DETAILS + UPDATE + DELETE
# ---------------------------
class LivreDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            livre = Livre.objects.get(id=id)
        except Livre.DoesNotExist:
            return Response({"error": "Livre introuvable"}, status=404)

        serializer = LivreSerializer(livre)
        return Response(serializer.data)

    def put(self, request, id):
        try:
            livre = Livre.objects.get(id=id)
        except Livre.DoesNotExist:
            return Response({"error": "Livre introuvable"}, status=404)

        serializer = LivreCreateUpdateSerializer(livre, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Livre mis à jour"})
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        try:
            livre = Livre.objects.get(id=id)
        except Livre.DoesNotExist:
            return Response({"error": "Livre introuvable"}, status=404)

        livre.delete()
        return Response({"message": "Livre supprimé"}, status=200)
