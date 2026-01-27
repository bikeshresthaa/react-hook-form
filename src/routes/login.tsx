import { createFileRoute, redirect } from '@tanstack/react-router'
import Login from '../pages/Login'


export const Route = createFileRoute('/login')({
  validateSearch: (search): { redirect?: string } => ({
    redirect: search.redirect as string | undefined
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/dashboard' })
    }
  },
  component: Login,
})