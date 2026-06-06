import {
  Paper,
  Box,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TableContainer,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Course } from '@/types/course';
import { useState } from 'react';

interface ScheduleTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

// Mobile card view for each course row
function CourseCard({ course, onEdit, onDelete }: { course: Course; onEdit: () => void; onDelete: () => void }) {
  return (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {course.courseName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {course.courseCode} · Class {course.class}
            </Typography>
          </Box>
          <Chip
            label={course.status}
            color={course.status === 'Scheduled' ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          <Typography variant="body2">📅 {course.day}</Typography>
          <Typography variant="body2">⏰ {course.startTime} – {course.endTime}</Typography>
          <Typography variant="body2">🏛 {course.room}</Typography>
          <Typography variant="body2">👤 {course.lecturer}</Typography>
          <Typography variant="body2">📘 Sem {course.semester} · {course.credits} SKS</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
        <Tooltip title="Edit">
          <IconButton size="small" color="primary" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default function ScheduleTable({ courses, onEdit, onDelete }: ScheduleTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Schedule List</Typography>
          <Chip label={`${courses.length} Records`} color="primary" variant="outlined" />
        </Box>

        {courses.length === 0 && (
          <Typography align="center" sx={{ py: 4, color: 'text.secondary' }}>
            No courses found.
          </Typography>
        )}

        {/* Mobile: Card layout */}
        {isMobile && courses.length > 0 && (
          <Box>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={() => onEdit(course)}
                onDelete={() => setDeleteTarget(course)}
              />
            ))}
          </Box>
        )}

        {/* Desktop: Table layout */}
        {!isMobile && courses.length > 0 && (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Code</strong></TableCell>
                  <TableCell><strong>Course</strong></TableCell>
                  <TableCell><strong>Day</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                  <TableCell><strong>Room</strong></TableCell>
                  <TableCell><strong>Lecturer</strong></TableCell>
                  <TableCell><strong>Sem</strong></TableCell>
                  <TableCell><strong>SKS</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} hover>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.day}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{course.startTime} – {course.endTime}</TableCell>
                    <TableCell>{course.room}</TableCell>
                    <TableCell>{course.lecturer}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.status}
                        color={course.status === 'Scheduled' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary" onClick={() => onEdit(course)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => setDeleteTarget(course)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteTarget?.courseName}</strong> ({deleteTarget?.courseCode})?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}