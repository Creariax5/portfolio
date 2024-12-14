import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const objectsDir = path.join(process.cwd(), 'objects');

        // Check if directory exists
        try {
            await fs.access(objectsDir);
        } catch {
            return NextResponse.json({ objects: {} });
        }

        // Read all files in the directory
        const files = await fs.readdir(objectsDir);
        const objects = {};

        for (const file of files) {
            if (file.endsWith('.js')) {
                const objectName = file.replace('.js', '');
                const filePath = path.join(objectsDir, file);
                const code = await fs.readFile(filePath, 'utf-8');
                objects[objectName] = code;
            }
        }

        return NextResponse.json({ objects });
    } catch (error) {
        console.error('Error loading code:', error);
        return NextResponse.json(
            { message: 'Error loading code', error: error.message },
            { status: 500 }
        );
    }
}
