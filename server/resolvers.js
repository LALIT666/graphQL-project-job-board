import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id);

      if (!company) {
        throw notFoundError(`No Company found with the id: ${id}`);
      }
      return company;
    },
    job: async (_root, args) => {
      const job = await getJob(args.id);

      if (!job) {
        throw notFoundError(`No Job found with the id: ${args.id}`);
      }

      return job;
    },
    jobs: () => getJobs(),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

function notFoundError(message) {
  return new GraphQLError(message, { extensions: { code: "NOT_FOUND" } });
}

function toIsoDate(date) {
  return date.slice(0, "yyyy-mm-dd".length);
}
