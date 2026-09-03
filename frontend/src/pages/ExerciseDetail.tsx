import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Exercise, Hotspot } from '../types';

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [completed, setCompleted] = useState(false);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5001/api/exercises/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Exercise not found');
        return res.json();
      })
      .then((data) => {
        setExercise(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch exercise detail:', err);
        setLoading(false);
      });
  }, [id]);

  const handleCompleteWorkout = () => {
    setLogging(true);
    // Complete workout for today (e.g. index 5, Saturday or whatever is active)
    fetch('http://localhost:5001/api/dashboard/complete-workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayIndex: 5 }) // Simulate logging for Saturday (Day 6)
    })
      .then((res) => res.json())
      .then(() => {
        setLogging(false);
        setCompleted(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      })
      .catch((err) => {
        console.error('Failed to log workout:', err);
        setLogging(false);
        // Fallback simulate
        setCompleted(true);
      });
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center py-xl">
        <div className="text-on-surface-variant font-body-lg">Loading exercise details...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-xl gap-md">
        <div className="text-error font-headline-md text-xl font-bold">Exercise Not Found</div>
        <Link to="/exercises" className="text-primary font-bold hover:underline">
          Back to Exercise Library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl max-w-5xl mx-auto w-full flex flex-col">
      {/* Back breadcrumb */}
      <div className="mb-md">
        <Link to="/exercises" className="flex items-center gap-xs text-primary font-label-sm text-xs font-bold uppercase tracking-wider hover:text-primary-container transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Exercises
        </Link>
      </div>

      {/* Main Title Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-lg">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-label-sm text-xs uppercase tracking-wider mb-sm">
            {exercise.category} • {exercise.difficulty}
          </span>
          <h1 className="font-headline-lg-mobile md:font-display-lg text-[32px] md:text-[48px] font-bold text-white leading-tight">
            {exercise.name}
          </h1>
          <p className="font-body-md text-on-surface-variant text-base mt-2">
            {exercise.shortDescription}
          </p>
        </div>

        <button 
          onClick={handleCompleteWorkout}
          disabled={completed || logging}
          className={`flex items-center gap-sm px-md py-sm rounded-full font-body-md font-bold transition-all shadow-md cursor-pointer ${
            completed 
              ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(47,248,1,0.3)]' 
              : 'bg-primary-container text-on-primary-container hover:bg-primary-container/90 hover:shadow-[0_0_15px_rgba(0,102,255,0.3)]'
          }`}
        >
          <span className="material-symbols-outlined">
            {completed ? 'check_circle' : logging ? 'hourglass_empty' : 'check'}
          </span>
          <span>
            {completed ? 'Logged to Calendar!' : logging ? 'Logging...' : 'Complete & Log Technique'}
          </span>
        </button>
      </section>

      {/* Layout Split: Left details, Right interactive image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md items-start">
        {/* Right side: Interactive hotspot image (placed first on mobile/responsive grids logically or styled nicely) */}
        <section className="col-span-1 md:col-span-6 bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col gap-md order-1 md:order-2">
          <div className="flex flex-col gap-xs">
            <span className="font-label-sm text-[11px] text-primary uppercase tracking-widest font-bold">Interactive Biomechanics</span>
            <p className="font-body-md text-on-surface-variant text-sm">
              Tap the highlighted pulse nodes to examine alignment constraints.
            </p>
          </div>

          {/* Interactive Container */}
          <div className="relative w-full aspect-[4/5] bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden flex items-center justify-center">
            {/* Base Image */}
            <img 
              src={exercise.image} 
              alt={exercise.name}
              className="w-full h-full object-cover opacity-80"
            />
            {/* Dark tint overlay to make spots shine */}
            <div className="absolute inset-0 bg-black/35 pointer-events-none"></div>

            {/* Hotspots */}
            {exercise.hotspots.map((spot) => (
              <button
                key={spot.name}
                onClick={() => setActiveHotspot(activeHotspot?.name === spot.name ? null : spot)}
                style={{ top: spot.x, left: spot.y }} // Notice: original uses top/left class styles
                className={`hotspot ${activeHotspot?.name === spot.name ? 'active' : ''}`}
                title={spot.name}
              />
            ))}

            {/* Active Cue Card Box Overlay */}
            <div 
              className={`absolute bottom-sm left-sm right-sm bg-surface-container/95 backdrop-blur-md border border-primary/30 p-md rounded-lg shadow-2xl transition-all duration-300 ${
                activeHotspot ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              {activeHotspot && (
                <div className="flex flex-col gap-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-headline-md text-primary font-bold text-sm tracking-wider uppercase">
                      {activeHotspot.name}
                    </span>
                    <button 
                      onClick={() => setActiveHotspot(null)}
                      className="text-on-surface-variant hover:text-white text-xs flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <p className="font-body-md text-white text-sm mt-1">
                    {activeHotspot.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Left side: Instructions & Tips */}
        <section className="col-span-1 md:col-span-6 flex flex-col gap-md order-2 md:order-1">
          {/* Target Muscles */}
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] border border-outline-variant rounded-xl p-md flex flex-col gap-sm">
            <h3 className="font-headline-md text-on-surface font-semibold text-lg flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">fitness_center</span> Target System
            </h3>
            <div className="grid grid-cols-2 gap-sm text-sm border-t border-outline-variant/30 pt-sm mt-xs">
              <div>
                <span className="text-on-surface-variant font-label-sm text-[11px] uppercase block mb-1">Primary Engine</span>
                <span className="font-bold text-white text-base">{exercise.targetMuscles.primary}</span>
              </div>
              <div>
                <span className="text-on-surface-variant font-label-sm text-[11px] uppercase block mb-1">Secondary Stability</span>
                <span className="font-semibold text-on-surface-variant">{exercise.targetMuscles.secondary}</span>
              </div>
            </div>
          </div>

          {/* Setup / Execution Steps */}
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] border border-outline-variant rounded-xl p-md flex flex-col gap-md">
            <h3 className="font-headline-md text-on-surface font-semibold text-lg flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">list_alt</span> Execution Phase Protocol
            </h3>
            <ol className="flex flex-col gap-md border-t border-outline-variant/30 pt-md">
              {exercise.cues.map((cue, index) => (
                <li key={cue.title} className="flex gap-md items-start">
                  <span className="w-6 h-6 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center text-primary font-bold shrink-0 text-xs">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-base">{cue.title}</span>
                    <p className="font-body-md text-on-surface-variant text-sm mt-1">{cue.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Coaching Tip */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-md flex gap-sm items-start">
            <span className="material-symbols-outlined text-primary shrink-0">lightbulb</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-primary uppercase tracking-widest text-[11px] font-bold">Pro Coaching Tip</span>
              <p className="font-body-md text-on-surface-variant text-sm mt-1 italic">
                "{exercise.proTip}"
              </p>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-error/5 border border-error/20 rounded-xl p-md flex flex-col gap-sm">
            <h3 className="font-headline-md text-error font-semibold text-base flex items-center gap-xs uppercase tracking-wider text-sm">
              <span className="material-symbols-outlined text-error">warning</span> Safety &amp; Joint Constraints
            </h3>
            <ul className="list-disc pl-md text-on-surface-variant text-sm flex flex-col gap-xs">
              {exercise.safetyNotices.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
