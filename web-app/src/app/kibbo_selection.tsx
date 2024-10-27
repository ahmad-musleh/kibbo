import Toggle from "./toggle";
import Image from "next/image";

export default function KibboSelection({
  toggleStates,
  toggleLogEverything,
  toggleReplaceLogFile,
  toggleIncludeTimestamps,
  toggleOverrideService1,
  toggleLogService1,
  toggleReplaceLogFileService1,
  toggleIncludeTimestampsService1,
  toggleOverrideService2,
  toggleLogService2,
  toggleReplaceLogFileService2,
  toggleIncludeTimestampsService2,
}: {
  toggleStates: any;
  toggleLogEverything: Function;
  toggleReplaceLogFile: Function;
  toggleIncludeTimestamps: Function;
  toggleOverrideService1: Function;
  toggleLogService1: Function;
  toggleReplaceLogFileService1: Function;
  toggleIncludeTimestampsService1: Function;
  toggleOverrideService2: Function;
  toggleLogService2: Function;
  toggleReplaceLogFileService2: Function;
  toggleIncludeTimestampsService2: Function;
}) {
  return (
    <>
      <div className="m-10 min-h-[650px] min-w-[600px] max-w-[600px] place-self-center rounded-lg bg-[#303030] lg:my-10 lg:ml-10 lg:mr-5 lg:place-self-end">
        <div className="p-10">
          <h2 className="-pt-3 pb-3">Kibbo global settings</h2>
          <ul>
            <li>
              <Toggle
                text="Log all services except what I specify not to log"
                override={true}
                state={toggleStates.logEverything}
                updateToggleState={toggleLogEverything}
              />
            </li>
            <li>
              <Toggle
                text="Replace log files upon updating service"
                override={true}
                state={toggleStates.replaceLogFile}
                updateToggleState={toggleReplaceLogFile}
              />
            </li>
            <li>
              <Toggle
                text="Include timestamps in log file"
                override={true}
                state={toggleStates.includeTimestamps}
                updateToggleState={toggleIncludeTimestamps}
              />
            </li>
          </ul>
          <div className="relative flex items-center px-10 py-5">
            <div className="flex-grow border-t border-gray-400" />
            <span className="mx-4 flex-shrink text-gray-400">
              Service level overrides
            </span>
            <div className="flex-grow border-t border-gray-400" />
          </div>
          <ul>
            <div className="grid grid-cols-2">
              <div className="group">
                <div className="">
                  <div className="group-hover:mx-5">
                    <div className="hidden rounded-md group-hover:block group-hover:h-64 group-hover:bg-[#337AC6]">
                      <div className="p-10 pt-20">
                        <h1 className="text-center text-2xl">
                          Click to override service 1
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="m-2 mb-0 ml-0 h-64 rounded-md px-5 group-hover:hidden">
                    <div className="flex">
                      <div className="py-1">
                        <h2>Example service 1</h2>
                      </div>
                    </div>
                    <div className="rounded-bl-md rounded-br-md pt-2">
                      <li>
                        {toggleStates.overrideService1 ? (
                          <Toggle
                            text="Log me"
                            override={false}
                            state={toggleStates.logService1}
                            updateToggleState={toggleLogService1}
                          />
                        ) : (
                          <Toggle
                            text="Log me"
                            state={toggleStates.logEverything}
                            updateToggleState={toggleLogService1}
                          />
                        )}
                      </li>
                      <li>
                        {toggleStates.overrideService1 ? (
                          <Toggle
                            text="Replace"
                            state={toggleStates.replaceLogFileService1}
                            updateToggleState={toggleReplaceLogFileService1}
                          />
                        ) : (
                          <Toggle
                            text="Replace"
                            state={toggleStates.replaceLogFile}
                            updateToggleState={toggleReplaceLogFileService1}
                          />
                        )}
                      </li>
                      <li>
                        {toggleStates.overrideService1 ? (
                          <Toggle
                            text="Timestamps"
                            state={toggleStates.includeTimestampsService1}
                            updateToggleState={toggleIncludeTimestampsService1}
                          />
                        ) : (
                          <Toggle
                            text="Timestamps"
                            state={toggleStates.includeTimestamps}
                            updateToggleState={toggleIncludeTimestampsService1}
                          />
                        )}
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="">
                  <div className="group-hover:mx-5">
                    <div className="hidden rounded-md group-hover:block group-hover:h-64 group-hover:bg-[#337AC6]">
                      <div className="p-10 pt-20">
                        <h1 className="text-center text-2xl">
                          Click to override service 2
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="m-2 mb-0 ml-0 h-64 rounded-md px-5 group-hover:hidden">
                    <div className="flex">
                      <div className="rounded-tl-md py-1">
                        <h2>Example service 2</h2>
                      </div>
                    </div>
                    <div className="rounded-bl-md rounded-br-md pt-2">
                      <li>
                        {toggleStates.overrideService2 ? (
                          <Toggle
                            text="Log me"
                            state={toggleStates.logService2}
                            updateToggleState={toggleLogService2}
                          />
                        ) : (
                          <Toggle
                            text="Log me"
                            state={toggleStates.logEverything}
                            updateToggleState={toggleLogService2}
                          />
                        )}
                      </li>
                      <li>
                        {toggleStates.overrideService2 ? (
                          <Toggle
                            text="Replace"
                            state={toggleStates.replaceLogFileService2}
                            updateToggleState={toggleReplaceLogFileService2}
                          />
                        ) : (
                          <Toggle
                            text="Replace"
                            state={toggleStates.replaceLogFile}
                            updateToggleState={toggleReplaceLogFileService2}
                          />
                        )}
                      </li>
                      <li>
                        {toggleStates.overrideService2 ? (
                          <Toggle
                            text="Timestamps"
                            state={toggleStates.includeTimestampsService2}
                            updateToggleState={toggleIncludeTimestampsService2}
                          />
                        ) : (
                          <Toggle
                            text="Timestamps"
                            state={toggleStates.includeTimestamps}
                            updateToggleState={toggleIncludeTimestampsService2}
                          />
                        )}
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
