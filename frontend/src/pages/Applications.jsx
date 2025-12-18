/**
 * Applications Page
 * Main page for managing job applications
 */

import React, { useState, useEffect } from 'react';
import ApplicationList from '../components/ApplicationList';
import ApplicationForm from '../components/ApplicationForm';
import { applicationService } from '../services/api';

function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingApp, setEditingApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await applicationService.getApplications();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setEditingApp(null);
        setShowForm(true);
    };

    const handleEditClick = (application) => {
        setEditingApp(application);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingApp) {
                await applicationService.updateApplication(editingApp.id, formData);
            } else {
                await applicationService.createApplication(formData);
            }
            setShowForm(false);
            setEditingApp(null);
            fetchApplications();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) {
            return;
        }

        try {
            await applicationService.deleteApplication(id);
            fetchApplications();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingApp(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                    <p className="text-gray-600 mt-1">Manage and track all your job applications</p>
                </div>
                <button onClick={handleAddClick} className="btn-primary">
                    <span className="text-lg mr-1">+</span> Add Application
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="card">
                <ApplicationList
                    applications={applications}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </div>

            {showForm && (
                <ApplicationForm
                    application={editingApp}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}
        </div>
    );
}

export default Applications;
