'use client';
import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

export const useCodeEditor = (container, initialCode, onChange, onSave) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!container) return;

        const combinedKeymap = keymap.of([
            ...defaultKeymap,
            indentWithTab,
            {
                key: 'Mod-s',
                run: () => {
                    onSave?.();
                    return true;
                }
            }
        ]);

        const view = new EditorView({
            doc: initialCode,
            extensions: [
                basicSetup,
                javascript(),
                oneDark,
                combinedKeymap,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange?.(update.state.doc.toString());
                    }
                }),
                EditorView.theme({
                    '&': { height: '90vh' },
                    '.cm-scroller': {
                        overflow: 'auto',
                        maxHeight: 'calc(90vh)'
                    },
                    '.cm-content': {
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.6'
                    },
                    '.cm-line': {
                        padding: '0 4px'
                    }
                })
            ],
            parent: container
        });

        editorRef.current = view;

        // Focus and set cursor position after initialization
        view.focus();
        view.dispatch({
            selection: {
                anchor: view.state.doc.length
            }
        });

        return () => view.destroy();
    }, [container, onChange, onSave]);

    useEffect(() => {
        const view = editorRef.current;
        if (!view) return;

        const currentContent = view.state.doc.toString();
        if (initialCode !== currentContent) {
            view.dispatch({
                changes: {
                    from: 0,
                    to: view.state.doc.length,
                    insert: initialCode
                },
                // Maintain cursor position at the end after content update
                selection: {
                    anchor: initialCode.length
                }
            });
            // Ensure focus is maintained after content update
            view.focus();
        }
    }, [initialCode]);

    return editorRef;
};