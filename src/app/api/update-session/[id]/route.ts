import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('PARAMS', 'SUKA AUE');
  const { id } = params;
  console.log('PARAMS', id, 'SUKA AUE');

  const body = await request.json();

  const result = await axiosInstance.post(API.updateGameSession(id), body);
  return NextResponse.json(result.data);
}
export const dynamic = 'force-dynamic';
