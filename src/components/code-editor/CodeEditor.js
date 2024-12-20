"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useCodeEditor } from './hooks/useCodeEditor';
import { useGameObjects } from './hooks/useGameObjects';
import { useCodeManagement } from './hooks/useCodeManagement';
import { useInitialLoad } from './hooks/useInitialLoad';
import { Canvas } from './Canvas';
import { EditorControls } from './EditorControls';
import { ObjectTabs } from './ObjectTabs';
import { NewObjectDialog } from './NewObjectDialog';
import { OBJECT_TEMPLATE } from './lib/defaultTemplates';

export const CodeCanvasEditor = () => {
    const [activeTab, setActiveTab] = useState('');
    const [firstCodes, setFirstCodes] = useState({});
    const [codes, setCodes] = useState({});
    const [debugInfo, setDebugInfo] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [showNewObjectDialog, setShowNewObjectDialog] = useState(false);
    const [newObjectName, setNewObjectName] = useState('');
    const editorContainerRef = useRef(null);
    const previousTabRef = useRef(null);
    const codeBackupRef = useRef({});

    const { handleCodeChange, handleSave, deleteObject } = useCodeManagement(
        codes,
        setCodes,
        firstCodes,
        activeTab,
        setActiveTab,
        setDebugInfo
    );

    const { executeFrame, resetAnimation } = useGameObjects(codes, setDebugInfo, setIsPlaying);

    useInitialLoad(setCodes, setFirstCodes, setActiveTab, setDebugInfo);

    // Create a wrapper for code changes that preserves content
    const handleEditorCodeChange = (newCode) => {
        // Store code in backup before changing
        codeBackupRef.current[activeTab] = newCode;
        handleCodeChange(newCode);
    };

    // Use CodeMirror editor hook
    const editorRef = useCodeEditor(
        editorContainerRef.current,
        firstCodes,
        codes[activeTab] || '',
        handleEditorCodeChange,
        handleSave
    );

    // Handle tab changes with content preservation
    const handleTabChange = (newTab) => {
        // First, save current content
        if (activeTab && editorRef.current) {
            const currentContent = editorRef.current.state.doc.toString();
            console.log(`Saving content for tab ${activeTab}`);
            setCodes(prev => ({
                ...prev,
                [activeTab]: currentContent
            }));
        }

        // Then set the new active tab
        setActiveTab(newTab);

        // Update editor content after tab change
        requestAnimationFrame(() => {
            if (editorRef.current) {
                editorRef.current.dispatch({
                    changes: {
                        from: 0,
                        to: editorRef.current.state.doc.length,
                        insert: codes[newTab] || ''
                    }
                });
            }
        });
    };

    // Ensure we clean up properly when deleting objects
    const handleDeleteObject = (objectName) => {
        delete codeBackupRef.current[objectName];
        deleteObject(objectName);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row flex-1">
                <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg">
                    <EditorControls
                        isPlaying={isPlaying}
                        onPlayToggle={() => setIsPlaying(!isPlaying)}
                        onReset={resetAnimation}
                        onSave={() => {
                            // Ensure we have the latest content before saving
                            if (editorRef.current) {
                                const currentContent = editorRef.current.state.doc.toString();
                                setCodes(prev => ({
                                    ...prev,
                                    [activeTab]: currentContent
                                }));
                            }
                            handleSave();
                        }}
                        debugInfo={debugInfo}
                    />
                    <Canvas
                        onFrame={executeFrame}
                        isPlaying={isPlaying}
                    />
                </div>

                <div className="w-full lg:w-1/2 p-4 bg-gray-800">
                    <ObjectTabs
                        objects={codes}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        onAddObject={() => setShowNewObjectDialog(true)}
                        onDeleteObject={handleDeleteObject}
                    />
                    <div
                        ref={editorContainerRef}
                        className="h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)] border border-gray-700 rounded overflow-hidden"
                    />
                </div>
            </div>

            <NewObjectDialog
                isOpen={showNewObjectDialog}
                objectName={newObjectName}
                onObjectNameChange={setNewObjectName}
                onConfirm={async () => {
                    if (newObjectName && !codes[newObjectName]) {
                        const newCode = OBJECT_TEMPLATE.replace(/objectName/g, newObjectName);
                        setCodes(prev => ({
                            ...prev,
                            [newObjectName]: newCode
                        }));
                        codeBackupRef.current[newObjectName] = newCode;
                        setActiveTab(newObjectName);
                        setShowNewObjectDialog(false);
                        setNewObjectName('');
                    }
                }}
                onCancel={() => {
                    setShowNewObjectDialog(false);
                    setNewObjectName('');
                }}
            />
        </div>
    );
};

export default CodeCanvasEditor;
