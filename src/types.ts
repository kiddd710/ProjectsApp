export interface Task {
  id: string;
  name: string;
  sequence: number;
  phase: string;
  completionStatus: string;
  uploadRequired: boolean;
  reportType: string;
  updateFrequency: string;
  lastUpdated: Date;
  documents: string[];
  assignedTo?: string;
  startDate?: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  assignedTo: string;
  progress: number;
  tasks: Task[];
}

export type CompletionStatus = 'Not Started' | 'In Progress' | 'Partial Complete' | 'Complete' | 'Not Scheduled';

export interface TaskTemplate {
  id: string;
  sequence: number;
  name: string;
  phase: string;
  uploadRequired: boolean;
  updateFrequency: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  sequence: number;
  description: string;
}