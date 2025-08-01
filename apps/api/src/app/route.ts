import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: `Hello world! ${process.env.NEXT_PUBLIC_HOST_URL}`,
  });
}
