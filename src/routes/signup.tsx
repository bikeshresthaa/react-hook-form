import { createFileRoute } from '@tanstack/react-router'
import Signup from '../pages/SignUp'


export const Route = createFileRoute('/signup')({
  
  component: Signup,
})

