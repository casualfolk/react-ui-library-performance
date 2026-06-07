'use client';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';

interface Props {
  searchTerm: string;
  selectedDay: string;
  onSearchChange: (value: string) => void;
  onDayChange: (value: string) => void;
  onAddClick: () => void;
}

const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function FilterBar({
  searchTerm,
  selectedDay,
  onSearchChange,
  onDayChange,
  onAddClick,
}: Props) {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Group>
              <Form.Label>Search course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search course"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by day</Form.Label>
              <Form.Select
                value={selectedDay}
                onChange={(e) => onDayChange(e.target.value)}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <div className="d-grid">
              <Button variant="primary" onClick={onAddClick}>
                Add Schedule
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}