from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
from .models import UserProfile

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Register a new user"""
    serializer = RegisterSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data['password']
    password2 = serializer.validated_data['password2']
    phone = serializer.validated_data['phone']
    username = serializer.validated_data.get('username', email.split('@')[0])
    first_name = serializer.validated_data.get('first_name', '')
    last_name = serializer.validated_data.get('last_name', '')
    
    # Validation
    if password != password2:
        return Response({
            'message': 'Passwords do not match'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({
            'message': 'Email already exists'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({
            'message': 'Username already exists'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if UserProfile.objects.filter(phone=phone).exists():
        return Response({
            'message': 'Phone number already exists'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Create user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    
    # Create user profile with phone
    UserProfile.objects.create(
        user=user,
        phone=phone
    )
    
    # Generate tokens
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'message': 'User registered successfully',
        'token': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone': phone,
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login user with email and password"""
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Find user by email
        try:
            user = User.objects.get(email=email)
            # Authenticate using username
            user = authenticate(request, username=user.username, password=password)
        except User.DoesNotExist:
            user = None
        
        if user is not None:
            if not user.is_active:
                return Response({
                    'message': 'Account is disabled'
                }, status=status.HTTP_403_FORBIDDEN)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Get phone from profile
            phone = user.profile.phone if hasattr(user, 'profile') else None
            
            return Response({
                'message': 'Login successful',
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'name': user.get_full_name() or user.username,
                    'phone': phone,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """Get current user profile"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """Update user profile"""
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    
    if serializer.is_valid():
        # Check if email is being changed
        new_email = serializer.validated_data.get('email')
        if new_email and new_email != user.email:
            if User.objects.filter(email=new_email).exists():
                return Response({
                    'message': 'Email already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if phone is being changed
        profile_data = serializer.validated_data.get('profile', {})
        new_phone = profile_data.get('phone')
        if new_phone and hasattr(user, 'profile') and new_phone != user.profile.phone:
            if UserProfile.objects.filter(phone=new_phone).exists():
                return Response({
                    'message': 'Phone number already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({
            'message': 'Profile updated successfully',
            'user': serializer.data
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user"""
    return Response({
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)