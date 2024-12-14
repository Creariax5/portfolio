"use client"
import { useRef, useCallback, useMemo, useEffect } from 'react';

export const useGameObjects = (codes, setDebugInfo, setIsPlaying) => {
    const gameObjectsRef = useRef({});
    const compiledFunctionsRef = useRef({});
    const debugUpdateTimeoutRef = useRef(null);

    // Cache compiled functions
    const compileFunctions = useMemo(() => {
        const newCompiledFunctions = {};

        Object.entries(codes).forEach(([key, code]) => {
            try {
                newCompiledFunctions[key] = new Function(
                    'ctx',
                    'canvas',
                    'currentObject',
                    `with(currentObject) {
                        ${code}
                        return currentObject;
                    }`
                );
            } catch (error) {
                console.error(`Error compiling code for ${key}:`, error);
                setDebugInfo(`Error compiling ${key}: ${error.message}`);
            }
        });

        return newCompiledFunctions;
    }, [codes]);

    const executeFrame = useCallback((ctx, canvas) => {
        try {
            const updatedObjects = { ...gameObjectsRef.current };

            Object.entries(compileFunctions).forEach(([key, func]) => {
                try {
                    const context = {
                        ctx,
                        canvas,
                        currentObject: updatedObjects[key] || {},
                    };

                    updatedObjects[key] = func(ctx, canvas, context.currentObject);
                } catch (error) {
                    console.error(`Error executing ${key}:`, error);
                    setDebugInfo(`Error in ${key}: ${error.message}`);
                }
            });

            gameObjectsRef.current = updatedObjects;

            // Throttle debug updates to every 100ms
            if (!debugUpdateTimeoutRef.current) {
                debugUpdateTimeoutRef.current = setTimeout(() => {
                    const debugStrings = Object.entries(updatedObjects)
                        .filter(([_, obj]) => obj && typeof obj === 'object' && 'x' in obj)
                        .map(([key, obj]) => `${key}: (${obj.x.toFixed(0)}, ${obj.y?.toFixed(0) || 'N/A'})`);

                    setDebugInfo(debugStrings.join(' | '));
                    debugUpdateTimeoutRef.current = null;
                }, 100);
            }
        } catch (error) {
            console.error('Error executing code:', error);
            setDebugInfo(`Error: ${error.message}`);
            setIsPlaying(false);
        }
    }, [compileFunctions, setDebugInfo, setIsPlaying]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debugUpdateTimeoutRef.current) {
                clearTimeout(debugUpdateTimeoutRef.current);
            }
        };
    }, []);

    const resetAnimation = useCallback(() => {
        gameObjectsRef.current = {};
        setDebugInfo('');
    }, [setDebugInfo]);

    return { executeFrame, resetAnimation };
};
