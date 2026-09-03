import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../types';

type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type MuscleFilter = 'All' | 'Quads' | 'Hamstrings' | 'Glutes' | 'Shoulders';

export default function ExerciseLibrary() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Strength');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');
  const [muscleFilter, setMuscleFilter] = useState<MuscleFilter>('All');

  // Categories list matching original
  const categories = ['Strength', 'Speed', 'Agility', 'Mobility', 'Recovery'];

  useEffect(() => {
    fetch('http://localhost:5001/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch exercises:', err);
        // Fallback mock exercises if server isn't running yet
        setExercises([
          {
            id: "barbell-squat",
            name: "Barbell Squat",
            shortDescription: "Fundamental compound movement for lower body strength and power development.",
            difficulty: "Beginner",
            muscleGroup: "Quads",
            category: "Strength",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw_CMN_dNgXyb49aQBL8VkGj8DvV1DAegWaStkNgSmmSbaZPsW87Ptp2bQo-rFzF5bZaM6oInUl5FAsDdcOPf3jGqJQV2vnpYo6M5q_awT9HYCCSpGPI8Sw0wFjsu4MNc5g6M2TiDeKr6P_sSfys2JYc_Ihfa8sL58amYyukCiIyd8fOQVbJhfP3jGoHqhPK0--YFChLN_dS3IJ0AGbiGZjPhTIxJD5X_qu4W12zGtPpOUuFXfe7T5SQ",
            targetMuscles: { primary: "Quads", secondary: "Glutes, Hamstrings, Core" },
            cues: [], safetyNotices: [], proTip: "", hotspots: []
          },
          {
            id: "deadlift",
            name: "Deadlift",
            shortDescription: "Essential lift for overall posterior chain development and raw pulling strength.",
            difficulty: "Advanced",
            muscleGroup: "Hamstrings",
            category: "Strength",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPGB2AI8uRDbYp7e9IQ-JxT5TN6a_1IoxjQSxLAEKBrOmTD10fNQ-lEGWMJxW6rN53pzqttcbGlwqrAVnPRwbL-6w7hoZbhcNAsTJj5COlwImGlCnbK_DJHIlPfOJzdqYgGoLE2C3B227ibGioNe2cXaVpyH2YJG6BWDRH2DVD6U3DapEKEvFnJ2rb1Cg_2SChwWdHHv0bvDnb1djjosi5dGRhLj43o-OXZxlDwabZVQcTMJDYbwfsOQ",
            targetMuscles: { primary: "Hamstrings", secondary: "Glutes, Lower Back" },
            cues: [], safetyNotices: [], proTip: "", hotspots: []
          },
          {
            id: "bulgarian-split-squat",
            name: "Bulgarian Split Squat",
            shortDescription: "Unilateral lower body exercise for addressing imbalances and building functional leg strength.",
            difficulty: "Intermediate",
            muscleGroup: "Glutes",
            category: "Strength",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN17NI52vWk297ub6v33caVji7uXuuu-5z7vVfxzlV1hoOE-kdSV5PFqdXGPcddcAaknW2xLOGd-5gDbbhNKkpRwwUoSllrK64yv5LhcZ7LoamsG4EJrdPPBPdx0RZp6yNDLVuvN99XhEKYhHQXfCryK2RPCWdza6b-e4fjTwPOjeR75aYUBEB7mVdmXmemSkoSBE4lh9U5t5CDHvMDaIiAw1_DM4TfD2pZgNXLVGgoCu7At5yTgeffQ",
            targetMuscles: { primary: "Glutes", secondary: "Quads, Hamstrings" },
            cues: [], safetyNotices: [], proTip: "", hotspots: []
          },
          {
            id: "overhead-press",
            name: "Overhead Press",
            shortDescription: "Primary vertical pushing movement for building robust shoulder and core stability.",
            difficulty: "Intermediate",
            muscleGroup: "Shoulders",
            category: "Strength",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOIyh4SHSXbbNzEfpvTeRrl9rHMM6vvOsaida5_dwh3aV99l3AZXqzJ96UJFAVa_EuXhgrqNYUbUJ1M7SkiTcqsiQiaCCU237dr_SK5RhehGDbO-qbGxTs0QcmyY-LT-4xXFRNFk_F3rwyiMzWk67rg8nj3_MBMDocrHKq71C6DqFURAEs9hpLO0HhcMXZ-s9ZFZECD82ng6mubEOkJYPQMDCgUK20f2RQYOjJPic8xOSIhxF4hpXfDw",
            targetMuscles: { primary: "Shoulders", secondary: "Triceps, Core" },
            cues: [], safetyNotices: [], proTip: "", hotspots: []
          }
        ]);
        setLoading(false);
      });
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    // 1. Category Tab Filter
    if (ex.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;

    // 2. Search Term Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nameMatch = ex.name.toLowerCase().includes(term);
      const descMatch = ex.shortDescription.toLowerCase().includes(term);
      const muscleMatch = ex.muscleGroup.toLowerCase().includes(term);
      if (!nameMatch && !descMatch && !muscleMatch) return false;
    }

    // 3. Difficulty Filter
    if (difficultyFilter !== 'All' && ex.difficulty !== difficultyFilter) return false;

    // 4. Muscle Group Filter
    if (muscleFilter !== 'All' && ex.muscleGroup !== muscleFilter) return false;

    return true;
  });

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-lg md:py-xl max-w-5xl mx-auto w-full flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-lg">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-[28px] md:text-[36px] font-bold text-on-surface mb-2">
            Exercise Library
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Explore and master athletic movements with frame-by-frame biomechanical guidelines.
          </p>
        </div>
      </div>

      {/* Search & Filter Row */}
      <section className="bg-surface-container border border-outline-variant rounded-xl p-md flex flex-col gap-sm mb-lg shadow-lg">
        <div className="flex gap-sm">
          {/* Search Input */}
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input 
              type="text" 
              placeholder="Search exercise, muscle, cue..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-lg pr-sm py-sm text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Selection Section */}
        <div className="flex flex-col sm:flex-row gap-md items-start sm:items-center mt-xs">
          <div className="flex flex-wrap gap-xs items-center">
            <span className="text-on-surface-variant font-label-sm text-[11px] uppercase mr-xs">Difficulty:</span>
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DifficultyFilter[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-sm py-xs rounded-full font-label-sm text-xs cursor-pointer border transition-colors ${
                  difficultyFilter === level 
                    ? 'bg-primary-container/20 border-primary text-primary' 
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-xs items-center">
            <span className="text-on-surface-variant font-label-sm text-[11px] uppercase mr-xs">Muscle:</span>
            {(['All', 'Quads', 'Hamstrings', 'Glutes', 'Shoulders'] as MuscleFilter[]).map((muscle) => (
              <button
                key={muscle}
                onClick={() => setMuscleFilter(muscle)}
                className={`px-sm py-xs rounded-full font-label-sm text-xs cursor-pointer border transition-colors ${
                  muscleFilter === muscle 
                    ? 'bg-primary-container/20 border-primary text-primary' 
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-outline-variant bg-surface-container-low overflow-x-auto no-scrollbar rounded-t-xl mb-md">
        <div className="flex gap-lg font-body-md text-body-md px-md pt-sm">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-sm font-bold whitespace-nowrap border-b-2 cursor-pointer transition-colors ${
                selectedCategory === cat 
                  ? 'text-primary border-primary' 
                  : 'text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Exercise Grid */}
      <section className="flex-grow">
        {loading ? (
          <div className="text-center py-xl text-on-surface-variant font-body-lg">
            Loading exercises...
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="text-center py-xl bg-surface-container/30 border border-dashed border-outline-variant rounded-xl text-on-surface-variant font-body-lg">
            No movements found matching the filters for "{selectedCategory}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {filteredExercises.map((ex) => {
              let diffColor = 'text-primary border-primary/20 bg-primary/10';
              if (ex.difficulty === 'Intermediate') {
                diffColor = 'text-tertiary border-tertiary/20 bg-tertiary/10';
              } else if (ex.difficulty === 'Advanced') {
                diffColor = 'text-error border-error/20 bg-error/10';
              }

              return (
                <article 
                  key={ex.id}
                  className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,102,255,0.15)] transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-surface-variant overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={ex.image} 
                      alt={ex.name} 
                    />
                    <div className="absolute top-sm right-sm flex gap-xs">
                      <span className="bg-surface-dim/80 backdrop-blur-sm px-xs py-xs rounded text-primary font-label-sm text-[10px] border border-primary/20">
                        {ex.muscleGroup}
                      </span>
                      <span className={`bg-surface-dim/80 backdrop-blur-sm px-xs py-xs rounded font-label-sm text-[10px] border ${diffColor}`}>
                        {ex.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-md flex flex-col flex-grow bg-gradient-to-br from-[#1C1C26] to-[#16161E]">
                    <h3 className="font-headline-md text-lg text-on-surface font-bold mb-xs">
                      {ex.name}
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-sm line-clamp-2 mb-md">
                      {ex.shortDescription}
                    </p>
                    <div className="mt-auto">
                      <button 
                        onClick={() => navigate(`/exercises/${ex.id}`)}
                        className="w-full cursor-pointer bg-primary-container text-on-primary-container font-body-md text-sm font-bold py-sm rounded-full hover:bg-primary-container/90 transition-colors shadow-[0_0_10px_rgba(0,102,255,0.2)] hover:shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                      >
                        Learn Technique
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
