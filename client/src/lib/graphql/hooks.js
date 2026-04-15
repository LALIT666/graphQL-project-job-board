import { useMutation, useQuery } from "@apollo/client";
import { companyByIdQuery, jobByIdQuery, jobsQuery } from "./queries";
import { createJobMutation } from "./mutation";

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

export function useCreateJob() {
  const [mutate, result] = useMutation(createJobMutation);

  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });

    return job;
  };
  return { createJob, result };
}
