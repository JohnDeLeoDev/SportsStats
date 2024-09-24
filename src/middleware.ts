// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentRoute = request.nextUrl.pathname
    const response = NextResponse.next()
    response.headers.set('x-current-route', currentRoute)
    return response
}

export const config = {
    matcher: '/:path*',
}
