import Database from 'better-sqlite3';

const db = new Database('workflow.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS project_phases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    sequence INTEGER NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS task_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence REAL NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'Not Started',
    phase_id INTEGER,
    upload_required BOOLEAN DEFAULT 0,
    update_frequency TEXT DEFAULT 'Once',
    FOREIGN KEY (phase_id) REFERENCES project_phases (id)
  );
`);

// Insert initial data
const phases = [
  { name: 'Planning', sequence: 1, description: 'Initial project planning and setup' },
  { name: 'Design', sequence: 2, description: 'System and architecture design' },
  { name: 'Development', sequence: 3, description: 'Implementation and development' },
  { name: 'Testing', sequence: 4, description: 'Quality assurance and testing' },
  { name: 'Deployment', sequence: 5, description: 'Production deployment and handover' }
];

const insertPhase = db.prepare('INSERT INTO project_phases (name, sequence, description) VALUES (?, ?, ?)');
phases.forEach(phase => {
  insertPhase.run(phase.name, phase.sequence, phase.description);
});

const tasks = [
  { sequence: 1.00, name: 'Project Kick-Off', phase: 'Planning', upload_required: true, update_frequency: 'Once' },
  { sequence: 1.01, name: 'Kick-Off Meeting (Internal)', phase: 'Planning', upload_required: false, update_frequency: 'Once' }
];

const insertTask = db.prepare(`
  INSERT INTO task_templates (sequence, name, phase_id, upload_required, update_frequency)
  SELECT ?, ?, p.id, ?, ?
  FROM project_phases p
  WHERE p.name = ?
`);

tasks.forEach(task => {
  insertTask.run(task.sequence, task.name, task.upload_required ? 1 : 0, task.update_frequency, task.phase);
});

console.log('Database setup completed successfully!');