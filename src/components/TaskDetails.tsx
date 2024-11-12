import React from 'react';
import { ArrowLeft, Upload, Clock, Calendar } from 'lucide-react';
import { Task } from '../types';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
  onStatusChange: (taskId: string, status: string) => void;
  onFileUpload: (taskId: string, file: File) => void;
}

interface UpdateEntry {
  date: string;
  status: string;
  comments: string;
  updatedBy: string;
}

const mockUpdates: UpdateEntry[] = [
  {
    date: '2024-11-05',
    status: 'In Progress',
    comments: 'Initial budget review completed',
    updatedBy: 'Dante Lozano'
  }
];

export default function TaskDetails({ task, onBack, onStatusChange, onFileUpload }: TaskDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center text-brand-navy hover:text-brand-maroon transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Task List
        </button>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.completionStatus)}`}>
          {task.completionStatus}
        </div>
      </div>

      {/* Task Details Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy mb-6">Task Details</h2>
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                {[
                  { label: 'Task Name', value: task.name },
                  { label: 'Sequence', value: task.sequence.toFixed(2) },
                  { label: 'Project Phase', value: task.phase },
                  { label: 'Status', value: task.completionStatus },
                  { label: 'Assigned To', value: 'Dante Lozano' },
                  { label: 'Start Date', value: '2024-11-05' },
                  { label: 'Due Date', value: '2024-11-10' },
                  { label: 'Upload Required', value: task.uploadRequired ? 'Yes' : 'No' },
                  { label: 'Update Frequency', value: task.updateFrequency },
                  { label: 'Next Update Due', value: '2024-11-06' }
                ].map(({ label, value }) => (
                  <tr key={label} className="group">
                    <td className="py-3 text-sm font-medium text-gray-500 w-1/3">{label}</td>
                    <td className="py-3 text-sm text-gray-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {task.uploadRequired && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-brand-navy mb-4">Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand-navy border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-brand-navy" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileUpload(task.id, file);
                      }}
                    />
                  </label>
                </div>
                {task.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-600">Document {index + 1}</span>
                    <a
                      href={doc}
                      className="text-brand-navy hover:text-brand-maroon text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Update History</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockUpdates.map((update, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{update.date}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(update.status)}`}>
                          {update.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{update.comments}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{update.updatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Add Update</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-navy focus:border-brand-navy"
                  value={task.completionStatus}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  id="comments"
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-navy focus:border-brand-navy"
                  placeholder="Add your update comments here..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-navy hover:bg-brand-maroon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy transition-colors"
              >
                Submit Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}