'use client';
import React from 'react';

export const NewObjectDialog = ({
    isOpen,
    objectName,
    onObjectNameChange,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-4">New Object</h3>
                <input
                    type="text"
                    value={objectName}
                    onChange={(e) => onObjectNameChange(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    placeholder="Enter object name"
                    className="w-full p-2 border rounded mb-4"
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-blue-500 text-white"
                        disabled={!objectName}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
