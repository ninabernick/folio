from rest_framework import serializers
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ('pk','first_name', 'last_name', 'email','about')