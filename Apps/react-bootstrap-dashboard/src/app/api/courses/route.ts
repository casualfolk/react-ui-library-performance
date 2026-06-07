import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');

function readCourses() {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeCourses(data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all courses
export async function GET() {
  try {
    const courses = readCourses();
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json({ error: 'Failed to read courses' }, { status: 500 });
  }
}

// POST - add new course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const courses = readCourses();
    const newId = courses.length > 0 ? Math.max(...courses.map((c: { id: number }) => c.id)) + 1 : 1;
    const newCourse = { id: newId, ...body };
    courses.push(newCourse);
    writeCourses(courses);
    return NextResponse.json(newCourse, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add course' }, { status: 500 });
  }
}

// PUT - update course
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const courses = readCourses();
    const index = courses.findIndex((c: { id: number }) => c.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    courses[index] = body;
    writeCourses(courses);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE - delete course
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const courses = readCourses();
    const filtered = courses.filter((c: { id: number }) => c.id !== id);
    if (filtered.length === courses.length) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    writeCourses(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
