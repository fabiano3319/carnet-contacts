from django.conf import settings
from django.db import models


class Contact(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    categorie = models.CharField(max_length=50, blank=True)
    date_ajout = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="contacts",
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.prenom} {self.nom}"
