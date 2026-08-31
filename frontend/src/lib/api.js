import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Jobs
export const fetchJobs = async () => {
  const response = await api.get('/jobs');
  return response.data.jobs;
};

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data.job;
};

export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);
  return response.data.job;
};

export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};

// Candidates
export const fetchCandidatesForJob = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}/candidates`);
  return response.data.candidates;
};

export const applyForJob = async (formData) => {
  // Use multipart/form-data for the file upload
  const response = await api.post('/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.application;
};

export const updateCandidateStatus = async (candidateId, status) => {
  const response = await api.patch(`/candidates/${candidateId}/status`, { status });
  return response.data;
};

export const deleteCandidate = async (candidateId) => {
  const response = await api.delete(`/candidates/${candidateId}`);
  return response.data;
};

export default api;
