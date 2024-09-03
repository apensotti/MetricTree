import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const csvPath = path.join(process.cwd(), 'public', 'metric_tree.csv');

  try {
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    const response = new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET', 
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to load CSV file' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}