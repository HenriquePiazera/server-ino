import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user)
      const publicPaths = [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
      ]
      const isPublicPath = publicPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      if (isPublicPath) {
        return true
      }

      if (nextUrl.pathname.startsWith('/onboarding')) {
        return isLoggedIn
      }

      const isProtectedRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/clients') ||
        nextUrl.pathname.startsWith('/appointments') ||
        nextUrl.pathname.startsWith('/records') ||
        nextUrl.pathname.startsWith('/payments') ||
        nextUrl.pathname.startsWith('/settings')

      if (isProtectedRoute) {
        return isLoggedIn
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
} satisfies NextAuthConfig
