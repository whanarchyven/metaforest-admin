import { NextResponse } from 'next/server';
import { axiosInstance } from '@/shared/api/axios';
import { API } from '@/shared/api/api';

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await axiosInstance.get(API.getGameSession(id));
  // console.log(result.data, `${process.env.BACKEND_URL}/getArticle/`);
  return NextResponse.json(result.data);
}
export const dynamic = 'force-dynamic';
