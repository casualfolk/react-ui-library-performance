'use client';

import { Card, Col, Row } from 'react-bootstrap';
import { Course } from '@/types/course';

interface Props {
  courses: Course[];
}

export default function DashboardCards({ courses }: Props) {
  const totalCourses = courses.length;
  const totalLecturers = new Set(courses.map((c) => c.lecturer)).size;
  const totalRooms = new Set(courses.map((c) => c.room)).size;

  const stats = [
    { title: 'Total Courses', value: totalCourses },
    { title: 'Total Lecturers', value: totalLecturers },
    { title: 'Available Rooms', value: totalRooms },
  ];

  return (
    <Row className="mb-4">
      {stats.map((stat) => (
        <Col md={4} key={stat.title} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">{stat.title}</Card.Subtitle>
              <Card.Title style={{ fontSize: '2rem' }}>{stat.value}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}