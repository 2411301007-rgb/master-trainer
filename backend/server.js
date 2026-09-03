const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory "database" state to show dynamic interaction
let dashboardData = {
  user: {
    name: "Athlete",
    level: "Elite",
    avatar: ""
  },
  currentProgram: {
    name: "Movement Fundamentals",
    day: 12,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Days completed
    totalDays: 28,
  },
  weeklyProgress: {
    streak: 5,
    weeklyVolume: 24500, // in lbs
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
    },
    {
      id: "sleep-performance",
      title: "Sleep & Athletic Performance: The Sleep Debt Trap",
      description: "Understand the deep connection between slow-wave sleep stages and muscle reconstruction protocols.",
      category: "Science",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw_CMN_dNgXyb49aQBL8VkGj8DvV1DAegWaStkNgSmmSbaZPsW87Ptp2bQo-rFzF5bZaM6oInUl5FAsDdcOPf3jGqJQV2vnpYo6M5q_awT9HYCCSpGPI8Sw0wFjsu4MNc5g6M2TiDeKr6P_sSfys2JYc_Ihfa8sL58amYyukCiIyd8fOQVbJhfP3jGoHqhPK0--YFChLN_dS3IJ0AGbiGZjPhTIxJD5X_qu4W12zGtPpOUuFXfe7T5SQ"
    }
  ]
};

const exercises = [
  {
    id: "barbell-squat",
    name: "Barbell Squat",
    shortDescription: "Fundamental compound movement for lower body strength and power development.",
    difficulty: "Beginner",
    muscleGroup: "Quads",
    category: "Strength",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw_CMN_dNgXyb49aQBL8VkGj8DvV1DAegWaStkNgSmmSbaZPsW87Ptp2bQo-rFzF5bZaM6oInUl5FAsDdcOPf3jGqJQV2vnpYo6M5q_awT9HYCCSpGPI8Sw0wFjsu4MNc5g6M2TiDeKr6P_sSfys2JYc_Ihfa8sL58amYyukCiIyd8fOQVbJhfP3jGoHqhPK0--YFChLN_dS3IJ0AGbiGZjPhTIxJD5X_qu4W12zGtPpOUuFXfe7T5SQ",
    targetMuscles: {
      primary: "Quads",
      secondary: "Glutes, Hamstrings, Core"
    },
    cues: [
      { title: "Barbell Rack Position", description: "Set bar height to upper chest. Grip symmetric, slightly wider than shoulders. Shelf bar on upper traps. Unrack and take two small steps back." },
      { title: "Controlled Descent", description: "Initiate by breaking at the hips and knees simultaneously. Keep chest elevated. Squat until thighs are parallel or below parallel to ground. Knees align with toes." },
      { title: "Explosive Ascent", description: "Drive feet through floor. Lead with chest and shoulders. Maintain braced core. Extend hips and knees fully." }
    ],
    safetyNotices: [
      "Ensure safety bars are set to appropriate height.",
      "Avoid valgus collapse (knees caving in).",
      "Keep neutral spine throughout."
    ],
    proTip: "Think about screwing your feet into the floor to activate your glutes and create a stable base before you begin the descent.",
    hotspots: [
      { name: "HEAD", x: "45%", y: "25%", text: "Neutral spine, gaze slightly down." },
      { name: "SPINE", x: "55%", y: "35%", text: "Maintain natural curve, chest up." },
      { name: "CORE", x: "50%", y: "50%", text: "Braced tightly, 360-degree expansion." },
      { name: "KNEES", x: "35%", y: "65%", text: "Tracking over toes, not caving in." },
      { name: "FEET", x: "45%", y: "85%", text: "Rooted, weight balanced mid-foot." }
    ]
  },
  {
    id: "deadlift",
    name: "Deadlift",
    shortDescription: "Essential lift for overall posterior chain development and raw pulling strength.",
    difficulty: "Advanced",
    muscleGroup: "Hamstrings",
    category: "Strength",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPGB2AI8uRDbYp7e9IQ-JxT5TN6a_1IoxjQSxLAEKBrOmTD10fNQ-lEGWMJxW6rN53pzqttcbGlwqrAVnPRwbL-6w7hoZbhcNAsTJj5COlwImGlCnbK_DJHIlPfOJzdqYgGoLE2C3B227ibGioNe2cXaVpyH2YJG6BWDRH2DVD6U3DapEKEvFnJ2rb1Cg_2SChwWdHHv0bvDnb1djjosi5dGRhLj43o-OXZxlDwabZVQcTMJDYbwfsOQ",
    targetMuscles: {
      primary: "Hamstrings, Glutes, Lower Back",
      secondary: "Upper Back, Forearms, Core"
    },
    cues: [
      { title: "Setup", description: "Stand with mid-foot under the bar. Bend over and grab the bar with a shoulder-width grip. Drop your hips slightly and flatten your spine." },
      { title: "Pull", description: "Take a deep breath, brace your core. Pull the slack out of the bar, then drive your feet into the floor to lift the weight. Keep the bar close to your shins." },
      { title: "Lockout", description: "Stand tall, squeeze your glutes at the top. Do not hyper-extend your lower back." }
    ],
    safetyNotices: [
      "Keep a neutral spine; do not round your back under load.",
      "Ensure the bar travels in a straight vertical line close to your legs.",
      "Do not jerk the bar off the floor."
    ],
    proTip: "Imagine pushing the floor away from you rather than pulling the bar off the ground. This helps engage the legs and glutes early.",
    hotspots: [
      { name: "GRIP", x: "45%", y: "55%", text: "Double overhand or mixed grip, hands just outside legs." },
      { name: "BACK", x: "58%", y: "42%", text: "Lats packed tightly, chest flat and straight." },
      { name: "HIPS", x: "65%", y: "52%", text: "Hips high enough to load hamstrings, not squatted." },
      { name: "SHINS", x: "32%", y: "70%", text: "Starting with bar 1 inch from shins, touching during pull." },
      { name: "FEET", x: "40%", y: "88%", text: "Stance hip-width apart, weight centered on heels/mid-foot." }
    ]
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    shortDescription: "Unilateral lower body exercise for addressing imbalances and building functional leg strength.",
    difficulty: "Intermediate",
    muscleGroup: "Glutes",
    category: "Strength",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN17NI52vWk297ub6v33caVji7uXuuu-5z7vVfxzlV1hoOE-kdSV5PFqdXGPcddcAaknW2xLOGd-5gDbbhNKkpRwwUoSllrK64yv5LhcZ7LoamsG4EJrdPPBPdx0RZp6yNDLVuvN99XhEKYhHQXfCryK2RPCWdza6b-e4fjTwPOjeR75aYUBEB7mVdmXmemSkoSBE4lh9U5t5CDHvMDaIiAw1_DM4TfD2pZgNXLVGgoCu7At5yTgeffQ",
    targetMuscles: {
      primary: "Quads, Glutes",
      secondary: "Hamstrings, Core, Calves"
    },
    cues: [
      { title: "Placement", description: "Place one foot flat on the ground and elevate the rear foot on a bench or box behind you. Maintain a tall posture." },
      { title: "Descent", description: "Lower your hips until your rear knee is just above the floor. Ensure your front knee remains aligned with your front foot and doesn't shoot too far forward." },
      { title: "Drive", description: "Push through the heel of your front foot to return to the starting position. Keep your core braced throughout." }
    ],
    safetyNotices: [
      "Avoid letting your front knee cave inwards (valgus collapse).",
      "Keep your upper body stable; do not lean excessively forward.",
      "Control the descent to avoid banging your back knee on the floor."
    ],
    proTip: "A longer stance will target the glutes and hamstrings more, while a shorter stance shifts the focus to the quadriceps.",
    hotspots: [
      { name: "POSTURE", x: "48%", y: "22%", text: "Keep torso upright or with a slight, natural forward lean." },
      { name: "FRONT KNEE", x: "32%", y: "58%", text: "Ensure knee tracks inline with second toe, avoiding caving." },
      { name: "REAR FOOT", x: "68%", y: "55%", text: "Laces flat on bench to prevent using the rear leg to push." },
      { name: "CORE", x: "47%", y: "42%", text: "Maintain tight abdominal brace to prevent twisting." },
      { name: "FRONT FOOT", x: "30%", y: "82%", text: "Press through the front heel and mid-foot to drive up." }
    ]
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    shortDescription: "Primary vertical pushing movement for building robust shoulder and core stability.",
    difficulty: "Intermediate",
    muscleGroup: "Shoulders",
    category: "Strength",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOIyh4SHSXbbNzEfpvTeRrl9rHMM6vvOsaida5_dwh3aV99l3AZXqzJ96UJFAVa_EuXhgrqNYUbUJ1M7SkiTcqsiQiaCCU237dr_SK5RhehGDbO-qbGxTs0QcmyY-LT-4xXFRNFk_F3rwyiMzWk67rg8nj3_MBMDocrHKq71C6DqFURAEs9hpLO0HhcMXZ-s9ZFZECD82ng6mubEOkJYPQMDCgUK20f2RQYOjJPic8xOSIhxF4hpXfDw",
    targetMuscles: {
      primary: "Shoulders (Deltoids), Triceps",
      secondary: "Upper Chest, Core, Trapezius"
    },
    cues: [
      { title: "Rack Position", description: "Rest the bar on your front shoulders, elbows pointing slightly forward. Grip the bar just outside shoulder width with wrists straight." },
      { title: "Pressing Path", description: "Pull your head back slightly to clear the bar. Press the bar straight up in a vertical path. Once the bar clears your head, push your head forward to look straight." },
      { title: "Lockout", description: "Hold the bar fully extended overhead, shrugging your shoulders slightly upwards for stability." }
    ],
    safetyNotices: [
      "Do not arch your lower back excessively; brace your glutes and abs to remain rigid.",
      "Keep elbows under the bar, not flared back.",
      "Avoid using leg drive if performing a strict military press."
    ],
    proTip: "Squeeze your glutes and thighs as hard as possible during the lift. A rigid lower body provides a solid platform to press from.",
    hotspots: [
      { name: "WRISTS", x: "45%", y: "42%", text: "Keep wrists straight and directly above elbows to transfer force." },
      { name: "ELBOWS", x: "36%", y: "52%", text: "Keep elbows slightly in front of the bar in the starting rack." },
      { name: "CORE", x: "50%", y: "58%", text: "Abdominals braced tightly, ribs down, avoid lower back arch." },
      { name: "GLUTES", x: "55%", y: "68%", text: "Squeeze glutes fully to lock the pelvis in a neutral position." },
      { name: "HEAD", x: "50%", y: "25%", text: "Pull chin back as bar rises, push head forward at lockout." }
    ]
  }
];

const programs = [
  { id: "hypertrophy-base", name: "Hypertrophy Base", duration: "8 Weeks", intensity: "Moderate-High", goal: "Muscle Mass", focus: "Hypertrophy" },
  { id: "explosive-power", name: "Explosive Power", duration: "6 Weeks", intensity: "Very High", goal: "Rate of Force Development", focus: "Speed/Power" },
  { id: "metabolic-engine", name: "Metabolic Engine", duration: "4 Weeks", intensity: "High", goal: "Conditioning & Stamina", focus: "Recovery/Work Capacity" }
];

// Endpoints
app.get('/api/exercises', (req, res) => {
  res.json(exercises);
});

app.get('/api/exercises/:id', (req, res) => {
  const exercise = exercises.find(e => e.id === req.params.id);
  if (exercise) {
    res.json(exercise);
  } else {
    res.status(404).json({ error: "Exercise not found" });
  }
});

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.post('/api/dashboard/complete-workout', (req, res) => {
  const { dayIndex } = req.body; // e.g. 5 for Saturday, etc.
  
  if (dayIndex !== undefined && dayIndex >= 0 && dayIndex < 7) {
    const day = dashboardData.weeklyProgress.days[dayIndex];
    if (!day.completed) {
      day.completed = true;
      day.active = false;
      dashboardData.weeklyProgress.streak += 1;
      dashboardData.weeklyProgress.activeMinutes += 30; // Add 30 mins
      dashboardData.weeklyProgress.weeklyVolume += 3500; // Add some volume
      
      // Update next day to active if possible
      if (dayIndex + 1 < 7) {
        dashboardData.weeklyProgress.days[dayIndex + 1].active = true;
      }
      
      // Also update dashboard program day count
      dashboardData.currentProgram.day += 1;
      dashboardData.currentProgram.completedDays.push(dashboardData.currentProgram.day);
    }
    return res.json({ success: true, message: "Workout progress recorded!", data: dashboardData });
  }
  
  res.status(400).json({ error: "Invalid day index" });
});

app.get('/api/programs', (req, res) => {
  res.json(programs);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
