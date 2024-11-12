import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Task, CompletionStatus } from '../types';
import TaskDetails from './TaskDetails';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: CompletionStatus) => void;
  onFileUpload: (taskId: string, file: File) => void;
}

export default function TaskList({ tasks, onStatusChange, onFileUpload }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'text-emerald-700';
      case 'Partial Complete':
        return 'text-amber-700';
      case 'In Progress':
        return 'text-blue-700';
      case 'Pending':
        return 'text-orange-700';
      case 'Not Scheduled':
        return 'text-gray-700';
      default:
        return 'text-red-700';
    }
  };

  if (selectedTask) {
    return (
      <TaskDetails
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        onStatusChange={onStatusChange}
        onFileUpload={onFileUpload}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-brand-navy to-brand-maroon">
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Sequence</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Task Description</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Project Phase</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Requires Upload</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Next Update Due</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-white">Action Needed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tasks.map((task) => (
            <tr 
              key={task.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                {task.sequence.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {task.name}
              </td>
              <td className="px-4 py-4 text-sm">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.completionStatus)}`}>
                  {task.completionStatus}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {task.phase}
              </td>
              <td className="px-4 py-4 text-sm text-center">
                {task.uploadRequired ? 'Yes' : 'No'}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {task.updateFrequency === 'Once' ? 'N/A' : task.updateFrequency}
              </td>
              <td className="px-4 py-4 text-sm text-brand-maroon">
                {task.completionStatus === 'Not Started' ? 'Schedule Task' : 'Review Status'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}