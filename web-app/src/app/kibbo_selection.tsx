import Toggle from "./toggle";

export default function KibboSelection({
  toggleStates,
  toggleLogEverything,
  toggleReplaceLogFile,
  toggleIncludeTimestamps,
  toggleLogService1,
  toggleReplaceLogFileService1,
  toggleIncludeTimestampsService1,
  toggleLogService2,
  toggleReplaceLogFileService2,
  toggleIncludeTimestampsService2,
}: {
  toggleStates: any;
  toggleLogEverything: Function;
  toggleReplaceLogFile: Function;
  toggleIncludeTimestamps: Function;
  toggleLogService1: Function;
  toggleReplaceLogFileService1: Function;
  toggleIncludeTimestampsService1: Function;
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
                state={toggleStates.logEverything}
                updateToggleState={toggleLogEverything}
              />
            </li>
            <li>
              <Toggle
                text="Replace log files upon updating service"
                state={toggleStates.replaceLogFile}
                updateToggleState={toggleReplaceLogFile}
              />
            </li>
            <li>
              <Toggle
                text="Include timestamps in log file"
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
              <div className="m-2 mb-0 ml-0">
                <div className="flex">
                  <div className="py-1">
                    <h2>Example service 1</h2>
                  </div>
                </div>
                <div className="rounded-bl-md rounded-br-md pt-2">
                  <li>
                    <Toggle
                      text="Log me"
                      state={toggleStates.logService1}
                      updateToggleState={toggleLogService1}
                    />
                  </li>
                  <li>
                    <Toggle
                      text="Replace"
                      state={toggleStates.replaceLogFileService1}
                      updateToggleState={toggleReplaceLogFileService1}
                    />
                  </li>
                  <li>
                    <Toggle
                      text="Timestamps"
                      state={toggleStates.includeTimestampsService1}
                      updateToggleState={toggleIncludeTimestampsService1}
                    />
                  </li>
                </div>
              </div>
              <div className="m-2 mb-0 mr-0">
                <div className="flex">
                  <div className="rounded-tl-md py-1">
                    <h2>Example service 2</h2>
                  </div>
                </div>
                <div className="pt-2">
                  <li>
                    <Toggle
                      text="Log me"
                      state={toggleStates.logService2}
                      updateToggleState={toggleLogService2}
                    />
                  </li>
                  <li>
                    <Toggle
                      text="Replace"
                      state={toggleStates.replaceLogFileService2}
                      updateToggleState={toggleReplaceLogFileService2}
                    />
                  </li>
                  <li>
                    <Toggle
                      text="Timestamps"
                      state={toggleStates.includeTimestampsService2}
                      updateToggleState={toggleIncludeTimestampsService2}
                    />
                  </li>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
