// import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.ua?.isBot) {
    return new Response('Bot detected.', {
      status: 400,
    })
  }
}

export const config = {
  matcher: '/*',
}
