
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User
from .models import Livre

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'prenom', 'email', 'telephone', 'password', 'role']

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    photoUrl = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'nom', 'prenom', 'email',
            'telephone', 'role', 'photoUrl'
        ]

    def get_photoUrl(self, obj):
        return obj.photoUrl


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'prenom', 'email', 'telephone', 'password', 'photo']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'prenom', 'email', 'telephone', 'password', 'photo']

    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)



class LivreSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Livre
        fields = ['id', 'titre', 'auteur', 'annee', 'genre', 'prix', 'imageUrl']

    def get_imageUrl(self, obj):
        return obj.imageUrl


class LivreCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livre
        fields = ['titre', 'auteur', 'annee', 'genre', 'prix', 'image']
