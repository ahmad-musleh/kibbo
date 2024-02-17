export default function CodeOutput ({toggleStates}: {toggleStates: any}) {

    return (
        <>
            <div className="flex flex-col bg-[#505051] max-w-[600px] min-w-[600px] min-h-[600px] m-10 lg:my-10 lg:ml-5 lg:mr-10 place-self-center lg:place-self-start rounded-lg">
                <div className="flex h-12 space-between">
                    <div className="bg-[#BB2124] h-3.5 w-3.5 mt-5 ml-4 rounded-full"></div>
                    <div className="bg-[#F0AD4E] h-3.5 w-3.5 mt-5 ml-2 rounded-full"></div>
                    <div className="bg-[#22BB33] h-3.5 w-3.5 mt-5 ml-2 rounded-full"></div>
                    <div className="bg-[#303030] flex mt-3 ml-4 pl-3 pr-3 py-2 rounded-t-lg space-between">
                        <h2>
                            docker-compose.yaml
                        </h2>
                        <div className="text-[#505051] ml-2 rotate-45">+</div>
                    </div>
                </div>
                <div className="bg-[#303030] flex-grow mt-0 mb-0 ml-10 mr-0 rounded-tl-lg">
                    <div className="p-5">
                        <p>
                            <span className="text-[#9CDCFE]">version</span>
                            <span>:&nbsp;</span>
                            <span className="text-[#CE9178]">"3"</span>

                            <br/>

                            <span className="text-[#9CDCFE]">services</span>
                            <span>:</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-[#9CDCFE]">kibbo</span>
                            <span>:</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-[#9CDCFE]">image</span>
                            <span>:&nbsp;</span>
                            <span className="text-[#CE9178]">musleh/kibbo:latest</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-[#9CDCFE]">volumes</span>
                            <span>:</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>-&nbsp;</span>
                            <span className="text-[#CE9178]">/var/run/docker.sock:/var/run/docker.sock</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>-&nbsp;</span>
                            <span className="text-[#CE9178]">./logs:/logs</span>

                            <br/>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="text-[#9CDCFE]">labels</span>
                            <span>:</span>
                            <br/>

                            { toggleStates.logEverything ?
                            (
                                <>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>-&nbsp;</span>
                                    <span className="text-[#CE9178]">kibbo.config.log_mode=optout</span>
                                    <br/>
                                </>
                            ) : (
                                <>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>-&nbsp;</span>
                                    <span className="text-[#CE9178]">kibbo.config.log_mode=optin</span>
                                    <br/>
                                </>
                            )
                            }

                            { toggleStates.replaceLogFile ?
                            (
                                <></>
                            ) : (
                                <>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>-&nbsp;</span>
                                    <span className="text-[#CE9178]">kibbo.config.log_file_update_mode=append</span>
                                    <br/>
                                </>
                            )
                            }

                            { toggleStates.includeTimestamps ?
                            (
                                <>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>-&nbsp;</span>
                                    <span className="text-[#CE9178]">kibbo.config.log_file_include_timestamps=true</span>
                                    <br/>
                                </>
                            ) : (
                                <></>
                            )
                            }
                        </p>
                    </div>
                </div>
                <div className="bg-[#337AC6] h-6 rounded-b-lg">
                </div>
            </div>
        </>
    )
}