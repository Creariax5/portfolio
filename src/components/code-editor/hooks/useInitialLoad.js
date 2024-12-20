import { useEffect } from 'react';
import { DEFAULT_OBJECTS } from '../lib/defaultTemplates';

export const useInitialLoad = (setCodes, setFirstCodes, setActiveTab, setDebugInfo) => {
    useEffect(() => {
        console.log(useInitialLoad);
        const loadSavedCode = async () => {
            try {
                const response = await fetch('/games/api/load-code');
                const data = await response.json();

                if (data.objects && Object.keys(data.objects).length > 0) {
                    setFirstCodes(data.objects);
                    setCodes(data.objects);
                    setActiveTab(Object.keys(data.objects)[0]);
                    setDebugInfo('Loaded saved code ✓');
                } else {
                    setFirstCodes(DEFAULT_OBJECTS);
                    setCodes(DEFAULT_OBJECTS);
                    setActiveTab('ball');
                    setDebugInfo('Using default objects');
                }
                setTimeout(() => setDebugInfo(''), 2000);
            } catch (error) {
                console.error('Error loading saved code:', error);
                setFirstCodes(DEFAULT_OBJECTS);
                setCodes(DEFAULT_OBJECTS);
                setActiveTab('ball');
                setDebugInfo('Error loading saved code, using defaults ✗');
                setTimeout(() => setDebugInfo(''), 2000);
            }
        };

        loadSavedCode();
    }, [setFirstCodes, setActiveTab, setDebugInfo]);
};
