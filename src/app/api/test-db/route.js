import connectDB from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ message: 'Database connected successfully' }, { status: 200 });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json(
            { message: 'Database connection failed', error: error.message },
            { status: 500 }
        );
    }
}
