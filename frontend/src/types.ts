export interface Hotspot {
  name: string;
  x: string;
  y: string;
  text: string;
}

export interface Cue {
  title: string;
  description: string;
}

export interface Exercise {
  id: string;
  name: string;
  shortDescription: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  muscleGroup: string;
  category: string;
  image: string;
  targetMuscles: {
    primary: string;
    secondary: string;
  };
  cues: Cue[];
  safetyNotices: string[];
  proTip: string;
  hotspots: Hotspot[];
}

export interface Program {
  id: string;
  name: string;
  duration: string;
  intensity: string;
  goal: string;
  focus: string;
}

export interface TrainingDay {
  name: string;
  completed: boolean;
  active: boolean;
}

export interface DashboardData {
  user: {
    name: string;
    level: string;
    avatar: string;
  };
  currentProgram: {
    name: string;
    day: number;
    completedDays: number[];
    totalDays: number;
  };
  weeklyProgress: {
    streak: number;
    weeklyVolume: number;
    targetVolume: number;
    activeMinutes: number;
    targetMinutes: number;
    days: TrainingDay[];
  };
  knowledgeFeed: {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
  }[];
}
