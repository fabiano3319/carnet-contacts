from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=150,
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="Ce nom d'utilisateur existe déjà.",
        )],
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="Cet email est déjà utilisé.",
        )],
    )
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        error_messages={
            'min_length': "Le mot de passe doit contenir au moins 6 caractères.",
            'blank': "Le mot de passe est obligatoire.",
        },
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)