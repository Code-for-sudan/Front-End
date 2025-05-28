import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className='text-4xl font-bold text-primary'>اهلا بك في سودا مول</h1>
        </div>
    </QueryClientProvider>
  )
}

export default App
