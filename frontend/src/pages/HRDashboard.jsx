import React, { useState, useEffect } from 'react';
import { fetchJobs, createJob, updateJob, deleteJob, fetchCandidatesForJob, updateCandidateStatus, deleteCandidate } from '../lib/api';
import { Users, Filter, CheckCircle2, XCircle, ChevronRight, UserCircle2, PlusCircle, LayoutList, Briefcase, Trash2, Edit2, Loader2 } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    SELECTED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200'
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.PENDING}`}>
      {status || 'PENDING'}
    </span>
  );
};

const RecommendationBadge = ({ recommendation, score }) => {
  if (!recommendation) return null;
  
  let label = recommendation;
  let style = 'bg-slate-100 text-slate-800 border-slate-200';
  
  if (recommendation === 'ADVANCE') {
    if (score >= 90) {
      label = 'Fast-Track';
      style = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold shadow-sm ring-1 ring-emerald-500/20';
    } else {
      label = 'Shortlist';
      style = 'bg-green-100 text-green-800 border-green-200';
    }
  } else if (recommendation === 'REQUEST_EVIDENCE') {
    label = 'Needs Clarification';
    style = 'bg-amber-100 text-amber-800 border-amber-200';
  } else if (recommendation === 'REJECT') {
    label = 'Not a Match';
    style = 'bg-rose-100 text-rose-800 border-rose-200';
  }

  return (
    <div className={`px-3 py-1.5 rounded-lg border text-[11px] uppercase tracking-wider ${style}`}>
      {label}
    </div>
  );
};

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('review'); // 'post', 'manage', 'review'
  
  // Data States
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState({ jobs: true, candidates: false, action: false });
  const [globalStats, setGlobalStats] = useState({ activeJobs: 0, pending: 0, shortlisted: 0 });

  // Post/Edit Job Form State
  const [jobForm, setJobForm] = useState({ title: '', description: '', department: '', location: '', employment_type: '' });
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => { loadJobs(); }, []);
  useEffect(() => {
    let intervalId;
    if (activeTab === 'review' && selectedJobId) {
      loadCandidates(selectedJobId, false);
      intervalId = setInterval(() => {
        loadCandidates(selectedJobId, true);
      }, 5000);
    } else {
      setCandidates([]);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedJobId, activeTab]);

  useEffect(() => {
    if (jobs.length > 0) {
      const fetchAllStats = async () => {
        try {
          const allCandidates = await Promise.all(jobs.map(j => fetchCandidatesForJob(j.job_id)));
          const flat = allCandidates.flat();
          const pending = flat.filter(c => c.status === 'PENDING').length;
          const shortlisted = flat.filter(c => c.status === 'SELECTED' || c.evaluation?.recommendation === 'ADVANCE').length;
          setGlobalStats({ activeJobs: jobs.length, pending, shortlisted });
        } catch (e) {
          setGlobalStats({ activeJobs: jobs.length, pending: 0, shortlisted: 0 });
        }
      };
      fetchAllStats();
    } else {
      setGlobalStats({ activeJobs: 0, pending: 0, shortlisted: 0 });
    }
  }, [jobs]);

  const loadJobs = async () => {
    setLoading(p => ({ ...p, jobs: true }));
    try {
      const data = await fetchJobs();
      setJobs(data || []);
    } catch (error) { console.error("Failed to load jobs", error); } 
    finally { setLoading(p => ({ ...p, jobs: false })); }
  };

  const loadCandidates = async (jobId, silent = false) => {
    if (!silent) setLoading(p => ({ ...p, candidates: true }));
    try {
      const data = await fetchCandidatesForJob(jobId);
      setCandidates(data || []);
    } catch (error) { console.error("Failed to load candidates", error); } 
    finally { if (!silent) setLoading(p => ({ ...p, candidates: false })); }
  };

  const handleStatusUpdate = async (candidateId, newStatus) => {
    try {
      await updateCandidateStatus(candidateId, newStatus);
      setCandidates(candidates.map(c => c.candidate_id === candidateId ? { ...c, status: newStatus } : c));
    } catch (error) {
      alert("Failed to update candidate status.");
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if(!window.confirm("Are you sure you want to delete this candidate?")) return;
    setLoading(p => ({ ...p, action: true }));
    try {
      await deleteCandidate(candidateId);
      setCandidates(candidates.filter(c => c.candidate_id !== candidateId));
    } catch (error) { alert("Failed to delete candidate"); }
    finally { setLoading(p => ({ ...p, action: false })); }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(p => ({ ...p, action: true }));
    try {
      if (editingJob) {
        const updated = await updateJob(editingJob.job_id, jobForm);
        setJobs(jobs.map(j => j.job_id === editingJob.job_id ? updated : j));
      } else {
        const newJob = await createJob(jobForm);
        setJobs([...jobs, newJob]);
      }
      setJobForm({ title: '', description: '', department: '', location: '', employment_type: '' });
      setEditingJob(null);
      setActiveTab('manage');
    } catch (error) { 
      alert("Failed to save job: " + (error.response?.data?.detail || error.message)); 
    }
    finally { setLoading(p => ({ ...p, action: false })); }
  };

  const handleDeleteJob = async (id) => {
    if(!window.confirm("Are you sure you want to delete this job?")) return;
    setLoading(p => ({ ...p, action: true }));
    try {
      await deleteJob(id);
      if (selectedJobId === id) setSelectedJobId(null);
      setJobs(jobs.filter(j => j.job_id !== id));
    } catch (error) { alert("Failed to delete job"); }
    finally { setLoading(p => ({ ...p, action: false })); }
  };

  const renderSidebar = () => (
    <div className="w-full md:w-64 flex-shrink-0 space-y-2">
      <div className="mb-6 px-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">HR Controls</h2>
      </div>
      
      <button onClick={() => setActiveTab('review')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'review' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
        <Users className="w-5 h-5 mr-3" /> Review Candidates
      </button>
      <button onClick={() => setActiveTab('manage')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'manage' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
        <LayoutList className="w-5 h-5 mr-3" /> Manage Jobs
      </button>
      <button onClick={() => { setActiveTab('post'); setEditingJob(null); setJobForm({ title: '', description: '', department: '', location: '', employment_type: '' }); }} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'post' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
        <PlusCircle className="w-5 h-5 mr-3" /> Post a Job
      </button>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[80vh]">
      {renderSidebar()}

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
        {/* --- POST / EDIT JOB VIEW --- */}
        {activeTab === 'post' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-indigo-500" /> 
              {editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
            </h2>
            <form onSubmit={handleJobSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
                  <input required type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                  <input type="text" value={jobForm.department} onChange={e => setJobForm({...jobForm, department: e.target.value})} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" placeholder="e.g. Engineering" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                  <input type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" placeholder="e.g. Remote, NY" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employment Type</label>
                  <select value={jobForm.employment_type} onChange={e => setJobForm({...jobForm, employment_type: e.target.value})} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Description</label>
                <textarea required rows="6" value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500" placeholder="Describe the role..."></textarea>
              </div>
              <div className="flex gap-4">
                <button type="submit" disabled={loading.action} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center transition-colors">
                  {loading.action ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                  {editingJob ? 'Save Changes' : 'Publish Job'}
                </button>
                {editingJob && (
                  <button type="button" onClick={() => { setActiveTab('manage'); setEditingJob(null); }} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* --- MANAGE JOBS VIEW --- */}
        {activeTab === 'manage' && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Manage Active Listings</h2>
            </div>
            <div className="flex-1 overflow-auto p-6">
              {loading.jobs ? (
                <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl" />)}</div>
              ) : jobs.length === 0 ? (
                <p className="text-slate-500 text-center mt-10">No jobs posted yet.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.job_id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 transition-colors">
                      <div>
                        <h3 className="font-bold text-slate-900">{job.title}</h3>
                        <p className="text-sm text-slate-500">{job.department} • {job.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingJob(job); setJobForm(job); setActiveTab('post'); }} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteJob(job.job_id)} disabled={loading.action} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- REVIEW CANDIDATES VIEW --- */}
        {activeTab === 'review' && (
          <div className="flex flex-col md:flex-row h-full bg-slate-50/50">
            {/* Job Filter Sidebar (Inner) */}
            <div className="w-full md:w-[320px] bg-white border-r border-slate-200 flex flex-col z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
              <div className="p-6 border-b border-slate-100 flex items-center font-bold text-slate-800">
                <Filter className="w-5 h-5 mr-3 text-indigo-500" /> Filter by Job Role
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {jobs.map(job => (
                  <button key={job.job_id} onClick={() => setSelectedJobId(job.job_id)} className={`w-full text-left px-5 py-4 rounded-2xl transition-all border flex items-center justify-between ${selectedJobId === job.job_id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50 shadow-sm'}`}>
                    <span className={`truncate pr-2 ${selectedJobId === job.job_id ? 'font-bold text-indigo-900' : 'font-medium text-slate-600'}`}>{job.title}</span>
                    {selectedJobId === job.job_id && <ChevronRight className="w-5 h-5 text-indigo-500 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Grid */}
            <div className="flex-1 p-8 overflow-y-auto">
              {!selectedJobId ? (
                <div className="h-full flex flex-col pb-10">
                  <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Welcome to RecruitFlow Control Center</h2>
                    <p className="text-lg text-slate-500 leading-relaxed">Select a job role from the left sidebar to review AI-evaluated candidates, track scores, and manage your hiring workflows effortlessly.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-black text-slate-900 mb-2">{globalStats.activeJobs}</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Jobs</span>
                    </div>
                    
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-5">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-black text-slate-900 mb-2">{globalStats.pending}</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Reviews</span>
                    </div>
                    
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col transition-transform hover:-translate-y-1">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-5">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-black text-slate-900 mb-2">{globalStats.shortlisted}</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted Candidates</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-gradient-to-br from-indigo-50 to-white rounded-3xl border-2 border-dashed border-indigo-100/70 flex flex-col items-center justify-center text-indigo-300 min-h-[300px]">
                    <LayoutList className="w-20 h-20 mb-6 opacity-40 text-indigo-400" />
                    <p className="font-semibold text-indigo-400/80 text-lg">Awaiting your selection...</p>
                  </div>
                </div>
              ) : loading.candidates ? (
                <div className="space-y-4">{[1,2].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-2xl" />)}</div>
              ) : candidates.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">No applicants yet.</div>
              ) : (
                <div className="space-y-6">
                  {candidates.map(candidate => {
                    const ai = candidate.evaluation || {};
                    return (
                      <div key={candidate.candidate_id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
                              {candidate.candidate_name?.charAt(0) || <UserCircle2 />}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-slate-900">{candidate.candidate_name}</h3>
                              <p className="text-sm text-slate-500">{candidate.email} • {candidate.phone || 'No phone'}</p>
                              <div className="flex gap-3 mt-1 text-xs text-indigo-600 font-medium">
                                {candidate.linkedin && <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
                                {candidate.portfolio && <a href={candidate.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={candidate.status} />
                            <button onClick={() => handleDeleteCandidate(candidate.candidate_id)} disabled={loading.action} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Candidate">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-slate-900">AI Evaluation</h4>
                            <span className={`text-lg font-bold ${ai.score >= 80 ? 'text-green-600' : ai.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                              {ai.score || 0}/100
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Verified Skills</span>
                              <div className="flex flex-wrap gap-1.5">
                                {ai.verified_skills?.length > 0 ? ai.verified_skills.map((skill, i) => (
                                  <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">{skill}</span>
                                )) : <span className="text-xs text-slate-400">None found</span>}
                              </div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Missing Evidence</span>
                              <div className="flex flex-wrap gap-1.5">
                                {ai.missing_evidence?.length > 0 ? ai.missing_evidence.map((skill, i) => (
                                  <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md">{skill}</span>
                                )) : <span className="text-xs text-slate-400">None missing</span>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100 mb-4">
                            <strong>Summary:</strong> {ai.summary || "No summary provided."}
                          </div>

                          {ai.recommendation && (
                            <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-800 border border-slate-100 mb-4 font-medium flex items-center justify-between">
                              <strong>Recommendation:</strong> 
                              <RecommendationBadge recommendation={ai.recommendation} score={ai.score} />
                            </div>
                          )}
                          
                          {candidate.why_join && (
                            <div className="mt-4 text-sm text-slate-600">
                              <strong className="block mb-1 text-slate-900">Motivation:</strong>
                              <p className="italic bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/50">{candidate.why_join}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                          <button onClick={() => handleStatusUpdate(candidate.candidate_id, 'REJECTED')} className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-medium py-2 rounded-lg flex items-center justify-center transition-colors text-sm">
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                          </button>
                          <button onClick={() => handleStatusUpdate(candidate.candidate_id, 'SELECTED')} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg flex items-center justify-center transition-colors text-sm">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Select Candidate
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
