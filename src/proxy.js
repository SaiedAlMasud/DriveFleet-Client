import { NextResponse } from 'next/server'
import { auth } from './app/lib/auth'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if(!session && !session?.user){
    return NextResponse.redirect(new URL('/', request.url));
  }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: [
    '/profile/:path*',
    '/mybookings/:path*',
    '/addcar/:path*'
  ],
}