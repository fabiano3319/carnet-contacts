import re
from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        read_only_fields = ('owner',)

    def validate_telephone(self, value):
        value = value.strip()
        if not re.fullmatch(r'\+?[0-9 ]+', value):
            raise serializers.ValidationError(
                "Le numéro ne doit contenir que des chiffres (et un + au début pour un numéro international)."
            )
        chiffres = re.sub(r'\D', '', value)
        if not 8 <= len(chiffres) <= 15:
            raise serializers.ValidationError("Le numéro doit contenir entre 8 et 15 chiffres.")
        return value