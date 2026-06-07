'use client';

import { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Course } from '@/types/course';
import AppNavbar from '@/components/AppNavbar';
import DashboardCards from '@/components/DashboardCards';
import FilterBar from '@/components/FilterBar';
import ScheduleTable from '@/components/ScheduleTable';
import CourseModal from '@/components/CourseModal';
import AppToast from '@/components/AppToast';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('All');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'danger' }>({
    show: false,
    message: '',
    type: 'success',
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

  const showToast = (message: string, type: 'success' | 'danger') => {
    setToast({ show: true, message, type });
  };

  // Filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDay = selectedDay === 'All' || course.day === selectedDay;

      return matchesSearch && matchesDay;
    });
  }, [courses, searchTerm, selectedDay]);

  // Add course
  const handleSaveCourse = async (data: Omit<Course, 'id'> | Course) => {
    if (modalMode === 'edit' && 'id' in data && data.id) {
      const res = await fetch('/api/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchCourses();
        showToast('Course updated successfully!', 'success');
      } else {
        showToast('Failed to update course.', 'danger');
      }
    } else {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await fetchCourses();
        showToast('Course added successfully!', 'success');
      } else {
        showToast('Failed to add course.', 'danger');
      }
    }
    setShowCourseModal(false);
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
      showToast('Course deleted successfully!', 'success');
    } else {
      showToast('Failed to delete course.', 'danger');
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setSelectedCourse(null);
    setShowCourseModal(true);
  };

  const handleEdit = (course: Course) => {
    setModalMode('edit');
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <div className="mb-4">
          <h1 className="mb-2">Dashboard Overview</h1>
          <p className="text-muted">Monitor course schedules, rooms, and lecturer assignments.</p>
        </div>

        <DashboardCards courses={courses} />

        <FilterBar
          searchTerm={searchTerm}
          selectedDay={selectedDay}
          onSearchChange={setSearchTerm}
          onDayChange={setSelectedDay}
          onAddClick={handleAdd}
        />

        <ScheduleTable
          courses={filteredCourses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CourseModal
          show={showCourseModal}
          mode={modalMode}
          course={selectedCourse}
          onHide={() => setShowCourseModal(false)}
          onSave={handleSaveCourse}
        />

        <AppToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
      </Container>
    </>
  );
}