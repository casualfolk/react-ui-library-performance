'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import DashboardHeader from '@/components/DashboardHeader';
import SummaryCards from '@/components/SummaryCards';
import FilterBar from '@/components/FilterBar';
import ScheduleTable from '@/components/ScheduleTable';
import CourseDialog from '@/components/CourseDialog';
import { Course } from '@/types/course';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch courses from API
  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        searchQuery === '' ||
        c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDay = dayFilter === '' || c.day === dayFilter;
      return matchesSearch && matchesDay;
    });
  }, [courses, searchQuery, dayFilter]);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Add course
  const handleAdd = async (data: Omit<Course, 'id'>) => {
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchCourses();
      showSnackbar('Course added successfully!', 'success');
    } else {
      showSnackbar('Failed to add course.', 'error');
    }
  };

  // Edit course
  const handleEdit = async (data: Course) => {
    const res = await fetch('/api/courses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchCourses();
      showSnackbar('Course updated successfully!', 'success');
    } else {
      showSnackbar('Failed to update course.', 'error');
    }
  };

  // Delete course
  const handleDelete = async (id: number) => {
    const res = await fetch('/api/courses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await fetchCourses();
      showSnackbar('Course deleted successfully!', 'success');
    } else {
      showSnackbar('Failed to delete course.', 'error');
    }
  };

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (data: Omit<Course, 'id'> | Course) => {
    if ('id' in data && data.id) {
      await handleEdit(data as Course);
    } else {
      await handleAdd(data as Omit<Course, 'id'>);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <DashboardHeader />

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: { xs: 2, md: 4 } }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
            Monitor course schedules, rooms, and lecturer assignments.
          </Typography>
        </Box>

        <SummaryCards />
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dayFilter={dayFilter}
          onDayFilterChange={setDayFilter}
          onAddClick={handleOpenAdd}
        />
        <ScheduleTable
          courses={filteredCourses}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </Container>

      <CourseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialData={editingCourse}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}