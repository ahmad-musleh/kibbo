export default function CodeOutput({ toggleStates }: { toggleStates: any }) {
  return (
    <>
      <div className="m-10 flex min-h-[650px] min-w-[600px] max-w-[600px] flex-col place-self-center rounded-lg bg-[#505051] lg:my-10 lg:ml-5 lg:mr-10 lg:place-self-start">
        <div className="space-between flex h-12">
          <div className="ml-4 mt-5 h-3.5 w-3.5 rounded-full bg-[#BB2124]"></div>
          <div className="ml-2 mt-5 h-3.5 w-3.5 rounded-full bg-[#F0AD4E]"></div>
          <div className="ml-2 mt-5 h-3.5 w-3.5 rounded-full bg-[#22BB33]"></div>
          <div className="space-between ml-4 mt-3 flex rounded-t-lg bg-[#303030] py-2 pl-3 pr-3">
            <h2>docker-compose.yaml</h2>
            <div className="ml-2 rotate-45 text-[#505051]">+</div>
          </div>
        </div>
        <div className="mb-0 ml-10 mr-0 mt-0 flex-grow rounded-tl-lg bg-[#303030]">
          <div className="p-5">
            <p>
              <span className="text-[#9CDCFE]">services</span>
              <span>:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">kibbo</span>
              <span>:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">image</span>
              <span>:&nbsp;</span>
              <span className="text-[#CE9178]">musleh/kibbo:latest</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">volumes</span>
              <span>:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>-&nbsp;</span>
              <span className="text-[#CE9178]">
                /var/run/docker.sock:/var/run/docker.sock
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>-&nbsp;</span>
              <span className="text-[#CE9178]">./logs:/logs</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">labels</span>
              <span>:</span>
              <br />
              {toggleStates.logEverything ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_mode=optout
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_mode=optin
                  </span>
                  <br />
                </>
              )}
              {toggleStates.replaceLogFile ? (
                <></>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_update_mode=append
                  </span>
                  <br />
                </>
              )}
              {toggleStates.includeTimestamps ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_include_timestamps=true
                  </span>
                  <br />
                </>
              ) : (
                <></>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">hala1</span>
              <span>:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">image</span>
              <span>:&nbsp;</span>
              <span className="text-[#CE9178]">hello-world:latest</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">labels</span>
              <span>:</span>
              <br />
              {toggleStates.logService1 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.logging.active=true
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.logging.active=false
                  </span>
                  <br />
                </>
              )}
              {toggleStates.replaceLogFileService1 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_update_mode=replace
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_update_mode=append
                  </span>
                  <br />
                </>
              )}
              {toggleStates.includeTimestampsService1 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_include_timestamps=true
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_include_timestamps=false
                  </span>
                  <br />
                </>
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">hala2</span>
              <span>:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">image</span>
              <span>:&nbsp;</span>
              <span className="text-[#CE9178]">hello-world:latest</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-[#9CDCFE]">labels</span>
              <span>:</span>
              <br />
              {toggleStates.logService2 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.logging.active=true
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.logging.active=false
                  </span>
                  <br />
                </>
              )}
              {toggleStates.replaceLogFileService2 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_update_mode=replace
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_update_mode=append
                  </span>
                  <br />
                </>
              )}
              {toggleStates.includeTimestampsService2 ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_include_timestamps=true
                  </span>
                  <br />
                </>
              ) : (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>-&nbsp;</span>
                  <span className="text-[#CE9178]">
                    kibbo.config.log_file_include_timestamps=false
                  </span>
                  <br />
                </>
              )}
            </p>
          </div>
        </div>
        <div className="h-6 rounded-b-lg bg-[#337AC6]"></div>
      </div>
    </>
  );
}
