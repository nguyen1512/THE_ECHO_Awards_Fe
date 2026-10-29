import { NextResponse } from 'next/server';
import { CAMPUSES_DATA } from '@/constants/campuses';
import { AWARDS_DATA } from '@/constants/awards';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      campuses: CAMPUSES_DATA,
      awards: AWARDS_DATA,
    },
  });
}
