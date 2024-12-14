'use client';
import React from 'react';

export const EditorControls = ({ isPlaying, onPlayToggle, onReset, onSave, debugInfo }) => (
    <div className="mb-4 flex gap-4 items-center">
        <button
            onClick={onPlayToggle}
            className={`px-4 py-2 rounded ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white`}
        >
            {isPlaying ? 'Stop' : 'Play'}
        </button>
        <button
            onClick={onReset}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
            Reset
        </button>
        <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
        >
            <span>Save & Run</span>
            <span className="text-xs opacity-75">(Ctrl+S)</span>
        </button>
        <div className="text-sm font-mono">{debugInfo}</div>
    </div>
);
