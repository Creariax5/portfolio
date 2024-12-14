import { useEffect } from 'react';
import { DEFAULT_OBJECTS } from '../lib/defaultTemplates';

export const useInitialLoad = (setCodes, setActiveTab, setDebugInfo) => {
    useEffect(() => {
        const loadSavedCode = async () => {
            try {
                const response = await fetch('/games/api/load-code');
                const data = await response.json();

                if (data.objects && Object.keys(data.objects).length > 0) {
                    setCodes(data.objects);
                    setActiveTab(Object.keys(data.objects)[0]);
                    setDebugInfo('Loaded saved code ✓');
                } else {
                    setCodes(DEFAULT_OBJECTS);
                    setActiveTab('ball');
                    setDebugInfo('Using default objects');
                }
                setTimeout(() => setDebugInfo(''), 2000);
            } catch (error) {
                console.error('Error loading saved code:', error);
                setCodes(DEFAULT_OBJECTS);
                setActiveTab('ball');
                setDebugInfo('Error loading saved code, using defaults ✗');
                setTimeout(() => setDebugInfo(''), 2000);
            }
        };

        loadSavedCode();
    }, [setCodes, setActiveTab, setDebugInfo]);
};
