export default function KibboSelection() {
    return (
        <>
            <div className="bg-[#303030] max-w-[600px] min-w-[600px] min-h-[600px] m-10 lg:my-10 lg:ml-10 lg:mr-5 place-self-center lg:place-self-end rounded-lg">
                <div className="p-10">
                    <ul>
                        <li className="list-none">Log all services except what I specify not to log</li>
                        <li className="list-none">Replace log files upon updating service</li>
                        <li className="list-none">Include timestamps in log file</li>
                    </ul>
                </div>
            </div>
        </>
    )
}