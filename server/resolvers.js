import { GraphQLError } from "graphql";
import { companyLoader, getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./db/jobs.js";

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

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication");
      }

      return createJob({ title, companyId: user.companyId, description });
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication");
      }

      const job = await deleteJob(id, companyId);
      if (!job) {
        throw notFoundError("Job not found with id ", id);
      }

      return job;
    },

    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user },
    ) => {
      if (!user) {
        throw unauthorizedError("Missing Authentication");
      }

      const updatedJob = await updateJob({
        id,
        title,
        description,
        companyId: user.companyId,
      });

      if (!updateJob) {
        throw notFoundError("Job not found with id: " + id);
      }

      return updateJob;
    },
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => companyLoader.load(job.companyId),
  },
};

function notFoundError(message) {
  return new GraphQLError(message, { extensions: { code: "NOT_FOUND" } });
}
function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED_USER" },
  });
}

function toIsoDate(date) {
  return date.slice(0, "yyyy-mm-dd".length);
}
