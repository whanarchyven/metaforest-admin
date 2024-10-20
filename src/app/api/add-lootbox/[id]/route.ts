import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log('PARAMS', id);

  const result = await axiosInstance.post(
    API.addLootbox,
    {},
    { headers: { Authorization: id } }
  );
  return NextResponse.json(result.data);
}

export const dynamic = 'force-dynamic';
