import React from 'react';
import { Project } from '../types';
import { Eye } from 'lucide-react';

interface ProjectDashboardProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
}

export default function ProjectDashboard({ projects, onViewProject }: ProjectDashboardProps) {
  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (progress >= 50) return 'bg-gradient-to-r from-brand-navy to-brand-maroon';
    if (progress > 0) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-brand-navy to-brand-maroon">
            {['Project Name', 'Start Date', 'End Date', 'Status', 'Assigned To', 'Progress', 'Actions'].map((header) => (
              <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-brand-navy">{project.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{project.startDate.toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{project.endDate.toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-brand-navy bg-opacity-10 text-brand-navy">
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{project.assignedTo || 'Unassigned'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => onViewProject(project)}
                  className="inline-flex items-center px-3 py-1.5 border border-brand-navy text-brand-navy rounded-md hover:bg-brand-navy hover:text-white transition-colors duration-200"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}