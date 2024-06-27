import JobRow from "./JobRow";

export default function Jobs({header, jobs}:{header:string, jobs:object[]}) {
    return (
        <div className="bg-slate-200 py-6 rounded-3xl">
            <div className="container">
                <h2 className="font-bold mb-4">{header || 'Recent Jobs'}</h2>

                <div className="flex flex-col gap-4">
                    {!jobs?.length && (
                        <div>No jobs found</div>
                    )}
                    {jobs && jobs.map((job, index) => {
                        return (
                            <JobRow jobDoc={job} key={index} />
                        )
                    })}
                </div>

                
            </div>            
        </div>
    )
}