import * as React from 'react'
import { useLoading } from '@/hooks/useLoading'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Loading from '../Loading'

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoading = useLoading()

  return (
    <div>
      {isLoading && <Loading />}
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
