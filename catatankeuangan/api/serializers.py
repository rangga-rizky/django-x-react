from rest_framework import serializers
from .models import Notes
from django.contrib.auth.models import User
import datetime,locale
from api.helper import rupiah_format

class NoteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    value_with_format =  serializers.SerializerMethodField('formatted_value')
    date_created = serializers.DateTimeField(format="%a %b %Y , %H:%M",required=False)
    date_modified = serializers.DateTimeField(format="%a %b %Y , %H:%M",required=False)

    def formatted_value(self, instance):
        return rupiah_format(instance.value,with_prefix=True)

    class Meta:
        model = Notes
        fields = ('id','value_with_format', 'name','value','user','type_note','date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')

class UserSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField('get_formatted_balance')
    date_joined = serializers.DateTimeField(format="%a %b %Y , %H:%M")

    def get_formatted_balance(self, obj):
        return rupiah_format(self.context.get("balance"),with_prefix=True)

    
    class Meta:
        model = User
        fields = ('id','balance', 'username','email','date_joined')




