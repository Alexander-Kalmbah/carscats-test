import { NextResponse } from 'next/server';

/**
 * @type {import('next/server').NextMiddleware}
 */
export function middleware(req) {
  const response = NextResponse.next();


  return response;
};