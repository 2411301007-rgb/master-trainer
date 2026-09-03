import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Program } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
      })
      .catch((err) => {
        console.error('Failed to fetch programs:', err);
        // Fallback mock data if server isn't running yet
        setPrograms([
          { id: 'hypertrophy-base', name: 'Hypertrophy Base', duration: '8 Weeks', intensity: 'Moderate-High', goal: 'Muscle Mass', focus: 'Strength' },
          { id: 'explosive-power', name: 'Explosive Power', duration: '6 Weeks', intensity: 'Very High', goal: 'Rate of Force Development', focus: 'Speed & Agility' },
          { id: 'metabolic-engine', name: 'Metabolic Engine', duration: '4 Weeks', intensity: 'High', goal: 'Conditioning & Stamina', focus: 'Conditioning' }
        ]);
      });
  }, []);

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative w-full min-h-[85vh] flex flex-col justify-end pb-lg px-margin-mobile bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDO_GO1ck_aNNOHVTLLORPvRh_rur4gez9mbqIsys_FzlJeW4oc2E-EUhfwdDEfiQEwCNn3Of8fNadwjmBeaxzNpydD2GBvIv5sgCxAboKZ5jnyTWHgJVNdb-bpoxnYN94hOIyaDVKnKymuL_GHODXwGXOEbpg0_gsVHpHomr8Lb2G7VkZ-75ZxaDgbCqNi1U7eNQYh0lS1qEowWcWAcxkB3ftjb38W2U70EvZxe_WvVucVCQILX6u9iw')` 
        }}
      >
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col gap-md max-w-2xl mx-auto w-full">
          <div className="flex flex-col gap-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-container/20 border border-primary/30 text-primary font-label-sm w-max uppercase tracking-wider backdrop-blur-sm">
              Elite Performance
            </span>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-background text-[32px] md:text-[40px] font-bold leading-tight">
              Your Journey From Fresher to Pro Starts Here.
            </h1>
            <p className="font-body-md text-on-surface-variant text-base md:text-lg">
              Master your technique, understand your body, train with purpose, and build the knowledge you need to perform like a professional athlete.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-sm w-full mt-sm">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-primary-container text-on-primary-container font-body-lg font-bold rounded-full py-4 px-8 w-full sm:w-auto hover:bg-inverse-primary transition-all shadow-[0_0_15px_rgba(0,102,255,0.4)] text-center cursor-pointer"
            >
              Start Training
            </button>
            <button 
              onClick={() => navigate('/exercises')}
              className="border border-outline bg-surface-dim/50 text-on-background font-body-lg rounded-full py-4 px-8 w-full sm:w-auto hover:bg-surface-bright transition-all backdrop-blur-sm text-center cursor-pointer"
            >
              Explore Exercises
            </button>
          </div>
        </div>
      </section>

      {/* The Arsenal Stats Section */}
      <section className="py-lg px-margin-mobile flex flex-col gap-md bg-surface max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-sm">
          <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            analytics
          </span>
          <h2 className="font-headline-md text-on-background text-2xl font-bold">The Arsenal</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-sm md:grid-cols-4 w-full">
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] rounded-xl p-md border border-outline-variant flex flex-col justify-center items-center text-center gap-xs hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-all duration-300">
            <span className="font-display-lg text-[32px] text-secondary font-bold leading-none">500+</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">Exercises</span>
          </div>
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] rounded-xl p-md border border-outline-variant flex flex-col justify-center items-center text-center gap-xs hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-all duration-300">
            <span className="font-display-lg text-[32px] text-secondary font-bold leading-none">50+</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">Programs</span>
          </div>
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] rounded-xl p-md border border-outline-variant flex flex-col justify-center items-center text-center gap-xs hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-all duration-300">
            <span className="font-display-lg text-[32px] text-secondary font-bold leading-none">100+</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">Nutrition Guides</span>
          </div>
          <div className="bg-gradient-to-br from-[#1C1C26] to-[#16161E] rounded-xl p-md border border-outline-variant flex flex-col justify-center items-center text-center gap-xs hover:border-primary/40 hover:shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-all duration-300">
            <span className="font-display-lg text-[32px] text-secondary font-bold leading-none">10+</span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">Athletic Skills</span>
          </div>
        </div>
      </section>

      {/* Trending Programs Section */}
      <section className="py-lg px-margin-mobile bg-surface-container-low flex flex-col gap-md overflow-hidden w-full">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-end">
          <div>
            <h2 className="font-headline-md text-on-background text-2xl font-bold">Trending Programs</h2>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">Elite routines for serious gains.</p>
          </div>
          <Link to="/dashboard" className="text-primary font-label-sm flex items-center gap-1 hover:text-primary-container transition-colors font-bold text-xs uppercase tracking-wider">
            See All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-md mt-md">
          {programs.map((program) => {
            let cardBg = '';
            let tagColor = '';
            let tagText = '';

            if (program.id === 'hypertrophy-base') {
              cardBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCCLbUuJssZIhgyacVs8WGY0mF5DqhTI8u_aa20iAooSMZedU0kvrGzUmfuIywnwXRkhMClqxJRRgpct5KPHEv-IaC6nGP82Iet05ILA5aYBc5AyAsCsQDR7nEijHAjfcRCgBh95dw9j0HiVP5doc-esk66IXYPPQ5H-SHmT4a4AaTZjdKCVJcXzdhoerKyhQngJFu1kL5izqxpdYBeqEqDsTJs3y3jVXtAKs3vvMikPmKj2ZmGbdDP_Q";
              tagColor = "bg-primary/20 text-primary border-primary/20";
              tagText = "STRENGTH";
            } else if (program.id === 'explosive-power') {
              cardBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuDXVipqAhnvQULRsh_IBqPL9n6knMOd16-MBSYO2WpN5a6Wu0YMTASM0ZzEUEbFvATQgtlQ9GdtOCaRnXzslD7BY4kE039PHj9u54czkFnrrOx7dj0qqfXMQxfd6O8XGUCpIzdzYx0uoi_q8HLjxOhdhZKibcoVxzjxZqV0r-zXDubdPzU0CuRRdfnntbTKfNlSvSdtocYwck_37ySp-42xS3m8MugTNUBI8ZbXIUkOI7luaDxKr7xBjA";
              tagColor = "bg-secondary-container/20 text-secondary-container border-secondary-container/20";
              tagText = "SPEED & AGILITY";
            } else {
              cardBg = "https://lh3.googleusercontent.com/aida-public/AB6AXuCzfDs41NkCuFv5WBed7m__qwUrEjmTvYqjyJPqwozSejOdZ8J-4qldh3SgtHaGJQzCmsxJ_a01r1-BRT_WVGvzVlXXqtMe6Y_zPs-i1WJhaG6c87bysqfBp-fDiV_HXM7ZTriHnwVcMNhGzSjgHL6t6EkQvlHzJz5cGL3cN8xmiNncpf8rrS4sy5suuYrqhIjGuzihngkS-U43DcP5wg-DCRMGu0JIUemz7Q33rreSVPjoQnUxHlxT2Q";
              tagColor = "bg-error/20 text-error border-error/20";
              tagText = "CONDITIONING";
            }

            return (
              <div 
                key={program.id}
                className="relative h-[340px] rounded-xl overflow-hidden flex flex-col justify-end border border-outline-variant snap-start group bg-cover bg-center"
                style={{ backgroundImage: `url('${cardBg}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent"></div>
                <div className="relative z-10 p-md flex flex-col gap-2">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full font-label-sm text-[10px] backdrop-blur-md border ${tagColor}`}>
                      {tagText}
                    </span>
                    <span className="bg-surface-variant/80 text-on-surface px-2 py-1 rounded-full font-label-sm text-[10px] backdrop-blur-md">
                      {program.duration.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-on-background text-[20px] leading-tight font-bold">
                    {program.name}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-xs line-clamp-2">
                    {program.id === 'hypertrophy-base' && "Build a foundation of dense, functional muscle mass with progressive overload."}
                    {program.id === 'explosive-power' && "Increase your sprint speed, vertical jump, and fast-twitch muscle response."}
                    {program.id === 'metabolic-engine' && "Push your VO2 max and muscular endurance to elite levels."}
                  </p>
                </div>
                {/* Hover Glow Effect overlay */}
                <div className={`absolute inset-0 border-2 border-transparent transition-all duration-300 rounded-xl ${
                  program.id === 'hypertrophy-base' ? 'group-hover:border-primary-container' : 
                  program.id === 'explosive-power' ? 'group-hover:border-secondary-container' : 'group-hover:border-error'
                }`}></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-xl px-margin-mobile bg-surface flex flex-col items-center text-center">
        <div className="max-w-lg flex flex-col gap-md items-center">
          <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-background text-2xl md:text-3xl font-bold">
            Commit to Excellence
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Join thousands of athletes who have transformed their performance with our data-driven approach.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-sm bg-primary-container text-on-primary-container font-body-lg font-bold rounded-full py-4 px-10 w-full md:w-auto hover:bg-inverse-primary transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] cursor-pointer"
          >
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
