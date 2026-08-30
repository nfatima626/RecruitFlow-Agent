import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchJobs, applyForJob } from '../lib/api';
import { Briefcase, Send, CheckCircle2, AlertCircle, MapPin, Building, Clock, X } from 'lucide-react';

const CandidatePortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Application form state
  const [formData, setFormData] = useState({
    candidate_name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    years_experience: '',
    current_company: '',
    why_join: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ status: 'idle', message: '' }); 

  const location = useLocation();

  useEffect(() => {
    loadJobs();
    
    // Auto-refresh when the window gains focus (e.g., HR publishes job in another tab)
    const handleFocus = () => loadJobs(false);
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, [location.pathname]);

  const loadJobs = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data || []);
    } catch (error) {
      console.error("Failed to load jobs", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!resumeFile) {
      setSubmitStatus({ status: 'error', message: 'Please attach your resume (PDF/DOCX).' });
      return;
    }
    
    setSubmitStatus({ status: 'submitting', message: 'Submitting your application...' });
    
    try {
      const submitData = new FormData();
      submitData.append('job_id', selectedJob.job_id);
      submitData.append('desired_role', selectedJob.title);
      submitData.append('resume', resumeFile);
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      await applyForJob(submitData);
      setSubmitStatus({ status: 'success', message: 'Application submitted successfully! Our AI will review your resume shortly.' });
      
      // Reset form but keep drawer open to show success message
      setFormData({
        candidate_name: '', email: '', phone: '', linkedin: '',
        portfolio: '', years_experience: '', current_company: '', why_join: ''
      });
      setResumeFile(null);
    } catch (error) {
      setSubmitStatus({ status: 'error', message: error.response?.data?.detail || 'Failed to submit application. Please try again.' });
    }
  };
  
  const closeDrawer = () => {
    setSelectedJob(null);
    setSubmitStatus({ status: 'idle', message: '' });
  };

  return (
    <div className="relative min-h-screen pb-12">
      {/* Job Grid Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 mt-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Join Our Mission
        </h1>
        <p className="text-lg text-slate-500">
          Discover open roles and help us build the future of AI-powered operations.
        </p>
      </div>

      {/* Job Grid Listings */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
          <Briefcase className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-lg font-medium text-slate-900">No open positions</h3>
          <p className="text-slate-500">Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div 
              key={job.job_id} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col h-full"
            >
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-3">
                  {job.department || 'General'}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
              </div>
              
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center text-sm text-slate-500">
                  <MapPin className="w-4 h-4 mr-2" /> {job.location || 'Remote'}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <Clock className="w-4 h-4 mr-2" /> {job.employment_type || 'Full-time'}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedJob(job);
                  setSubmitStatus({ status: 'idle', message: '' });
                }}
                className="w-full bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-medium py-2.5 rounded-xl transition-colors border border-slate-200 hover:border-indigo-600"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Split-Screen Drawer/Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm overflow-hidden" onClick={closeDrawer}>
          <div 
            className="w-full h-full sm:h-[90vh] sm:max-w-6xl bg-white sm:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Left Side: Role Details */}
            <div className="w-full md:w-5/12 bg-slate-50 p-6 md:p-10 overflow-y-auto border-r border-slate-200 flex flex-col hidden md:flex">
              <button onClick={closeDrawer} className="md:hidden self-end mb-4 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
              
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full mb-4 w-max">
                {selectedJob.department || 'General'}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedJob.title}</h2>
              
              <div className="flex flex-col space-y-3 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center text-slate-600 font-medium">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" /> {selectedJob.location || 'Remote'}
                </div>
                <div className="flex items-center text-slate-600 font-medium">
                  <Clock className="w-5 h-5 mr-3 text-indigo-500" /> {selectedJob.employment_type || 'Full-time'}
                </div>
                <div className="flex items-center text-slate-600 font-medium">
                  <Building className="w-5 h-5 mr-3 text-indigo-500" /> RecruitFlow HQ
                </div>
              </div>
              
              <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                <h3 className="text-lg font-bold text-slate-900">About the Role</h3>
                <p className="whitespace-pre-line leading-relaxed">{selectedJob.description}</p>
              </div>
            </div>

            {/* Right Side: Application Form */}
            <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto flex flex-col relative h-full">
              <button onClick={closeDrawer} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <div className="md:hidden mb-6 pr-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Apply: {selectedJob.title}</h2>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-6 hidden md:block">Submit your application</h3>

              {submitStatus.status === 'success' && (
                <div className="mb-8 p-6 bg-green-50 text-green-800 rounded-xl flex items-start border border-green-200">
                  <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 text-green-500" />
                  <div>
                    <h4 className="font-bold mb-1">Application Received!</h4>
                    <p>{submitStatus.message}</p>
                    <button onClick={closeDrawer} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Done
                    </button>
                  </div>
                </div>
              )}

              {submitStatus.status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-start border border-red-200">
                  <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={`space-y-6 flex-1 ${submitStatus.status === 'success' ? 'hidden' : ''}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="candidate_name" required value={formData.candidate_name} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Desired Role</label>
                    <input type="text" value={selectedJob.title} disabled className="w-full rounded-lg border-slate-200 bg-slate-50 border p-2.5 text-slate-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">LinkedIn Profile</label>
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Portfolio Website</label>
                    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Years of Experience</label>
                    <input type="number" name="years_experience" value={formData.years_experience} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="e.g. 5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Company</label>
                    <input type="text" name="current_company" value={formData.current_company} onChange={handleInputChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Company Inc." />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resume / CV (PDF) <span className="text-red-500">*</span></label>
                  <input 
                    type="file" 
                    accept=".pdf,.docx" 
                    required
                    onChange={handleFileChange}
                    className="w-full rounded-lg border-slate-300 border border-dashed p-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-slate-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Why do you want to join us?</label>
                  <textarea 
                    name="why_join"
                    value={formData.why_join}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full rounded-lg border-slate-300 border p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-y"
                    placeholder="Tell us a little bit about your motivation..."
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-6">
                  <button 
                    type="submit" 
                    disabled={submitStatus.status === 'submitting'}
                    className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed ml-auto"
                  >
                    {submitStatus.status === 'submitting' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit Application <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatePortal;
