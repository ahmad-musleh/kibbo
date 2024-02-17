import Toggle from './toggle';

export default function KibboSelection({
    toggleStates,
    toggleLogEverything,
    toggleReplaceLogFile,
    toggleIncludeTimestamps
}: {
    toggleStates: any,
    toggleLogEverything: Function,
    toggleReplaceLogFile: Function,
    toggleIncludeTimestamps: Function
}) {
    return (
        <>
            <div className="bg-[#303030] max-w-[600px] min-w-[600px] min-h-[600px] m-10 lg:my-10 lg:ml-10 lg:mr-5 place-self-center lg:place-self-end rounded-lg">
                <div className="p-10">
                    <ul>
                        <li><Toggle
                                text="Log all services except what I specify not to log"
                                state={toggleStates.logEverything}
                                updateToggleState={toggleLogEverything}
                            /></li>
                        <li><Toggle
                                text="Replace log files upon updating service"
                                state={toggleStates.replaceLogFile}
                                updateToggleState={toggleReplaceLogFile}
                            /></li>
                        <li><Toggle
                                text="Include timestamps in log file"
                                state={toggleStates.includeTimestamps}
                                updateToggleState={toggleIncludeTimestamps}
                            /></li>
                    </ul>
                </div>
            </div>
        </>
    )
}