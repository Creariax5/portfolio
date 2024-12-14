'use client';
import React from 'react';

export const ObjectTabs = ({ objects, activeTab, onTabChange, onAddObject, onDeleteObject }) => (
    <div className="flex gap-2 mb-4 items-center" role="tablist">
        {Object.keys(objects).map((objectName) => (
            <div key={objectName} className="relative group">
                <button
                    onClick={() => onTabChange(objectName)}
                    className={`px-4 py-2 rounded-t ${activeTab === objectName
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    {objectName.charAt(0).toUpperCase() + objectName.slice(1)}
                </button>

                <button
                    onClick={() => onDeleteObject(objectName)}
                    className="absolute -top-2 -right-2 hidden group-hover:block bg-red-500 text-white rounded-full w-4 h-4 text-xs"
                    aria-label={`Delete ${objectName}`}
                >
                    ×
                </button>
            </div>
        ))}
        <button
            onClick={onAddObject}
            className="px-3 py-1 rounded-t bg-gray-600 text-gray-300 hover:bg-gray-700"
            aria-label="Add new object"
        >
            +
        </button>
    </div>
);
