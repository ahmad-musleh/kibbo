import Toggle from "./toggle";

export default function OverrideService({
  overrideServiceName,
  toggleOverrideService,
  overrideService,
  toggleStates,
  toggleLogService,
  logService,
  toggleReplaceLogFileService,
  replaceLogFileService,
  toggleIncludeTimestampsService,
  includeTimestampsService,
}: {
  overrideServiceName: string;
  toggleOverrideService: Function;
  overrideService: boolean;
  toggleStates: any;
  toggleLogService: Function;
  logService: boolean;
  toggleReplaceLogFileService: Function;
  replaceLogFileService: boolean;
  toggleIncludeTimestampsService: Function;
  includeTimestampsService: boolean;
}) {
  return (
    <>
      <div className="group">
        <div className="">
          <div className={overrideService ? "" : "group-hover:mx-5"}>
            <div
              //   className="hidden rounded-md group-hover:block group-hover:h-64 group-hover:bg-[#337AC6]"
              className={
                overrideService
                  ? "hidden"
                  : "hidden rounded-md group-hover:block group-hover:h-64 group-hover:bg-[#337AC6]"
              }
              onClick={() => toggleOverrideService()}
            >
              <div className="p-10 pt-20">
                <h1 className="text-center text-2xl">
                  Click to override service {overrideServiceName}
                </h1>
              </div>
            </div>
          </div>
          {/* <div className="m-2 mb-0 ml-0 h-64 rounded-md px-5 group-hover:hidden"> */}
          <div
            className={
              overrideService
                ? "m-2 mb-0 ml-0 h-64 rounded-md px-5"
                : "m-2 mb-0 ml-0 h-64 rounded-md px-5 group-hover:hidden"
            }
          >
            <div className="flex">
              <div className="py-1">
                <h2>Example service {overrideServiceName}</h2>
              </div>
            </div>
            <div className="rounded-bl-md rounded-br-md pt-2">
              <li>
                {overrideService ? (
                  <Toggle
                    text="Log me"
                    override={overrideService}
                    state={logService}
                    updateToggleState={toggleLogService}
                  />
                ) : (
                  <Toggle
                    text="Log me"
                    state={toggleStates.logEverything}
                    updateToggleState={toggleLogService}
                  />
                )}
              </li>
              <li>
                {overrideService ? (
                  <Toggle
                    text="Replace"
                    override={overrideService}
                    state={replaceLogFileService}
                    updateToggleState={toggleReplaceLogFileService}
                  />
                ) : (
                  <Toggle
                    text="Replace"
                    state={toggleStates.replaceLogFile}
                    updateToggleState={toggleReplaceLogFileService}
                  />
                )}
              </li>
              <li>
                {overrideService ? (
                  <Toggle
                    text="Timestamps"
                    override={overrideService}
                    state={includeTimestampsService}
                    updateToggleState={toggleIncludeTimestampsService}
                  />
                ) : (
                  <Toggle
                    text="Timestamps"
                    state={toggleStates.includeTimestamps}
                    updateToggleState={toggleIncludeTimestampsService}
                  />
                )}
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
