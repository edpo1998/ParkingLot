
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


class Rol(models.Model):
    ''' Modelo para especificar el rol del suario'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return self.name

class UserProfileManager(BaseUserManager):
    def createUser(self,email,username,name,surname,password=None,rol=None):
        if not email:
            raise ValueError('Usuario debe tener un email')

        if not username:
            raise ValueError('Usuario debe tener un username')

        email = self.normalize_email(email)
        user = self.model(email=email,username=username,name=name,rol=rol,surname=surname)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self,name,surname,email,username,password,rol=None):
        user = self.createUser(email,username,name,surname,password,rol)
        user.is_superuser = False
        user.is_staff = False
        user.save(using=self._db)

        return user

    def create_superuser(self,name,surname,email,username,password,rol=None):

        user = self.createUser(email,username,name,surname,password,rol)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserProfile(AbstractBaseUser,PermissionsMixin):
    ''' Modelo '''
    email = models.EmailField(max_length=255,unique=True)
    username = models.CharField(max_length=55,unique=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE,blank=True, null=True,default=None)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email' or 'username'
    REQUIRED_FIELDS = ['username','name','surname']



    def get_fullname(self):
        return self.name
    
    def __str__(self):
        return self.name

