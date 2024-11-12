import Database from 'better-sqlite3';
import { TaskTemplate, ProjectPhase } from '../types';

const db = new Database('workflow.db');

export const getProjectPhases = (): ProjectPhase[] => {
  const stmt = db.prepare('SELECT * FROM project_phases ORDER BY sequence');
  return stmt.all().map(phase => ({
    id: phase.id.toString(),
    name: phase.name,
    sequence: phase.sequence,
    description: phase.description
  }));
};

export const getTaskTemplates = (): TaskTemplate[] => {
  const stmt = db.prepare(`
    SELECT t.*, p.name as phase_name
    FROM task_templates t
    JOIN project_phases p ON t.phase_id = p.id
    ORDER BY t.sequence
  `);
  return stmt.all().map(task => ({
    id: task.id.toString(),
    sequence: task.sequence,
    name: task.name,
    phase: task.phase_name,
    uploadRequired: Boolean(task.upload_required),
    updateFrequency: task.update_frequency
  }));
};

export const addProjectPhase = (phase: Omit<ProjectPhase, 'id'>): ProjectPhase => {
  const stmt = db.prepare('INSERT INTO project_phases (name, sequence, description) VALUES (?, ?, ?)');
  const result = stmt.run(phase.name, phase.sequence, phase.description);
  return { ...phase, id: result.lastInsertRowid.toString() };
};

export const addTaskTemplate = (task: Omit<TaskTemplate, 'id'>): TaskTemplate => {
  const stmt = db.prepare(`
    INSERT INTO task_templates (sequence, name, phase_id, upload_required, update_frequency)
    SELECT ?, ?, p.id, ?, ?
    FROM project_phases p
    WHERE p.name = ?
  `);
  const result = stmt.run(
    task.sequence,
    task.name,
    task.uploadRequired ? 1 : 0,
    task.updateFrequency,
    task.phase
  );
  return { ...task, id: result.lastInsertRowid.toString() };
};

export const deleteProjectPhase = (id: string): void => {
  const stmt = db.prepare('DELETE FROM project_phases WHERE id = ?');
  stmt.run(id);
};

export const deleteTaskTemplate = (id: string): void => {
  const stmt = db.prepare('DELETE FROM task_templates WHERE id = ?');
  stmt.run(id);
};