import * as React from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'

import ArrowLink from '@/components/Links/ArrowLink'
import Seo from '@/components/Seo'
import Typography from '@/components/Typography'
import Layout from '@/components/Layout'

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />
      <main>
        <section className="bg-white">
          <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
            <RiCloseCircleFill
              size={60}
              className="drop-shadow-glow animate-flicker text-red-500"
            />
            <Typography className="mt-4" as="h1" variant="j1">
              This page could not be found
            </Typography>
            <Typography
              className="mt-4 hover:rounded-md hover:px-3 hover:py3 hover:text-white hover:bg-synapsis-primary"
              variant="b1"
            >
              <ArrowLink href="/">Back to home</ArrowLink>
            </Typography>
          </div>
        </section>
      </main>
    </Layout>
  )
}
