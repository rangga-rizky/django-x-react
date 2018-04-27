from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import connection
from django.http import Http404
from .permissions import IsOwner
from .serializers import NoteSerializer,UserSerializer
from .models import Notes
from rest_framework.authtoken.models import Token
import datetime,json


class CreateView(APIView):
	permission_classes = (permissions.IsAuthenticated,IsOwner)

	def get(self, request, format=None):
		user = request.user
		if request.GET.get("month") :
			month = request.GET.get("month")
			queryset = Notes.objects.filter(user_id=user.id,date_modified__month=month)
		else:
			queryset = Notes.objects.filter(user_id=user.id)
		balance = self.getBalance(user.id)
		userSerializer = UserSerializer(user,context={'balance' :balance})
		Noteserializer = NoteSerializer(queryset,many=True)
		return Response({"user": userSerializer.data,
						 "data": Noteserializer.data,
						})

	def post(self, request, format=None):
		#Django tidak membaca json secara otomatis, request.POST.get untuk form
		json_data = json.loads(request.body.decode('utf-8') ) 
		note =  Notes(
						name = json_data["name"],
						value = json_data["value"],
						type_note = json_data["type_note"],
						user_id = request.user.id
					)
		note.save()
		return Response({
							"status": "success",
						})

	def getBalance(self,user_id):
		with connection.cursor() as cursor:
			cursor.execute(" SELECT * FROM userbalance("+ str(user_id) + ")")
			for row in cursor.fetchall():
				return row[0]


class DetailsView(APIView):
    permission_classes = (permissions.IsAuthenticated,IsOwner)


    def get_object(self, pk):
        try:
        	note = Notes.objects.get(id=pk)
        	self.check_object_permissions(self.request, note)
        	return note
        except Notes.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        note = self.get_object(pk)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        note = self.get_object(pk)
        json_data = json.loads(request.body.decode('utf-8') ) 
        note.name = json_data["name"]
        note.value = json_data["value"]
        note.type_note = json_data["type_note"]
        note.save()
        return Response({
							"status": "success",
						})        

    def delete(self, request, pk, format=None):
        note = self.get_object(pk)
        note.delete()
        return Response({
							"status": "success",
						})
