from django.test import TestCase
from .models import Notes
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User

class ModelTestCase(TestCase):

    def setUp(self):
        user = User.objects.create(username="nerd") 
        self.name = "Write world class code"        
        self.value = 15000
        self.notes = Notes(name=self.name, user=user , value=self.value)

    def test_model_can_create_a_Notes(self):
        old_count = Notes.objects.count()
        self.notes.save()
        new_count = Notes.objects.count()
        self.assertNotEqual(old_count, new_count)


class ViewTestCase(TestCase):

    def setUp(self):
        user = User.objects.create(username="nerd")
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        self.notes_data = {'name': 'Go to Ibiza','value' : 10000, 'user': user.id}
        self.response = self.client.post(
            reverse('create'),
            self.notes_data,
            format="json")
      

    def test_api_can_create_a_notes(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_authorization_is_enforced(self):
        new_client = APIClient()
        res = new_client.get('/notes/', kwargs={'pk': 3}, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_can_get_a_notes(self):
        notes = Notes.objects.get()
        response = self.client.get(
            '/notes/',
            kwargs={'pk': notes.id}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, notes)

    def test_api_can_update_notes(self):
        notes = Notes.objects.get()
        change_notes = {'name' : 'nani','value': 15000}
        res = self.client.put(
            reverse('details', kwargs={'pk': notes.id}),
            change_notes, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)



    def test_api_can_delete_notes(self):
        notes = Notes.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': notes.id}),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)