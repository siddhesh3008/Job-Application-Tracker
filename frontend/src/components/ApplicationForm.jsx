/**
 * ApplicationForm Component
 * Form for adding/editing job applications
 */

import React, { useState, useEffect } from 'react';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

function ApplicationForm({ application, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        company_name: '',
        job_role: '',
        location: '',
        application_date: '',
        status: 'Applied',
        notes: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (application) {
            setFormData({
                ...application,
                application_date: application.application_date || '',
            });
        }
    }, [application]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.company_name.trim()) newErrors.company_name = 'Company name is required';
        if (!formData.job_role.trim()) newErrors.job_role = 'Job role is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.application_date) newErrors.application_date = 'Application date is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {application ? 'Edit Application' : 'Add New Application'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                className={`input-field ${errors.company_name ? 'border-red-500' : ''}`}
                                placeholder="e.g., Google"
                            />
                            {errors.company_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
                            )}
                        </div>

                        {/* Job Role */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Job Role <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="job_role"
                                value={formData.job_role}
                                onChange={handleChange}
                                className={`input-field ${errors.job_role ? 'border-red-500' : ''}`}
                                placeholder="e.g., Software Engineer"
                            />
                            {errors.job_role && (
                                <p className="text-red-500 text-xs mt-1">{errors.job_role}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`input-field ${errors.location ? 'border-red-500' : ''}`}
                                placeholder="e.g., San Francisco, CA"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                            )}
                        </div>

                        {/* Application Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Application Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="application_date"
                                value={formData.application_date}
                                onChange={handleChange}
                                className={`input-field ${errors.application_date ? 'border-red-500' : ''}`}
                            />
                            {errors.application_date && (
                                <p className="text-red-500 text-xs mt-1">{errors.application_date}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="input-field"
                            >
                                {STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Notes (Optional)
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="4"
                            className="input-field resize-none"
                            placeholder="Additional information..."
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            {application ? 'Update' : 'Create'} Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicationForm;
