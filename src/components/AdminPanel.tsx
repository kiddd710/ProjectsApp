import React, { useState } from 'react';
import { Plus, ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskTemplate {
  id: string;
  sequence: number;
  name: string;
  status: string;
  phase: string;
  uploadRequired: boolean;
  updateFrequency: string;
}

interface ProjectPhase {
  id: string;
  name: string;
  sequence: number;
  description: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'phases'>('tasks');
  const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[]>([
    {
      id: '1',
      sequence: 1.00,
      name: 'Project Kick-Off',
      status: 'Not Started',
      phase: 'Planning',
      uploadRequired: true,
      updateFrequency: 'Once',
    },
    {
      id: '2',
      sequence: 1.01,
      name: 'Kick-Off Meeting (Internal)',
      status: 'Not Started',
      phase: 'Planning',
      uploadRequired: false,
      updateFrequency: 'Once',
    },
  ]);

  const [phases, setPhases] = useState<ProjectPhase[]>([
    { id: '1', name: 'Planning', sequence: 1, description: 'Initial project planning and setup' },
    { id: '2', name: 'Design', sequence: 2, description: 'System and architecture design' },
    { id: '3', name: 'Development', sequence: 3, description: 'Implementation and development' },
    { id: '4', name: 'Testing', sequence: 4, description: 'Quality assurance and testing' },
    { id: '5', name: 'Deployment', sequence: 5, description: 'Production deployment and handover' },
  ]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showPhaseForm, setShowPhaseForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskTemplate | null>(null);
  const [editingPhase, setEditingPhase] = useState<ProjectPhase | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      const newTask = {
        ...editingTask,
        id: editingTask.id || Date.now().toString(),
      };
      setTaskTemplates([...taskTemplates, newTask]);
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const handleAddPhase = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhase) {
      const newPhase = {
        ...editingPhase,
        id: editingPhase.id || Date.now().toString(),
      };
      setPhases([...phases, newPhase]);
      setEditingPhase(null);
      setShowPhaseForm(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTaskTemplates(taskTemplates.filter(task => task.id !== id));
  };

  const handleDeletePhase = (id: string) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center text-brand-navy hover:text-brand-maroon transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-brand-navy">Project Settings</h2>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tasks'
                ? 'border-brand-navy text-brand-navy'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Task Templates
          </button>
          <button
            onClick={() => setActiveTab('phases')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'phases'
                ? 'border-brand-navy text-brand-navy'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Project Phases
          </button>
        </nav>
      </div>

      {activeTab === 'tasks' ? (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setEditingTask({
                  id: '',
                  sequence: taskTemplates.length > 0 
                    ? Math.max(...taskTemplates.map(t => t.sequence)) + 0.01 
                    : 1.00,
                  name: '',
                  status: 'Not Started',
                  phase: phases[0]?.name || 'Planning',
                  uploadRequired: false,
                  updateFrequency: 'Once',
                });
                setShowTaskForm(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-maroon transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task Template
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-brand-navy to-brand-maroon">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Sequence</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Task Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Project Phase</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Requires Upload</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Update Frequency</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taskTemplates
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.sequence.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.phase}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.uploadRequired ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {task.updateFrequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {showTaskForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <form onSubmit={handleAddTask} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-brand-navy mb-6">Add Task Template</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sequence
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingTask?.sequence || ''}
                      onChange={(e) => setEditingTask({ ...editingTask!, sequence: Number(e.target.value) })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Description
                    </label>
                    <input
                      type="text"
                      value={editingTask?.name || ''}
                      onChange={(e) => setEditingTask({ ...editingTask!, name: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Phase
                    </label>
                    <select
                      value={editingTask?.phase || ''}
                      onChange={(e) => setEditingTask({ ...editingTask!, phase: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      {phases.map(phase => (
                        <option key={phase.id} value={phase.name}>{phase.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Frequency
                    </label>
                    <select
                      value={editingTask?.updateFrequency || ''}
                      onChange={(e) => setEditingTask({ ...editingTask!, updateFrequency: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="Once">Once</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingTask?.uploadRequired || false}
                      onChange={(e) => setEditingTask({ ...editingTask!, uploadRequired: e.target.checked })}
                      className="h-4 w-4 text-brand-navy focus:ring-brand-navy border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Requires Upload</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTask(null);
                      setShowTaskForm(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-maroon"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setEditingPhase({
                  id: '',
                  name: '',
                  sequence: phases.length > 0 ? Math.max(...phases.map(p => p.sequence)) + 1 : 1,
                  description: '',
                });
                setShowPhaseForm(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-maroon transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project Phase
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-brand-navy to-brand-maroon">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Sequence</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Phase Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {phases
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((phase) => (
                    <tr key={phase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{phase.sequence}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{phase.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{phase.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeletePhase(phase.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {showPhaseForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <form onSubmit={handleAddPhase} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-brand-navy mb-6">Add Project Phase</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sequence
                    </label>
                    <input
                      type="number"
                      value={editingPhase?.sequence || ''}
                      onChange={(e) => setEditingPhase({ ...editingPhase!, sequence: Number(e.target.value) })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phase Name
                    </label>
                    <input
                      type="text"
                      value={editingPhase?.name || ''}
                      onChange={(e) => setEditingPhase({ ...editingPhase!, name: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editingPhase?.description || ''}
                      onChange={(e) => setEditingPhase({ ...editingPhase!, description: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPhase(null);
                      setShowPhaseForm(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-maroon"
                  >
                    Save Phase
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}