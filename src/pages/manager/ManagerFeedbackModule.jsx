import React, { useState } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock,
  Send
} from 'lucide-react';

const ManagerFeedbackModule = () => {
  const [feedback, setFeedback] = useState('');

  const trainingCourses = [
    { id: 1, name: "Leadership Fundamentals", progress: 85, status: "On Track" },
    { id: 2, name: "Conflict Resolution", progress: 40, status: "Behind" },
    { id: 3, name: "Strategic Planning 2024", progress: 100, status: "Completed" },
  ];

  const teamFeedback = [
    { name: "Sarah Chen", role: "Sr. Developer", lastScore: 4.8, trend: "+0.2" },
    { name: "Marcus Wright", role: "UI Designer", lastScore: 4.2, trend: "-0.1" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Team Development & Feedback</h1>
        <p className="text-slate-400 mt-2">Monitor training milestones and deliver real-time coaching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Training Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-blue-400" size={20} />
              <h2 className="text-xl font-semibold">Active Training Modules</h2>
            </div>
            
            <div className="space-y-6">
              {trainingCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-200">{course.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.status === 'Behind' ? 'bg-red-900/30 text-red-400' : 'bg-emerald-900/30 text-emerald-400'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.status === 'Behind' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{course.progress}% Complete</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> 12h remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-purple-400" size={20} />
              <h2 className="text-xl font-semibold">Team Analytics</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800 text-sm">
                  <th className="pb-3 font-medium">Employee</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Trend</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {teamFeedback.map((member, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.role}</div>
                    </td>
                    <td className="py-4 font-mono text-blue-400">{member.lastScore}/5.0</td>
                    <td className={`py-4 text-sm ${member.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {member.trend}
                    </td>
                    <td className="py-4 text-right text-xs">
                      <button className="text-slate-400 hover:text-white underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Instant Feedback Form */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="text-emerald-400" size={20} />
              <h2 className="text-xl font-semibold">Quick Feedback</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Select Recipient</label>
                <select className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option>Sarah Chen</option>
                  <option>Marcus Wright</option>
                  <option>Entire Team</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Coaching Notes</label>
                <textarea 
                  rows="4"
                  className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-600"
                  placeholder="What did they do well? What can be improved?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Send size={16} /> Send Feedback
                </button>
                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700">
                  <Award size={18} className="text-amber-400" />
                </button>
              </div>
              
              <p className="text-[10px] text-center text-slate-500">
                Feedback is shared instantly via the employee portal.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManagerFeedbackModule;