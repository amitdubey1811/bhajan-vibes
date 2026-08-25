import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './layout/AppShell'
import Home from './pages/Home/Home'

const Bhajans = lazy(() => import('./pages/Bhajans/Bhajans'))
const MemoryMachine = lazy(() => import('./pages/MemoryMachine/MemoryMachine'))
const Doordarshan = lazy(() => import('./pages/Doordarshan/Doordarshan'))
const ComingSoon = lazy(() => import('./pages/ComingSoon/ComingSoon'))

const Fallback = () => (
  <div style={{
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(20 21 19)',
    color: 'rgb(228 223 211 / 0.3)',
    fontFamily: 'var(--font-label)',
    fontSize: '0.7rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  }}>
    Loading…
  </div>
)

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'bhajans',
        element: (
          <Suspense fallback={<Fallback />}>
            <Bhajans />
          </Suspense>
        ),
      },
      {
        path: 'memory-machine',
        element: (
          <Suspense fallback={<Fallback />}>
            <MemoryMachine />
          </Suspense>
        ),
      },
      {
        path: 'album',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
      {
        path: 'doordarshan',
        element: (
          <Suspense fallback={<Fallback />}>
            <Doordarshan />
          </Suspense>
        ),
      },
      {
        path: 'radio',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
      {
        path: 'drawer',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
      {
        path: 'letters',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Fallback />}>
            <ComingSoon />
          </Suspense>
        ),
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
