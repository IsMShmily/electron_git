import { Suspense } from 'react'
import Loading from '@renderer/components/basic/loading'
import PageError from '@renderer/views/404'
import HomePage from '@renderer/views/home'

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
    element: lazyLoad(HomePage)
  },

  {
    path: '*',
    element: <PageError />
  }
]

export default routes
