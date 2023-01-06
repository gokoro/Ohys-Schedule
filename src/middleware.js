// import { NextResponse, userAgent } from 'next/server'
// import isBot from 'isbot'

// export function middleware(req) {
//   const { ua } = userAgent(req)

//   if (isBot(ua)) {
//     const url = req.nextUrl.clone()
//     url.pathname = '/api/bot-protection'

//     return NextResponse.rewrite(url)
//   }
// }

// export const config = {
//   matcher: '/:path*',
// }
