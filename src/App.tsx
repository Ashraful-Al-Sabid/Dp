import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  RefreshCcw, 
  Trophy, 
  ChevronRight,
  ExternalLink,
  Youtube
} from 'lucide-react';

const scheduleData = [
  { day: 1, type: "New", topic: "Intro to DP & Climbing Stairs", videos: "1, 2", recall: "" },
  { day: 2, type: "New", topic: "1D DP: Frog Jump (Normal & K-dist)", videos: "3, 4", recall: "Day 1" },
  { day: 3, type: "Recall", topic: "Focus on 1D Basics", videos: "-", recall: "Day 1, 2" },
  { day: 4, type: "New", topic: "1D DP: Max Non-Adjacent & House Robber", videos: "5, 6", recall: "" },
  { day: 5, type: "New", topic: "Ninja's Training & Grid Unique Paths I", videos: "7, 8", recall: "Day 4" },
  { day: 6, type: "Recall", topic: "Focus on 1D & 2D Intro", videos: "-", recall: "Day 1, 2, 4, 5" },
  { day: 7, type: "New", topic: "Grid: Unique Paths II & Min Path Sum", videos: "9, 10", recall: "" },
  { day: 8, type: "New", topic: "Grid: Triangle & Falling Path Sum", videos: "11, 12", recall: "Day 7" },
  { day: 9, type: "Recall", topic: "Focus on Grid Navigation", videos: "-", recall: "Day 7, 8, 1" },
  { day: 10, type: "New", topic: "Grid: 3D DP (Cherry Pickup II)", videos: "13", recall: "" },
  { day: 11, type: "New", topic: "Subsets: Subset Sum & Partition Equal", videos: "14, 15", recall: "Day 10" },
  { day: 12, type: "Recall", topic: "Focus on 'Pick/Non-Pick'", videos: "-", recall: "Day 10, 11, 3" },
  { day: 13, type: "New", topic: "Subsets: Min Abs Diff & Count Subsets", videos: "16, 17", recall: "" },
  { day: 14, type: "New", topic: "Count Partitions & 0/1 Knapsack", videos: "18, 19", recall: "Day 13" },
  { day: 15, type: "Recall", topic: "Focus on Knapsack Variations", videos: "-", recall: "Day 13, 14, 7" },
  { day: 16, type: "New", topic: "Subsets: Min Coins & Target Sum", videos: "20, 21", recall: "" },
  { day: 17, type: "New", topic: "Coin Change 2 & Unbound Knapsack", videos: "22, 23", recall: "Day 16" },
  { day: 18, type: "Recall", topic: "Consolidate Subsets", videos: "-", recall: "Day 16, 17, 10" },
  { day: 19, type: "New", topic: "Strings: Rod Cutting & Intro to LCS", videos: "24, 25", recall: "" },
  { day: 20, type: "New", topic: "Strings: Print LCS & LC Substring", videos: "26, 27", recall: "Day 19" },
  { day: 21, type: "Recall", topic: "Focus on String Matching", videos: "-", recall: "Day 19, 20, 13, 1" },
  { day: 22, type: "New", topic: "Strings: LP Subsequence & Min Insertions", videos: "28, 29", recall: "" },
  { day: 23, type: "New", topic: "Strings: Conversion & Supersequence", videos: "30, 31", recall: "Day 22" },
  { day: 24, type: "Recall", topic: "Focus on Palindromes", videos: "-", recall: "Day 22, 23, 16" },
  { day: 25, type: "New", topic: "Strings: Distinct Subseq & Edit Distance", videos: "32, 33", recall: "" },
  { day: 26, type: "New", topic: "Strings: Wildcard Matching", videos: "34", recall: "Day 25" },
  { day: 27, type: "Recall", topic: "The 'Hard' Strings", videos: "-", recall: "Day 25, 26, 19, 5" },
  { day: 28, type: "New", topic: "Stocks: Stock I & II", videos: "35, 36", recall: "" },
  { day: 29, type: "New", topic: "Stocks: Stock III & IV", videos: "37, 38", recall: "Day 28" },
  { day: 30, type: "Recall", topic: "Consolidate Strings/Stocks", videos: "-", recall: "Day 28, 29, 22" },
  { day: 31, type: "New", topic: "Stocks: Cooldown & Transaction Fee", videos: "39, 40", recall: "" },
  { day: 32, type: "New", topic: "LIS: Longest Increasing Subsequence & Printing", videos: "41, 42", recall: "Day 31" },
  { day: 33, type: "Recall", topic: "Focus on Stock States & LIS", videos: "-", recall: "Day 31, 32, 25, 10" },
  { day: 34, type: "New", topic: "LIS: Binary Search & Divisible Subset", videos: "43, 44", recall: "" },
  { day: 35, type: "New", topic: "LIS: String Chain & Bitonic Subseq", videos: "45, 46", recall: "Day 34" },
  { day: 36, type: "Recall", topic: "Focus on LIS Pattern", videos: "-", recall: "Day 34, 35, 28" },
  { day: 37, type: "New", topic: "LIS: Number of LIS & MCM Intro", videos: "47, 48", recall: "" },
  { day: 38, type: "New", topic: "MCM: Tabulation & Cut Stick", videos: "49, 50", recall: "Day 37" },
  { day: 39, type: "Recall", topic: "Focus on Advanced LIS & MCM", videos: "-", recall: "Day 37, 38, 31, 15" },
  { day: 40, type: "New", topic: "MCM: Burst Balloons", videos: "51", recall: "" },
  { day: 41, type: "New", topic: "MCM: Boolean Expression & Palindrome II", videos: "52, 53", recall: "Day 40" },
  { day: 42, type: "Recall", topic: "The 'Hard' Interval DP", videos: "-", recall: "Day 40, 41, 34" },
  { day: 43, type: "New", topic: "MCM: Partition Array & Max Rectangle", videos: "54, 55", recall: "" },
  { day: 44, type: "New", topic: "Squares: Count Square Submatrices", videos: "56", recall: "Day 43" },
  { day: 45, type: "Recall", topic: "Consolidate All Hard Topics", videos: "-", recall: "Day 43, 44, 37, 21" }
];

// Extend to 50 days
for (let i = 46; i <= 50; i++) {
  if (!scheduleData.some(item => item.day === i)) {
    scheduleData.push({
      day: i,
      type: "Mastery",
      topic: "Cyclic Pattern Review",
      videos: "-",
      recall: "Random Problems 1-56"
    });
  }
}

export default function App() {
  const [completedDays, setCompletedDays] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dp-mastery-progress');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dp-mastery-progress', JSON.stringify(completedDays));
  }, [completedDays]);

  const hasScrolled = useRef(false);

  useEffect(() => {
    if (hasScrolled.current) return;

    const firstUnfinished = scheduleData.find(item => !completedDays.includes(item.day));
    if (firstUnfinished) {
      setTimeout(() => {
        const element = document.getElementById(`day-${firstUnfinished.day}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
    hasScrolled.current = true;
  }, [completedDays]);

  const toggleDay = (day) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const stats = useMemo(() => {
    const total = scheduleData.length;
    const completed = completedDays.length;
    const percentage = Math.round((completed / total) * 100);
    return { total, completed, percentage };
  }, [completedDays]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans p-4 md:p-8 relative isolate">
      {/* Texture Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                  <Trophy className="text-yellow-500 w-10 h-10" />
                  50-Day DP Mastery
                </h1>
                <p className="text-slate-500 mt-1 text-lg font-medium">Spaced Repetition Study Tracker</p>
              </div>
              
              <a 
                href="https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors font-bold text-sm"
              >
                <Youtube className="w-5 h-5" />
                Open Striver's DP Playlist
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <span className="text-3xl font-black text-indigo-600">{stats.percentage}%</span>
              </div>
              <div className="w-32 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-700 ease-in-out"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-slate-700">{stats.completed}/{stats.total} Days</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto space-y-4">
          {scheduleData.map((item) => (
            <div 
              key={item.day}
              id={`day-${item.day}`}
              onClick={() => toggleDay(item.day)}
              className={`group relative overflow-hidden border rounded-3xl p-5 transition-all cursor-pointer hover:shadow-lg ${
                completedDays.includes(item.day) 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-slate-200 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1">
                  {completedDays.includes(item.day) ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <Circle className="w-8 h-8 text-slate-200 group-hover:text-indigo-300 transition-colors" />
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Day {item.day}</span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${
                      item.type === 'New' ? 'bg-blue-100 text-blue-700' : 
                      item.type === 'Recall' ? 'bg-amber-100 text-amber-700' : 
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <h4 className={`text-xl font-bold tracking-tight transition-all ${
                    completedDays.includes(item.day) 
                      ? 'text-slate-400 line-through decoration-2' 
                      : 'text-slate-800'
                  }`}>
                    {item.topic}
                  </h4>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-sm">
                    {item.videos !== "-" && (
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        Videos: <span className="text-slate-800 font-bold">{item.videos}</span>
                      </span>
                    )}
                    {item.recall && (
                      <span className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl font-bold border border-amber-100">
                        <RefreshCcw className="w-4 h-4" />
                        Revisit: {item.recall}
                      </span>
                    )}
                  </div>
                </div>
                
                <ChevronRight className={`w-6 h-6 self-center transition-transform ${
                  completedDays.includes(item.day) ? 'text-slate-200' : 'text-slate-300 group-hover:translate-x-1'
                }`} />
              </div>
            </div>
          ))}
        </main>

        <footer className="max-w-4xl mx-auto mt-16 py-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 font-medium italic">"Master the pattern, not the problem."</p>
        </footer>
      </div>
    </div>
  );
}