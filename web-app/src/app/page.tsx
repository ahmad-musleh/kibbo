import Image from 'next/image'
import CodeOutput from './code_output'
import KibboSelection from './kibbo_selection'
import Footer from './footer'


export default function Home() {
  return (
  <>
    <head>
      <title>Kibbo</title>
    </head>
    <body>
      <div className='lg:h-screen'>
        <div className='grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1'>
          <KibboSelection/>
          <CodeOutput/>
        </div>
        <Footer/>
      </div>
    </body>
  </>
  )
}
