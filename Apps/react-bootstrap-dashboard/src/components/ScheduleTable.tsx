'use client';

import { Badge, Button, Card, Table, Modal } from 'react-bootstrap';
import { Course } from '@/types/course';
import { useState } from 'react';

interface Props {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export default function ScheduleTable({ courses, onEdit, onDelete }: Props) {
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Schedule List</h4>
            <Badge bg="primary" pill>
              {courses.length} Records
            </Badge>
          </div>

          {courses.length === 0 && (
            <p className="text-center text-muted py-4">No courses found.</p>
          )}

          {courses.length > 0 && (
            <div className="table-responsive">
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Course</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Lecturer</th>
                    <th>Sem</th>
                    <th>SKS</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.courseCode}</td>
                      <td>{course.courseName}</td>
                      <td>{course.day}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{course.startTime} – {course.endTime}</td>
                      <td>{course.room}</td>
                      <td>{course.lecturer}</td>
                      <td>{course.semester}</td>
                      <td>{course.credits}</td>
                      <td>
                        <Badge bg={course.status === 'Scheduled' ? 'success' : course.status === 'Cancelled' ? 'danger' : 'warning'}>
                          {course.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => onEdit(course)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => setDeleteTarget(course)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={!!deleteTarget} onHide={() => setDeleteTarget(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{' '}
          <strong>{deleteTarget?.courseName}</strong> ({deleteTarget?.courseCode})?{' '}
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}