import { useQuery } from "@apollo/client";
import { companyByIdQuery, jobByIdQuery, jobsQuery } from "./queries";

export function useCompany(id) {
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: id },
  });

  return { company: data?.company, loading, error: Boolean(error) };
}

export function useJob(jobId) {
  const { data, loading, error } = useQuery(jobByIdQuery, {
    variables: { id: jobId },
  });

  return { job: data?.job, loading, error: Boolean(error) };
}

export function useJobs() {
  const { data, loading, error } = useQuery(jobsQuery, {
    fetchPolicy: "network-only",
  });

  return { jobs: data?.jobs, loading, error: Boolean(error) };
}
