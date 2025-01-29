'use client';
import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

export const useCodeEditor = (container, firstCodes, initialCode, onChange, onSave) => {
    const editorRef = useRef(null);

    useEffect(() => {
        console.log("container");
    }, [container]);
    useEffect(() => {
        console.log("firstCodes");
    }, [firstCodes]);
    useEffect(() => {
        console.log("onSave");
    }, [onSave]);

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

        return () => view.destroy();
    }, [container, firstCodes, onSave]);

    return editorRef;
};