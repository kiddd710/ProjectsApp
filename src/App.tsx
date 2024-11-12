import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Project, Task } from './types';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import ProjectDashboard from './components/ProjectDashboard';
import AdminPanel from './components/AdminPanel';
import { Settings } from 'lucide-react';

// Sample project data remains the same...
const sampleProject: Project = {
  id: '1',
  name: 'Manufacturing Line Automation',
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-12-31'),
  status: 'In Progress',
  assignedTo: 'Dante Lozano',
  progress: 35,
  tasks: [
    {
      id: '1',
      name: 'Project Kick-Off',
      sequence: 1.00,
      phase: 'Planning',
      completionStatus: 'Complete',
      uploadRequired: true,
      reportType: 'Status Update',
      updateFrequency: 'Once',
      lastUpdated: new Date('2024-01-15'),
      documents: ['https://example.com/kickoff-doc'],
    },
    // ... other tasks remain the same
  ],
};

function App() {
  const [projects, setProjects] = useState<Project[]>([sampleProject]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleProjectCreate = ({ name, startDate, endDate }: { name: string; startDate: string; endDate: string }) => {
    const defaultTasks: Task[] = [
      {
        id: '1',
        name: 'Project Kick-Off',
        sequence: 1.00,
        phase: 'Planning',
        completionStatus: 'Not Started',
        uploadRequired: false,
        reportType: 'Status Update',
        updateFrequency: 'Once',
        lastUpdated: new Date(),
        documents: [],
      },
      // ... other default tasks remain the same
    ];

    const newProject: Project = {
      id: Date.now().toString(),
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'Planning',
      assignedTo: 'Unassigned',
      progress: 0,
      tasks: defaultTasks,
    };

    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  const handleStatusChange = (taskId: string, status: string) => {
    if (!selectedProject) return;

    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.map((task) =>
        task.id === taskId ? { ...task, completionStatus: status, lastUpdated: new Date() } : task
      ),
    };

    setSelectedProject(updatedProject);
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  const handleFileUpload = (taskId: string, file: File) => {
    if (!selectedProject) return;

    const fakeUrl = URL.createObjectURL(file);
    const updatedProject = {
      ...selectedProject,
      tasks: selectedProject.tasks.map((task) =>
        task.id === taskId ? { ...task, documents: [...task.documents, fakeUrl] } : task
      ),
    };

    setSelectedProject(updatedProject);
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <img 
                    src="https://i.ibb.co/Xz7SWDq/Wipro-PARI-logo.png" 
                    alt="Wipro PARI Logo" 
                    className="h-12 w-auto"
                  />
                </Link>
                <h1 className="text-2xl font-bold text-brand-navy">Project Workflow Manager</h1>
              </div>
              <div className="flex items-center space-x-4">
                {!showForm && !selectedProject && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-brand-navy to-brand-maroon text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
                  >
                    New Project
                  </button>
                )}
                <Link
                  to="/admin"
                  className="p-2 text-brand-navy hover:text-brand-maroon transition-colors"
                  title="Admin Settings"
                >
                  <Settings className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route 
              path="/" 
              element={
                showForm ? (
                  <div className="flex justify-center items-center min-h-[60vh]">
                    <ProjectForm onSubmit={handleProjectCreate} />
                  </div>
                ) : selectedProject ? (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-brand-navy mb-2">{selectedProject.name}</h2>
                        <div className="flex space-x-4 text-sm text-brand-dark">
                          <span>Start: {selectedProject.startDate.toLocaleDateString()}</span>
                          <span>End: {selectedProject.endDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="px-4 py-2 bg-white border border-brand-navy text-brand-navy rounded-lg shadow-sm hover:bg-brand-navy hover:text-white transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
                      >
                        Back to Dashboard
                      </button>
                    </div>

                    <TaskList
                      tasks={selectedProject.tasks}
                      onStatusChange={handleStatusChange}
                      onFileUpload={handleFileUpload}
                    />
                  </div>
                ) : (
                  <ProjectDashboard
                    projects={projects}
                    onViewProject={setSelectedProject}
                  />
                )
              } 
            />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;