'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './lib/constants';

export const Canvas = ({ onFrame, isPlaying }) => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const frameTimeRef = useRef(0);

    const clearCanvas = useCallback((ctx) => {
        if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = (timestamp) => {
            if (!isPlaying) return;

            // Limit frame rate to about 60fps
            if (timestamp - frameTimeRef.current < 16) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            frameTimeRef.current = timestamp;
            clearCanvas(ctx);

            try {
                onFrame(ctx, canvas);
            } catch (error) {
                console.error('Error in animation frame:', error);
                // Stop animation on error to prevent error spam
                cancelAnimationFrame(animationFrameRef.current);
                return;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        if (isPlaying) {
            clearCanvas(ctx);
            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            // Clear canvas when stopping
            clearCanvas(ctx);
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            clearCanvas(ctx);
        };
    }, [isPlaying, onFrame, clearCanvas]);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-gray-300 bg-white"
            aria-label="Animation canvas"
            style={{ imageRendering: 'pixelated' }}
        />
    );
};
