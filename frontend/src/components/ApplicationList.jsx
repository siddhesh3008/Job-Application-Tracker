/**
 * ApplicationList Component
 * Displays table of all job applications with actions
 * Responsive: Table on desktop, cards on mobile
 */

import React from 'react';
import StatusBadge from './StatusBadge';

function ApplicationList({ applications, onEdit, onDelete, loading }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-12">
                <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No applications yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Get started by adding your first job application.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="table-header">Company</th>
                            <th className="table-header">Role</th>
                            <th className="table-header">Location</th>
                            <th className="table-header">Applied Date</th>
                            <th className="table-header">Status</th>
                            <th className="table-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                <td className="table-cell font-semibold text-gray-900">
                                    {app.company_name}
                                </td>
                                <td className="table-cell">{app.job_role}</td>
                                <td className="table-cell text-gray-600">{app.location}</td>
                                <td className="table-cell text-gray-600">
                                    {formatDate(app.application_date)}
                                </td>
                                <td className="table-cell">
                                    <StatusBadge status={app.status} />
                                </td>
                                <td className="table-cell">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(app)}
                                            className="px-3 py-1.5 text-sm font-medium text-primary-700 hover:text-primary-900 
                                       hover:bg-primary-50 rounded-md transition-colors"
                                            title="Edit application"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(app.id)}
                                            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 
                                       hover:bg-red-50 rounded-md transition-colors"
                                            title="Delete application"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {applications.map((app) => (
                    <div key={app.id} className="mobile-card animate-fade-in">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-base mb-1">
                                    {app.company_name}
                                </h3>
                                <p className="text-sm text-gray-700 font-medium">{app.job_role}</p>
                            </div>
                            <StatusBadge status={app.status} />
                        </div>

                        <div className="space-y-2 mb-3">
                            <div>
                                <p className="mobile-card-label">Location</p>
                                <p className="mobile-card-value">{app.location}</p>
                            </div>
                            <div>
                                <p className="mobile-card-label">Applied Date</p>
                                <p className="mobile-card-value">{formatDate(app.application_date)}</p>
                            </div>
                            {app.notes && (
                                <div>
                                    <p className="mobile-card-label">Notes</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{app.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                            <button
                                onClick={() => onEdit(app)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 
                                   rounded-lg hover:bg-primary-100 transition-colors active:scale-95 transform"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(app.id)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 
                                   rounded-lg hover:bg-red-100 transition-colors active:scale-95 transform"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ApplicationList;
