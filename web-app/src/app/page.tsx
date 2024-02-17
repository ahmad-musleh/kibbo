'use client';
import CodeOutput from './code_output';
import KibboSelection from './kibbo_selection';
import Footer from './footer';
import { useState } from 'react';

type AppProps = {
  toggles: {
    logEverything: boolean,
    replaceLogFile: boolean,
    includeTimestamps: boolean,
  }
}

export default function Home() {

  const [toggleStates, setToggleStates] = useState({
    logEverything: true,
    replaceLogFile: true,
    includeTimestamps: false,
  });

  function toggleLogEverything() : void {
    setToggleStates({
      ...toggleStates,
      logEverything: !(toggleStates.logEverything),
    })
  }

  function toggleReplaceLogFile() : void {
    setToggleStates({
      ...toggleStates,
      replaceLogFile: !(toggleStates.replaceLogFile),
    })
  }

  function toggleIncludeTimestamps() : void {
    setToggleStates({
      ...toggleStates,
      includeTimestamps: !(toggleStates.includeTimestamps),
    })
  }

  return (
  <>
    <head>
      <title>Kibbo</title>
    </head>
    <body>
      <div className='lg:h-screen'>
        <div className='grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1'>
          <KibboSelection
            toggleStates={toggleStates}
            toggleLogEverything={toggleLogEverything}
            toggleReplaceLogFile={toggleReplaceLogFile}
            toggleIncludeTimestamps={toggleIncludeTimestamps}
          />
          <CodeOutput toggleStates={toggleStates}/>
        </div>
        <Footer/>
      </div>
    </body>
  </>
  )
}
