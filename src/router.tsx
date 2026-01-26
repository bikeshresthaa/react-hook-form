import { createRouter, Link } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';



const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultNotFoundComponent: () => (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">404</h1>
        <p>Page not found</p>
      </div>
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>

          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  )
  ,
})


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router };