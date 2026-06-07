'use client';

import { Button, Modal } from 'react-bootstrap';
import { Course } from '@/types/course';

interface Props {
  show: boolean;
  course: Course | null;
  onHide: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ show, course, onHide, onConfirm }: Props) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete{' '}
        <strong>{course?.courseCode} - {course?.courseName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}