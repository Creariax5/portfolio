import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(request) {
    try {
        const { objectName } = await request.json();
        const objectsDir = path.join(process.cwd(), 'objects');
        const filePath = path.join(objectsDir, `${objectName}.js`);

        try {
            await fs.unlink(filePath);
        } catch (error) {
            // If file doesn't exist, that's okay
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        return NextResponse.json({ message: 'Object deleted successfully' });
    } catch (error) {
        console.error('Error deleting object:', error);
        return NextResponse.json(
            { message: 'Error deleting object', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { objectName, code } = await request.json();

        // Create objects directory if it doesn't exist
        const objectsDir = path.join(process.cwd(), 'objects');
        try {
            await fs.access(objectsDir);
        } catch {
            await fs.mkdir(objectsDir);
        }

        // Save the code to a file
        const filePath = path.join(objectsDir, `${objectName}.js`);
        await fs.writeFile(filePath, code, 'utf-8');

        return NextResponse.json({ message: 'Code saved successfully' });
    } catch (error) {
        console.error('Error saving code:', error);
        return NextResponse.json(
            { message: 'Error saving code', error: error.message },
            { status: 500 }
        );
    }
}
