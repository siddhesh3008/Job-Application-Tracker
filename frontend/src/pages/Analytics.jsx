/**
 * Analytics Page
 * Dashboard with charts and statistics
 */

import React, { useState, useEffect } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { applicationService } from '../services/api';

const STATUS_COLORS = {
    Applied: '#3b82f6',
    Interview: '#f59e0b',
    Offer: '#10b981',
    Rejected: '#ef4444',
};

function Analytics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await applicationService.getStats();
            setStats(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    if (!stats || stats.total_applications === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
                <p className="text-gray-600">Add some applications to see analytics.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Insights into your job search progress</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">
                        Total Applications
                    </h3>
                    <p className="text-4xl font-bold mt-2">{stats.total_applications}</p>
                </div>

                {stats.status_breakdown.map((item) => (
                    <div
                        key={item.status}
                        className="card"
                        style={{
                            borderLeft: `4px solid ${STATUS_COLORS[item.status]}`,
                        }}
                    >
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                            {item.status}
                        </h3>
                        <p className="text-4xl font-bold mt-2" style={{ color: STATUS_COLORS[item.status] }}>
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Status Distribution */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Application Status Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.status_breakdown}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={(entry) => `${entry.status}: ${entry.count}`}
                            >
                                {stats.status_breakdown.map((entry) => (
                                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Trend */}
                {stats.monthly_trend && stats.monthly_trend.length > 0 && (
                    <div className="card">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Applications Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.monthly_trend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#0ea5e9" name="Applications" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Top Companies */}
            {stats.top_companies && stats.top_companies.length > 0 && (
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Top Companies Applied To</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.top_companies} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="company_name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8b5cf6" name="Applications" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default Analytics;
