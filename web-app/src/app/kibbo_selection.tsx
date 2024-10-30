import Toggle from "./toggle";
import Image from "next/image";
import OverrideService from "./override_service";

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
              <OverrideService
                overrideServiceName="1"
                toggleOverrideService={toggleOverrideService1}
                overrideService={toggleStates.overrideService1}
                toggleStates={toggleStates}
                toggleLogService={toggleLogService1}
                logService={toggleStates.logService1}
                toggleReplaceLogFileService={toggleReplaceLogFileService1}
                replaceLogFileService={toggleStates.replaceLogFileService1}
                toggleIncludeTimestampsService={toggleIncludeTimestampsService1}
                includeTimestampsService={
                  toggleStates.includeTimestampsService1
                }
              />
              <OverrideService
                overrideServiceName="2"
                toggleOverrideService={toggleOverrideService2}
                overrideService={toggleStates.overrideService2}
                toggleStates={toggleStates}
                toggleLogService={toggleLogService2}
                logService={toggleStates.logService2}
                toggleReplaceLogFileService={toggleReplaceLogFileService2}
                replaceLogFileService={toggleStates.replaceLogFileService2}
                toggleIncludeTimestampsService={toggleIncludeTimestampsService2}
                includeTimestampsService={
                  toggleStates.includeTimestampsService2
                }
              />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
