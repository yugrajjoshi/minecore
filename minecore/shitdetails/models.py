from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


User = get_user_model()


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class MineSite(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    code = models.CharField(max_length=20, unique=True)
    location = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})"


class Department(TimeStampedModel):
    site = models.ForeignKey(MineSite, on_delete=models.CASCADE, related_name="departments")
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["site__name", "name"]
        constraints = [
            models.UniqueConstraint(fields=["site", "name"], name="unique_department_per_site"),
        ]

    def __str__(self):
        return f"{self.site.code} - {self.name}"


class Worker(TimeStampedModel):
    class EmploymentType(models.TextChoices):
        PERMANENT = "PERMANENT", "Permanent"
        CONTRACT = "CONTRACT", "Contract"

    employee_id = models.CharField(max_length=30, unique=True)
    full_name = models.CharField(max_length=150)
    site = models.ForeignKey(MineSite, on_delete=models.PROTECT, related_name="workers")
    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        related_name="workers",
        null=True,
        blank=True,
    )
    linked_user = models.OneToOneField(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="worker_profile",
    )
    employment_type = models.CharField(
        max_length=20,
        choices=EmploymentType.choices,
        default=EmploymentType.PERMANENT,
    )
    designation = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["employee_id"]

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"


class Shift(TimeStampedModel):
    class ShiftType(models.TextChoices):
        DAY = "DAY", "Day"
        EVENING = "EVENING", "Evening"
        NIGHT = "NIGHT", "Night"

    site = models.ForeignKey(MineSite, on_delete=models.CASCADE, related_name="shifts")
    shift_date = models.DateField()
    shift_type = models.CharField(max_length=10, choices=ShiftType.choices)
    supervisor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="supervised_shifts",
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    class Meta:
        ordering = ["-shift_date", "shift_type"]
        constraints = [
            models.UniqueConstraint(fields=["site", "shift_date", "shift_type"], name="unique_site_shift"),
        ]

    def clean(self):
        super().clean()
        if self.end_time <= self.start_time:
            raise ValidationError("Shift end_time must be after start_time.")

    def __str__(self):
        return f"{self.site.code} {self.shift_date} {self.shift_type}"


class ShiftAssignment(TimeStampedModel):
    class AttendanceStatus(models.TextChoices):
        PRESENT = "PRESENT", "Present"
        ABSENT = "ABSENT", "Absent"
        LATE = "LATE", "Late"
        LEFT_EARLY = "LEFT_EARLY", "Left Early"

    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name="assignments")
    worker = models.ForeignKey(Worker, on_delete=models.PROTECT, related_name="shift_assignments")
    assigned_role = models.CharField(max_length=100, blank=True)
    attendance_status = models.CharField(
        max_length=20,
        choices=AttendanceStatus.choices,
        default=AttendanceStatus.PRESENT,
    )
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["shift", "worker__employee_id"]
        constraints = [
            models.UniqueConstraint(fields=["shift", "worker"], name="unique_worker_per_shift"),
        ]

    def __str__(self):
        return f"{self.shift} - {self.worker.employee_id}"


class Equipment(TimeStampedModel):
    class EquipmentStatus(models.TextChoices):
        OPERATIONAL = "OPERATIONAL", "Operational"
        MAINTENANCE = "MAINTENANCE", "Under Maintenance"
        DOWN = "DOWN", "Down"

    site = models.ForeignKey(MineSite, on_delete=models.CASCADE, related_name="equipment")
    equipment_id = models.CharField(max_length=40, unique=True)
    name = models.CharField(max_length=120)
    status = models.CharField(max_length=20, choices=EquipmentStatus.choices, default=EquipmentStatus.OPERATIONAL)
    last_service_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["equipment_id"]

    def __str__(self):
        return f"{self.equipment_id} - {self.name}"


class SafetyIncident(TimeStampedModel):
    class IncidentType(models.TextChoices):
        INJURY = "INJURY", "Injury"
        NEAR_MISS = "NEAR_MISS", "Near Miss"
        FIRE = "FIRE", "Fire"
        GAS_LEAK = "GAS_LEAK", "Gas Leak"
        EQUIPMENT_FAILURE = "EQUIPMENT_FAILURE", "Equipment Failure"
        OTHER = "OTHER", "Other"

    class Severity(models.TextChoices):
        LOW = "LOW", "Low"
        MEDIUM = "MEDIUM", "Medium"
        HIGH = "HIGH", "High"
        CRITICAL = "CRITICAL", "Critical"

    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        INVESTIGATING = "INVESTIGATING", "Investigating"
        ACTION_PENDING = "ACTION_PENDING", "Action Pending"
        CLOSED = "CLOSED", "Closed"

    site = models.ForeignKey(MineSite, on_delete=models.PROTECT, related_name="incidents")
    shift = models.ForeignKey(Shift, on_delete=models.SET_NULL, null=True, blank=True, related_name="incidents")
    reported_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="reported_incidents")
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_incidents",
    )
    incident_type = models.CharField(max_length=30, choices=IncidentType.choices)
    severity = models.CharField(max_length=10, choices=Severity.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)
    occurred_at = models.DateTimeField()
    description = models.TextField()
    immediate_action = models.TextField(blank=True)
    root_cause = models.TextField(blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-occurred_at"]
        indexes = [
            models.Index(fields=["site", "status"]),
            models.Index(fields=["severity"]),
        ]

    def clean(self):
        super().clean()
        if self.status == self.Status.CLOSED and not self.closed_at:
            self.closed_at = timezone.now()

    def __str__(self):
        return f"Incident #{self.pk} - {self.incident_type} ({self.severity})"


class SafetyInspection(TimeStampedModel):
    class InspectionStatus(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        COMPLETED = "COMPLETED", "Completed"
        APPROVED = "APPROVED", "Approved"

    site = models.ForeignKey(MineSite, on_delete=models.PROTECT, related_name="inspections")
    shift = models.ForeignKey(Shift, on_delete=models.SET_NULL, null=True, blank=True, related_name="inspections")
    inspector = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="inspections_done")
    checklist_name = models.CharField(max_length=120)
    inspection_date = models.DateField()
    status = models.CharField(max_length=15, choices=InspectionStatus.choices, default=InspectionStatus.DRAFT)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-inspection_date"]

    def __str__(self):
        return f"{self.site.code} - {self.checklist_name} ({self.inspection_date})"


class InspectionFinding(TimeStampedModel):
    class RiskLevel(models.TextChoices):
        LOW = "LOW", "Low"
        MEDIUM = "MEDIUM", "Medium"
        HIGH = "HIGH", "High"
        CRITICAL = "CRITICAL", "Critical"

    inspection = models.ForeignKey(SafetyInspection, on_delete=models.CASCADE, related_name="findings")
    title = models.CharField(max_length=150)
    is_compliant = models.BooleanField(default=True)
    risk_level = models.CharField(max_length=10, choices=RiskLevel.choices, default=RiskLevel.LOW)
    details = models.TextField(blank=True)

    class Meta:
        ordering = ["inspection", "-created_at"]

    def __str__(self):
        return f"{self.inspection_id} - {self.title}"


class CorrectiveAction(TimeStampedModel):
    class ActionStatus(models.TextChoices):
        OPEN = "OPEN", "Open"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        VERIFIED = "VERIFIED", "Verified"
        CLOSED = "CLOSED", "Closed"

    title = models.CharField(max_length=180)
    incident = models.ForeignKey(
        SafetyIncident,
        on_delete=models.CASCADE,
        related_name="corrective_actions",
        null=True,
        blank=True,
    )
    finding = models.ForeignKey(
        InspectionFinding,
        on_delete=models.CASCADE,
        related_name="corrective_actions",
        null=True,
        blank=True,
    )
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="corrective_actions")
    due_date = models.DateField()
    status = models.CharField(max_length=15, choices=ActionStatus.choices, default=ActionStatus.OPEN)
    closure_note = models.TextField(blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["due_date", "status"]
        indexes = [models.Index(fields=["status", "due_date"])]

    def clean(self):
        super().clean()
        if not self.incident and not self.finding:
            raise ValidationError("CorrectiveAction must be linked to either an incident or a finding.")
        if self.incident and self.finding:
            raise ValidationError("CorrectiveAction can be linked to only one source: incident or finding.")
        if self.status == self.ActionStatus.CLOSED and not self.closed_at:
            self.closed_at = timezone.now()

    def __str__(self):
        return f"Action #{self.pk} - {self.title}"


class ProductionLog(TimeStampedModel):
    site = models.ForeignKey(MineSite, on_delete=models.PROTECT, related_name="production_logs")
    shift = models.ForeignKey(Shift, on_delete=models.PROTECT, related_name="production_logs")
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="production_logs",
    )
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="production_logs")
    coal_output_tons = models.DecimalField(max_digits=10, decimal_places=2)
    downtime_minutes = models.PositiveIntegerField(default=0)
    downtime_reason = models.CharField(max_length=255, blank=True)
    safety_observation = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["site", "created_at"])]

    def __str__(self):
        return f"{self.site.code} - {self.shift} - {self.coal_output_tons} tons"
    