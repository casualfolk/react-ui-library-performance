'use client';

import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Course } from '@/types/course';

interface Props {
  show: boolean;
  mode: 'add' | 'edit';
  course: Course | null;
  onHide: () => void;
  onSave: (course: Omit<Course, 'id'> | Course) => void;
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

export default function CourseModal({ show, mode, course, onHide, onSave }: Props) {
  const [formData, setFormData] = useState<Omit<Course, 'id'> | Course>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (show) {
      setFormData(mode === 'edit' && course ? course : emptyForm);
      setErrors({});
    }
  }, [show, mode, course]);

  const handleChange = (field: keyof Course, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const required: (keyof Course)[] = ['courseCode', 'courseName', 'lecturer', 'day', 'startTime', 'endTime', 'room', 'class'];
    required.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    if (formData.semester < 1 || formData.semester > 8) newErrors.semester = 'Semester must be 1–8';
    if (formData.credits < 1 || formData.credits > 6) newErrors.credits = 'Credits must be 1–6';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <div>
          <Modal.Title style={{ fontWeight: 700 }}>
            {mode === 'edit' ? 'Edit Course Schedule' : 'Add New Course Schedule'}
          </Modal.Title>
          <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
            {mode === 'edit' ? 'Update the course details below.' : 'Fill in the details to add a new course.'}
          </p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <Row className="g-3">
          {/* Course Code */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                value={formData.courseCode}
                onChange={(e) => handleChange('courseCode', e.target.value)}
                isInvalid={!!errors.courseCode}
              />
              <Form.Control.Feedback type="invalid">{errors.courseCode}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Course Name */}
          <Col xs={12} sm={8}>
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                value={formData.courseName}
                onChange={(e) => handleChange('courseName', e.target.value)}
                isInvalid={!!errors.courseName}
              />
              <Form.Control.Feedback type="invalid">{errors.courseName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Lecturer */}
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Lecturer</Form.Label>
              <Form.Control
                value={formData.lecturer}
                onChange={(e) => handleChange('lecturer', e.target.value)}
                isInvalid={!!errors.lecturer}
              />
              <Form.Control.Feedback type="invalid">{errors.lecturer}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Room */}
          <Col xs={12} sm={3}>
            <Form.Group>
              <Form.Label>Room</Form.Label>
              <Form.Control
                value={formData.room}
                onChange={(e) => handleChange('room', e.target.value)}
                isInvalid={!!errors.room}
              />
              <Form.Control.Feedback type="invalid">{errors.room}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Class */}
          <Col xs={12} sm={3}>
            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Form.Control
                value={formData.class}
                onChange={(e) => handleChange('class', e.target.value)}
                isInvalid={!!errors.class}
              />
              <Form.Control.Feedback type="invalid">{errors.class}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Day */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Select
                value={formData.day}
                onChange={(e) => handleChange('day', e.target.value)}
                isInvalid={!!errors.day}
              >
                <option value="">Select day</option>
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.day}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Start Time */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Select
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                isInvalid={!!errors.startTime}
              >
                <option value="">Select time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.startTime}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* End Time */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Select
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                isInvalid={!!errors.endTime}
              >
                <option value="">Select time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.endTime}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Semester */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={8}
                value={formData.semester}
                onChange={(e) => handleChange('semester', Number(e.target.value))}
                isInvalid={!!errors.semester}
              />
              <Form.Control.Feedback type="invalid">{errors.semester}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Credits / SKS */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Credits (SKS)</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={6}
                value={formData.credits}
                onChange={(e) => handleChange('credits', Number(e.target.value))}
                isInvalid={!!errors.credits}
              />
              <Form.Control.Feedback type="invalid">{errors.credits}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Status */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} style={{ fontWeight: 600 }}>
          {mode === 'edit' ? 'Save Changes' : 'Add Course'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}