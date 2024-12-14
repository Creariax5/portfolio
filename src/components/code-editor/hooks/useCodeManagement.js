import { useState, useCallback, useEffect } from 'react';

export const useCodeManagement = (
    codes,
    setCodes,
    activeTab,
    setActiveTab,
    setDebugInfo
) => {
    // Force callback updates when active tab changes
    const [updateCounter, setUpdateCounter] = useState(0);
    useEffect(() => {
        setUpdateCounter(prev => prev + 1);
    }, [activeTab]);

    // Handle code changes for the current tab
    const handleCodeChange = useCallback((newCode) => {
        setCodes(prev => ({
            ...prev,
            [activeTab]: newCode
        }));
    }, [activeTab, setCodes, updateCounter]);

    // Save code to the server
    const handleSave = useCallback(async () => {
        try {
            await fetch('/games/api/save-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    objectName: activeTab,
                    code: codes[activeTab]
                }),
            });
            setDebugInfo('Code saved and restarted ✓');
        } catch (error) {
            console.error('Error saving code:', error);
            setDebugInfo('Error saving code ✗');
        } finally {
            setTimeout(() => setDebugInfo(''), 2000);
        }
    }, [activeTab, codes, setDebugInfo, updateCounter]);

    // Delete an object and switch to the next available tab
    const deleteObject = useCallback(async (objectName) => {
        try {
            // Update local state
            const newCodes = { ...codes };
            delete newCodes[objectName];
            window[objectName] = null;

            // Switch to next available tab
            const nextTab = Object.keys(newCodes)[0];
            setCodes(newCodes);
            setActiveTab(nextTab);

            // Update server
            await fetch('/games/api/save-code', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ objectName })
            });
            setDebugInfo(`Deleted ${objectName} ✓`);
        } catch (error) {
            console.error('Error deleting object:', error);
            setDebugInfo(`Error deleting ${objectName} ✗`);
        } finally {
            setTimeout(() => setDebugInfo(''), 2000);
        }
    }, [codes, setCodes, setActiveTab, setDebugInfo]);

    return { handleCodeChange, handleSave, deleteObject };
};
