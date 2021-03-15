import Routes from './routes'

import { AuthProvider } from './contexts/auth'

export default function App (): JSX.Element {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
