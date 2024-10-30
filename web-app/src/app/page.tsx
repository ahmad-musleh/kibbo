"use client";
import CodeOutput from "./code_output";
import KibboSelection from "./kibbo_selection";
import Footer from "./footer";
import { useState } from "react";

type AppProps = {
  toggles: {
    logEverything: boolean;
    replaceLogFile: boolean;
    includeTimestamps: boolean;
    logService1: boolean;
    replaceLogFileService1: boolean;
    includeTimestampsService1: boolean;
    logService2: boolean;
    replaceLogFileService2: boolean;
    includeTimestampsService2: boolean;
  };
};

export default function Home() {
  const [toggleStates, setToggleStates] = useState({
    logEverything: true,
    replaceLogFile: true,
    includeTimestamps: false,
    overrideService1: false,
    logService1: true,
    replaceLogFileService1: true,
    includeTimestampsService1: false,
    overrideService2: false,
    logService2: true,
    replaceLogFileService2: true,
    includeTimestampsService2: false,
  });

  function toggleLogEverything(): void {
    setToggleStates({
      ...toggleStates,
      logEverything: !toggleStates.logEverything,
    });
  }

  function toggleReplaceLogFile(): void {
    setToggleStates({
      ...toggleStates,
      replaceLogFile: !toggleStates.replaceLogFile,
    });
  }

  function toggleIncludeTimestamps(): void {
    setToggleStates({
      ...toggleStates,
      includeTimestamps: !toggleStates.includeTimestamps,
    });
  }

  function toggleOverrideService1(): void {
    setToggleStates({
      ...toggleStates,
      overrideService1: true,
    });
  }

  function toggleLogService1(): void {
    setToggleStates({
      ...toggleStates,
      logService1: !toggleStates.logService1,
    });
  }

  function toggleReplaceLogFileService1(): void {
    setToggleStates({
      ...toggleStates,
      replaceLogFileService1: !toggleStates.replaceLogFileService1,
    });
  }

  function toggleIncludeTimestampsService1(): void {
    setToggleStates({
      ...toggleStates,
      includeTimestampsService1: !toggleStates.includeTimestampsService1,
    });
  }

  function toggleOverrideService2(): void {
    setToggleStates({
      ...toggleStates,
      overrideService2: true,
    });
  }

  function toggleLogService2(): void {
    setToggleStates({
      ...toggleStates,
      logService2: !toggleStates.logService2,
    });
  }

  function toggleReplaceLogFileService2(): void {
    setToggleStates({
      ...toggleStates,
      replaceLogFileService2: !toggleStates.replaceLogFileService2,
    });
  }

  function toggleIncludeTimestampsService2(): void {
    setToggleStates({
      ...toggleStates,
      includeTimestampsService2: !toggleStates.includeTimestampsService2,
    });
  }

  return (
    <>
      <head>
        <title>Kibbo</title>
      </head>
      <body>
        <div className="lg:h-screen">
          <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <KibboSelection
              toggleStates={toggleStates}
              toggleLogEverything={toggleLogEverything}
              toggleReplaceLogFile={toggleReplaceLogFile}
              toggleIncludeTimestamps={toggleIncludeTimestamps}
              toggleOverrideService1={toggleOverrideService1}
              toggleLogService1={toggleLogService1}
              toggleReplaceLogFileService1={toggleReplaceLogFileService1}
              toggleIncludeTimestampsService1={toggleIncludeTimestampsService1}
              toggleOverrideService2={toggleOverrideService2}
              toggleLogService2={toggleLogService2}
              toggleReplaceLogFileService2={toggleReplaceLogFileService2}
              toggleIncludeTimestampsService2={toggleIncludeTimestampsService2}
            />
            <CodeOutput toggleStates={toggleStates} />
          </div>
          <Footer />
        </div>
      </body>
    </>
  );
}
