import { useState } from 'react';
import { dummyStudents, dummyAttendance, dummyExams, dummyExamResults } from '../data/dummyData';
import { Download, Calendar, Users, FileText, TrendingUp, Award } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('attendance');

  const reports = [
    { id: 'attendance', name: 'Student Attendance Report', icon: Calendar },
    { id: 'class-attendance', name: 'Class Attendance Summary', icon: Users },
    { id: 'exam-results', name: 'Exam Result Summary', icon: FileText },
    { id: 'student-progress', name: 'Student Progress Report', icon: TrendingUp },
  ];

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'attendance':
        return <StudentAttendanceReport />;
      case 'class-attendance':
        return <ClassAttendanceSummary />;
      case 'exam-results':
        return <ExamResultSummary />;
      case 'student-progress':
        return <StudentProgressReport />;
      default:
        return <div>Select a report</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and view various reports</p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-xl border-2 transition ${
                selectedReport === report.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Icon
                  className={`w-8 h-8 mb-2 ${
                    selectedReport === report.id ? 'text-indigo-600' : 'text-gray-600'
                  }`}
                />
                <span className="font-medium text-gray-900">{report.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {renderReportContent()}
      </div>
    </div>
  );
};

const StudentAttendanceReport = () => {
  const studentAttendance = dummyStudents.map((student) => {
    const records = dummyAttendance.filter((a) => a.studentId === student.id);
    const present = records.filter((a) => a.status === 'PRESENT').length;
    const absent = records.filter((a) => a.status === 'ABSENT').length;
    const late = records.filter((a) => a.status === 'LATE').length;
    const percentage = records.length > 0 ? ((present / records.length) * 100).toFixed(1) : 0;
    return { student, present, absent, late, total: records.length, percentage };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Attendance Report</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Days</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Present</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Absent</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Late</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentAttendance.map((item) => (
              <tr key={item.student.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <p className="font-medium text-gray-900">
                    {item.student.firstName} {item.student.lastName}
                  </p>
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">{item.total}</td>
                <td className="px-6 py-3 text-sm text-green-600">{item.present}</td>
                <td className="px-6 py-3 text-sm text-red-600">{item.absent}</td>
                <td className="px-6 py-3 text-sm text-yellow-600">{item.late}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.percentage >= 75
                        ? 'bg-green-100 text-green-800'
                        : item.percentage >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ClassAttendanceSummary = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Class Attendance Summary</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Select a class and month to view attendance summary</p>
      </div>
    </div>
  );
};

const ExamResultSummary = () => {
  const examStats = dummyExams.map((exam) => {
    const results = dummyExamResults.filter((r) => r.examId === exam.id);
    const total = results.length;
    const absent = results.filter((r) => r.isAbsent).length;
    const present = total - absent;
    const totalMarks = results.reduce((sum, r) => sum + r.marksObtained, 0);
    const average = present > 0 ? (totalMarks / present).toFixed(1) : 0;
    const passed = results.filter((r) => !r.isAbsent && (r.marksObtained / exam.maxMarks) * 100 >= 40).length;
    const passPercentage = present > 0 ? ((passed / present) * 100).toFixed(1) : 0;
    const topper = results
      .filter((r) => !r.isAbsent)
      .sort((a, b) => b.marksObtained - a.marksObtained)[0];

    return { exam, total, absent, present, average, passPercentage, topper };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Exam Result Summary</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <div className="space-y-4">
        {examStats.map((stat) => (
          <div key={stat.exam.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{stat.exam.name}</h3>
                <p className="text-sm text-gray-600">{stat.exam.className} | {stat.exam.subjectName}</p>
              </div>
              <div className="flex items-center text-yellow-600">
                <Award className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">
                  {stat.topper?.studentName} ({stat.topper?.marksObtained})
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Total Students</p>
                <p className="text-lg font-bold text-gray-900">{stat.total}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Average Marks</p>
                <p className="text-lg font-bold text-gray-900">{stat.average}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Pass %</p>
                <p className="text-lg font-bold text-green-600">{stat.passPercentage}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Absent</p>
                <p className="text-lg font-bold text-red-600">{stat.absent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentProgressReport = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Progress Report</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Select a student and academic year to view progress report</p>
      </div>
    </div>
  );
};

export default Reports;
