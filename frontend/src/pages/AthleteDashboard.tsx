import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DashboardData } from '../types';

import { API_BASE_URL } from '../config';

export default function AthleteDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = () => {
    fetch(`${API_BASE_URL}/api/dashboard`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((dashboard) => {
        setData(dashboard);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard:', err);
        setLoading(false);
        // Fallback state if server isn't running yet
        setData({
          user: { name: "Athlete", level: "Elite", avatar: "" },
          currentProgram: { name: "Movement Fundamentals", day: 12, completedDays: [1,2,3,4,5,6,7,8,9,10,11], totalDays: 28 },
          weeklyProgress: {
            streak: 5,
            weeklyVolume: 24500,
            targetVolume: 35000,
            activeMinutes: 145,
            targetMinutes: 200,
            days: [
              { name: "M", completed: true, active: false },
              { name: "T", completed: true, active: false },
              { name: "W", completed: true, active: false },
              { name: "T", completed: true, active: false },
              { name: "F", completed: true, active: true },
              { name: "S", completed: false, active: false },
              { name: "S", completed: false, active: false }
            ]
          },
          knowledgeFeed: [
            {
              id: "nutrition-recovery",
              title: "Nutrition for Recovery: The 30-Minute Window",
              description: "Optimize your post-workout fueling strategy to accelerate muscle repair and enhance adaptation after intense athletic sessions.",
              category: "New Article",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDncZnQC69Lb3vVqGFXfoyCMR4gaIjjQ6_xSB9qOZWbjK7u9LJwGiCy_MHRfJakqeAZzJx9R27CYqr4s38_6JevXFCZ-8BPVEvrXfFCD55AgKCOEDJo4w4WRozEo1cZNOPyFLh7ezupnNPeHbgp-DWHbFzHzpX8NEX-RxI5lUcvAgKFLxOON5yYw-FKmTPS_J-UJwlHuPzCocTb76B0s7EHjOKp88JgNssKSq5ydC5vNldBURUkF_A7Cg"
            }
          ]
        });
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDayClick = (index: number) => {
    if (!data) return;
    const clickedDay = data.weeklyProgress.days[index];
    if (clickedDay.completed) return; // Already completed

    fetch(`${API_BASE_URL}/api/dashboard/complete-workout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayIndex: index })
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setData(response.data);
        }
      })
      .catch((err) => {
        console.error('Failed to mark day completed on server:', err);
        // Local state update fallback
        const updatedDays = [...data.weeklyProgress.days];
        updatedDays[index] = { ...updatedDays[index], completed: true, active: false };
        if (index + 1 < 7) {
          updatedDays[index + 1] = { ...updatedDays[index + 1], active: true };
        }
        setData({
          ...data,
          currentProgram: {
            ...data.currentProgram,
            day: data.currentProgram.day + 1,
            completedDays: [...data.currentProgram.completedDays, data.currentProgram.day + 1]
          },
          weeklyProgress: {
            ...data.weeklyProgress,
            streak: data.weeklyProgress.streak + 1,
            activeMinutes: data.weeklyProgress.activeMinutes + 30,
            weeklyVolume: data.weeklyProgress.weeklyVolume + 3500,
            days: updatedDays
          }
        });
      });
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center py-xl">
        <div className="text-on-surface-variant font-body-lg">Loading dashboard details...</div>
      </div>
    );
  }

  if (!data) return null;

  // Calculate percentages
  const programProgress = Math.round((data.currentProgram.completedDays.length / data.currentProgram.totalDays) * 100);
  const volumeProgress = Math.min(100, Math.round((data.weeklyProgress.weeklyVolume / data.weeklyProgress.targetVolume) * 100));
  const activeMinsProgress = Math.min(100, Math.round((data.weeklyProgress.activeMinutes / data.weeklyProgress.targetMinutes) * 100));

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-lg max-w-[1440px] mx-auto w-full flex flex-col gap-lg">
      
      {/* Welcome Banner */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-[26px] md:text-[32px] font-bold text-on-surface mb-xs">
            Welcome back, Athlete!
          </h2>
          <p className="font-body-md text-on-surface-variant">Ready to crush today's goals?</p>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md auto-rows-min">
        
        {/* Today's Workout Card (Hero) */}
        <article className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col justify-between col-span-1 md:col-span-8 min-h-[300px] relative overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-500 group-hover:scale-105" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdicm0SaMaSM6USYJvELn4Yp6tuoWgaZEGG-iDHArCls1tHRyOqRhlDNEM689NcGmpjrg8_I1IdoZ6wv0YT9pfXAjPJS08UU2SKpN_ldATEpjqMQNgvoZNB5OKk12Y0iKP9K2kSSOSQdRWFvAL2loi065kxZfaSwLNDbTk8lbtgdcWCBI0oIjdQK6BFSf0okZXlbUgD3uNGVqxtl2roMLUE92Jp5749XEcdC5YY1hTz8TGlhf3yOhCbA')" 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-80"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-xl">
            <div className="flex justify-between items-start">
              <span className="bg-primary-container/20 text-primary font-label-sm text-xs px-sm py-xs rounded-full uppercase tracking-wider backdrop-blur-sm border border-primary/10">
                Today's Workout
              </span>
              <span className="text-on-surface-variant font-label-sm text-xs bg-surface-dim/50 px-sm py-xs rounded-full backdrop-blur-sm border border-outline-variant/20">
                45 Min
              </span>
            </div>
            
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-xl md:text-2xl font-bold mb-sm">
                {data.currentProgram.name} - Day {data.currentProgram.day}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm md:text-base mb-md max-w-md">
                Focus on hip mobility, explosive power generation, and core stability to build a robust athletic base.
              </p>
              <button 
                onClick={() => navigate('/exercises')}
                className="bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-md font-bold py-sm px-md rounded-full transition-all flex items-center gap-xs cursor-pointer inline-flex"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                Resume Workouts
              </button>
            </div>
          </div>
        </article>

        {/* Current Program Stats Card */}
        <article className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col col-span-1 md:col-span-4 justify-between min-h-[300px]">
          <div>
            <div className="flex justify-between items-center mb-md">
              <h3 className="font-headline-md text-body-lg text-on-surface font-semibold text-lg">Current Program</h3>
              <span className="material-symbols-outlined text-primary">fitness_center</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface text-lg font-bold mb-xs">
              30-Day Athletic Foundation
            </h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-xl">
              Week {Math.ceil(data.currentProgram.day / 7)} - Hypertrophy Phase
            </p>
          </div>
          
          <div>
            <div className="flex justify-between font-label-sm text-xs text-on-surface-variant mb-xs">
              <span>Program Completion</span>
              <span className="text-primary font-bold">{programProgress}%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500" 
                style={{ width: `${programProgress}%` }}
              ></div>
            </div>
          </div>
        </article>

        {/* Stats Row */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-md w-full">
          {/* Streak Stat */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-sm text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span className="font-display-lg text-[32px] font-bold text-on-surface mb-xs">
              {data.weeklyProgress.streak}
            </span>
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
              Day Streak
            </span>
          </div>

          {/* Volume Tracker */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary mb-sm text-3xl">
              bar_chart
            </span>
            <span className="font-display-lg text-[24px] font-bold text-on-surface mb-xs">
              {data.weeklyProgress.weeklyVolume.toLocaleString()} lbs
            </span>
            <div className="w-full max-w-[120px] h-1.5 bg-surface-container-highest rounded-full overflow-hidden mb-xs">
              <div className="h-full bg-primary rounded-full" style={{ width: `${volumeProgress}%` }}></div>
            </div>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
              Vol: {volumeProgress}% of target
            </span>
          </div>

          {/* Active Minutes Tracker */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary mb-sm text-3xl">
              schedule
            </span>
            <span className="font-display-lg text-[24px] font-bold text-on-surface mb-xs">
              {data.weeklyProgress.activeMinutes} / {data.weeklyProgress.targetMinutes} m
            </span>
            <div className="w-full max-w-[120px] h-1.5 bg-surface-container-highest rounded-full overflow-hidden mb-xs">
              <div className="h-full bg-secondary rounded-full" style={{ width: `${activeMinsProgress}%` }}></div>
            </div>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
              Active Minutes
            </span>
          </div>

          {/* Weekly Training Interactive Calendar */}
          <div className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col justify-center">
            <h3 className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mb-md text-center font-bold">
              Weekly Training Tracker
            </h3>
            <div className="flex justify-between items-center px-xs">
              {data.weeklyProgress.days.map((day, idx) => (
                <div 
                  key={day.name} 
                  onClick={() => handleDayClick(idx)}
                  className={`flex flex-col items-center gap-xs cursor-pointer group ${
                    day.completed ? '' : 'hover:scale-105'
                  }`}
                >
                  <span className="font-label-sm text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">{day.name}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                    day.completed 
                      ? 'bg-secondary/20 border-secondary text-secondary' 
                      : day.active
                      ? 'bg-primary-container/20 border-primary text-primary animate-pulse'
                      : 'bg-surface-bright/50 border-outline-variant/40 text-on-surface-variant hover:border-primary'
                  }`}>
                    {day.completed ? (
                      <span className="material-symbols-outlined text-sm font-bold" style={{ fontSize: '14px' }}>check</span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-primary/50 transition-colors"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Knowledge Feed / Articles */}
        <section className="col-span-1 md:col-span-12 flex flex-col gap-md mt-md">
          <h3 className="font-headline-md text-xl font-bold text-on-surface">Knowledge Feed</h3>
          
          <div className="flex flex-col gap-md">
            {data.knowledgeFeed.map((article) => (
              <a 
                key={article.id}
                href={`#articles/${article.id}`}
                className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col md:flex-row items-center gap-md group hover:border-primary transition-all duration-300"
              >
                <div 
                  className="w-full md:w-48 h-32 rounded-lg bg-cover bg-center shrink-0 border border-outline-variant/20"
                  style={{ backgroundImage: `url('${article.image}')` }}
                ></div>
                
                <div className="flex-1 flex flex-col justify-center w-full mt-sm md:mt-0">
                  <span className="bg-surface-bright text-primary font-label-sm text-[10px] px-sm py-xs rounded-full uppercase tracking-wider inline-block w-max mb-sm border border-primary/10">
                    {article.category}
                  </span>
                  <h4 className="font-headline-md text-base md:text-lg text-on-surface font-semibold mb-xs group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="font-body-md text-on-surface-variant text-xs md:text-sm">
                    {article.description}
                  </p>
                </div>
                
                <div className="hidden md:flex shrink-0 p-sm bg-surface-bright rounded-full group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
