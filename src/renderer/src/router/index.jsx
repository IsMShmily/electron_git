import { Suspense } from 'react'
import Loading from '@renderer/components/basic/loading'
import PageError from '@renderer/views/404'
import HomePage from '@renderer/views/home'
import GlobalLayout from '@renderer/layout'
import { Navigate } from 'react-router-dom'

const lazyLoad = (Component) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

const routes = [
  {
    path: '/',
    element: <GlobalLayout />,

    children: [
      {
        index: true,
        element: <Navigate to="/home" />
      },
      {
        path: 'home',
        element: lazyLoad(HomePage)
      }
    ]
  },
  {
    path: '*',
    element: <PageError />
  }
]

export default routes
