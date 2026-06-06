import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Course } from '@/types/course';

interface CourseDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Course, 'id'> | Course) => void;
  initialData: Course | null;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const STATUSES = ['Scheduled', 'Rescheduled', 'Cancelled'];
const TIME_SLOTS = ['07:00', '08:40', '10:20', '12:00', '13:00', '14:40', '16:20', '18:00'];

const emptyForm: Omit<Course, 'id'> = {
  courseCode: '',
  courseName: '',
  lecturer: '',
  day: '',
  startTime: '',
  endTime: '',
  room: '',
  class: '',
  semester: 1,
  credits: 2,
  status: 'Scheduled',
};

// Shared slotProps for all outlined TextFields — forces label to always float correctly
const outlinedSlotProps = {
  inputLabel: { shrink: true },
};

export default function CourseDialog({ open, onClose, onSubmit, initialData }: CourseDialogProps) {
  const [form, setForm] = useState<Omit<Course, 'id'> | Course>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm(initialData ?? emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (field: keyof Course, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const required: (keyof Course)[] = ['courseCode', 'courseName', 'lecturer', 'day', 'startTime', 'endTime', 'room', 'class'];
    required.forEach((field) => {
      if (!form[field as keyof typeof form]) {
        newErrors[field] = 'This field is required';
      }
    });
    if (form.semester < 1 || form.semester > 8) newErrors.semester = 'Semester must be 1–8';
    if (form.credits < 1 || form.credits > 6) newErrors.credits = 'Credits must be 1–6';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  const isEditing = initialData !== null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {isEditing ? 'Edit Course Schedule' : 'Add New Course Schedule'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isEditing ? 'Update the course details below.' : 'Fill in the details to add a new course.'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }} columns={12}>

          {/* Course Code */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Course Code"
              value={form.courseCode}
              onChange={(e) => handleChange('courseCode', e.target.value)}
              error={!!errors.courseCode}
              helperText={errors.courseCode || ' '}
              slotProps={outlinedSlotProps}
            />
          </Grid>

          {/* Course Name */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              label="Course Name"
              value={form.courseName}
              onChange={(e) => handleChange('courseName', e.target.value)}
              error={!!errors.courseName}
              helperText={errors.courseName || ' '}
              slotProps={outlinedSlotProps}
            />
          </Grid>

          {/* Lecturer */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Lecturer"
              value={form.lecturer}
              onChange={(e) => handleChange('lecturer', e.target.value)}
              error={!!errors.lecturer}
              helperText={errors.lecturer || ' '}
              slotProps={outlinedSlotProps}
            />
          </Grid>

          {/* Ruangan */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label="Room"
              value={form.room}
              onChange={(e) => handleChange('room', e.target.value)}
              error={!!errors.room}
              helperText={errors.room || ' '}
              slotProps={outlinedSlotProps}
            />
          </Grid>

          {/* Class */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label="Class"
              value={form.class}
              onChange={(e) => handleChange('class', e.target.value)}
              error={!!errors.class}
              helperText={errors.class || ' '}
              slotProps={outlinedSlotProps}
            />
          </Grid>

          {/* Day */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="Day"
              value={form.day}
              onChange={(e) => handleChange('day', e.target.value)}
              error={!!errors.day}
              helperText={errors.day || ' '}
              slotProps={outlinedSlotProps}
            >
              {DAYS.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Start Time */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="Start Time"
              value={form.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
              error={!!errors.startTime}
              helperText={errors.startTime || ' '}
              slotProps={outlinedSlotProps}
            >
              {TIME_SLOTS.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* End Time */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="End Time"
              value={form.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
              error={!!errors.endTime}
              helperText={errors.endTime || ' '}
              slotProps={outlinedSlotProps}
            >
              {TIME_SLOTS.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Semester */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Semester"
              value={form.semester}
              onChange={(e) => handleChange('semester', Number(e.target.value))}
              error={!!errors.semester}
              helperText={errors.semester || ' '}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: 1, max: 8 },
              }}
            />
          </Grid>

          {/* Credits / SKS */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Credits (SKS)"
              value={form.credits}
              onChange={(e) => handleChange('credits', Number(e.target.value))}
              error={!!errors.credits}
              helperText={errors.credits || ' '}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: 1, max: 6 },
              }}
            />
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              helperText=" "
              slotProps={outlinedSlotProps}
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ fontWeight: 600 }}>
          {isEditing ? 'Save Changes' : 'Add Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
