from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import ShiftDetails
from django.contrib.auth.models import User
from datetime import date, datetime
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateShift(request):
    if not request.user.is_authenticated:
        return Response({"message": "You are not authenticated"}, status=401)
    
    if not request.user.is_staff:
        return Response({"message": "You are not authorized to create shift"}, status=403)
    else:
        shift_type = request.data.get('shift_type')
        shift_start_date = request.data.get('shift_start_date')
        shift_end_date = request.data.get('shift_end_date')
        shift_start_time = request.data.get('shift_start_time')
        shift_end_time = request.data.get('shift_end_time')
        
        if shift_start_date and shift_start_time:
            try:
                if isinstance(shift_start_date, str):
                    start_date_obj = datetime.strptime(shift_start_date, "%Y-%m-%d").date()
                else:
                    start_date_obj = shift_start_date

                if isinstance(shift_start_time, str):
                    try:
                        start_time_obj = datetime.strptime(shift_start_time, "%H:%M").time()
                    except ValueError:
                        start_time_obj = datetime.strptime(shift_start_time, "%H:%M:%S").time()
                else:
                    start_time_obj = shift_start_time

                start_datetime = timezone.make_aware(datetime.combine(start_date_obj, start_time_obj))
                if timezone.now() > start_datetime:
                    return Response({"message": "Cannot create a shift for a start time/date that has already passed"}, status=400)
            except Exception as e:
                return Response({"message": f"Invalid date or time format: {str(e)}"}, status=400)

        shift = ShiftDetails.objects.create(
            shift_type=shift_type,
            shift_start_date=shift_start_date,
            shift_end_date=shift_end_date,
            shift_start_time=shift_start_time,
            shift_end_time=shift_end_time
        )
        return Response({"message": "Shift created successfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ListShifts(request):
    shifts = ShiftDetails.objects.all().order_by('-created_at')
    data = []
    now = timezone.now()

    for s in shifts:
        status = "Upcoming"
        if s.shift_start_date and s.shift_start_time and s.shift_end_date and s.shift_end_time:
            try:
                start_dt = timezone.make_aware(datetime.combine(s.shift_start_date, s.shift_start_time))
                end_dt = timezone.make_aware(datetime.combine(s.shift_end_date, s.shift_end_time))
                
                if start_dt <= now <= end_dt:
                    status = "Ongoing"
                elif now > end_dt:
                    status = "Completed"
                else:
                    status = "Upcoming"
            except Exception:
                status = "Unknown"
        
        data.append({
            "id": s.id,
            "shift_id": s.shift_id,
            "shift_type": s.shift_type,
            "shift_start_date": s.shift_start_date.strftime("%Y-%m-%d") if s.shift_start_date else "",
            "shift_end_date": s.shift_end_date.strftime("%Y-%m-%d") if s.shift_end_date else "",
            "shift_start_time": s.shift_start_time.strftime("%H:%M") if s.shift_start_time else "",
            "shift_end_time": s.shift_end_time.strftime("%H:%M") if s.shift_end_time else "",
            "status": status
        })
    
    return Response(data)
