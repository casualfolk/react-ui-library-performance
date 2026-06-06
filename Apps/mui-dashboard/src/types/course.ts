export type CourseStatus = 'Active' | 'Pending' | 'Completed';

export interface Course {
  id: number;
  code: string;
  name: string;
  day: string;
  time: string;
  room: string;
  lecturer: string;
  status: CourseStatus;
}