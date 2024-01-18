import Layout from '@/components/Layout'
import Seo from '@/components/Seo'

export default function () {
  return (
    <Layout>
      <Seo templateTitle="Beranda" />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Beranda</h1>
        <p className="text-xl text-gray-600">synapsis</p>
      </div>
    </Layout>
  )
}
