import { useState } from "react";
import JobList from "../components/JobList";
import { useJobs } from "../lib/graphql/hooks";

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE,
  );

  console.log("[homePage] {Jobs, loading, error}:", { jobs, loading, error });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  console.log("[HomePage] jobs:", jobs);
  return (
    <div>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>{currentPage}</span>

        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
