from django.db import models
from django.contrib.auth.models import AbstractUser

def user_photo_path(instance, filename):
    return f"uploads/users/{instance.email}/{filename}"

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)

    photo = models.ImageField(upload_to=user_photo_path, null=True, blank=True)

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom', 'prenom', 'telephone', 'role']

    def __str__(self):
        return self.email

    @property
    def photoUrl(self):
        if self.photo:
            return self.photo.url
        return None



def livre_image_path(instance, filename):
    return f"uploads/livres/{instance.titre}/{filename}"

class Livre(models.Model):
    titre = models.CharField(max_length=200)
    auteur = models.CharField(max_length=200)
    annee = models.IntegerField()
    genre = models.CharField(max_length=100)
    prix = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(upload_to=livre_image_path, null=True, blank=True)

    def __str__(self):
        return self.titre

    @property
    def imageUrl(self):
        if self.image:
            return self.image.url
        return None
