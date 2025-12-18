/**
 * StatusBadge Component
 * Displays color-coded status badge
 */

import React from 'react';

const STATUS_COLORS = {
    'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
    'Interview': 'bg-amber-100 text-amber-800 border-amber-200',
    'Offer': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200',
};

function StatusBadge({ status }) {
    const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-200';

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
