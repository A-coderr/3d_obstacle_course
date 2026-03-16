# ThreeRun Learning Mode – Product Analysis & Roadmap

## 1) Problem Worth Solving

Most developers trying to learn **TypeScript + Three.js** hit a motivation gap:
- Tutorials are passive and easy to forget.
- 3D math concepts (vectors, transforms, camera, lighting) feel abstract.
- People struggle to connect API knowledge to real projects.

A game-like learning loop can make this practical: **learn a concept, use it immediately, and get feedback**.

## 2) Product Concept

Turn ThreeRun into a **playable obstacle course with learning stations**:
- Players run through a 3D level.
- At stations, they complete 30–90 second micro-lessons.
- Lessons unlock abilities or shortcuts in the same level.
- The course doubles as a portfolio artifact showing engineering + pedagogy.

## 3) Why People Benefit

### Learners
- Better retention through “learn then apply in context”.
- Lower intimidation for Three.js fundamentals.
- Clear progression from beginner to intermediate topics.

### Hiring Managers / Interviewers
- Demonstrates product thinking, not just coding.
- Shows TypeScript + Three.js depth in a single project.
- Highlights measurable outcomes (completion rate, quiz accuracy, concept mastery).

### Creator (You)
- Strong interview narrative: identified an education problem and built an interactive solution.
- Reusable architecture for future learning tracks (WebGL, shaders, physics, etc.).
- Great public demo for portfolio + blog posts.

## 4) Core Learning Design (How to Make It Work)

Use a repeatable loop:
1. **Challenge** (obstacle reveals a concept gap).
2. **Teach** (small station with interactive explanation).
3. **Apply** (player uses concept to pass next obstacle).
4. **Assess** (quick check or puzzle).
5. **Reward** (score, badge, unlocked route, time bonus).

Example:
- Obstacle: Moving platforms.
- Station topic: `deltaTime` and frame-rate independent movement.
- Apply: Tune platform speed correctly to cross safely.

## 5) Candidate Station Topics

### Track A: TypeScript for Game Dev
1. Types vs interfaces in entity definitions.
2. Union types for player states (`idle | run | jump | fall`).
3. `Readonly` and immutability in state updates.
4. Narrowing and guards for collision events.
5. Generic utility for reusable game config.

### Track B: Three.js / R3F Fundamentals
1. Scene graph and parent-child transforms.
2. World vs local coordinates.
3. Camera basics (FOV, follow smoothing).
4. Lighting and material tradeoffs.
5. Animation loop and `delta` timing.

### Track C: Practical Gameplay Engineering
1. Collision and triggers with Rapier.
2. Checkpoints and respawn design.
3. Difficulty tuning and balancing.
4. Performance basics (draw calls, shadows, texture sizes).

## 6) Feature Recommendations (High-Impact First)

## Phase 1 — MVP Learning Experience
- Add a **Learning Station component** (trigger volume + modal/panel).
- Add **station metadata** (title, concept, prompt, answer type).
- Add **knowledge checks** (multiple choice / mini interaction).
- Gate at least one obstacle behind station completion.
- Add completion summary: time + concept score.

**Outcome:** prove the core thesis (“fun + learning”).

## Phase 2 — Portfolio Differentiators
- Add **skill tree / progression map**.
- Add **adaptive hints** when player fails repeatedly.
- Add **explanatory overlays** in-world (vector arrows, axes, debug views).
- Add **analytics events** (station start, success, retries, time-on-station).
- Save progress locally.

**Outcome:** showcases product and learning UX depth.

## Phase 3 — Interview-Ready Engineering Depth
- Content pipeline (JSON/MDX driven stations).
- Unit tests for scoring/progression logic.
- End-to-end tests for station flow.
- Performance pass (LOD, shadows, texture compression).
- Accessibility pass (keyboard-only, color contrast, readable UI sizes).

**Outcome:** shows maintainability, quality, and scaling mindset.

## 7) Suggested Technical Architecture

- `stations/StationSchema.ts`: typed lesson schema.
- `stations/stationContent.ts`: content config list.
- `components/learning/LearningStation.tsx`: trigger + UI container.
- `components/learning/StationPanel.tsx`: lesson and quiz UI.
- `store/learningSlice.ts`: progress, score, completion flags.
- `lib/analytics.ts`: local event tracking abstraction.

Keep lesson content data-driven so adding stations does not require rewriting game logic.

## 8) KPIs to Validate Value

- Station completion rate.
- Retry count per station.
- Average time per concept.
- Pre/post station confidence (self-rating).
- Course completion and return rate.

These metrics provide concrete evidence in interviews that your project solves a real learning problem.

## 9) 6-Week Roadmap

### Week 1: Product definition
- Define target learner persona.
- Write 6–8 station learning objectives.
- Build station schema and content model.

### Week 2: Gameplay integration
- Implement trigger-based station system.
- Add first 2 stations (1 TS, 1 Three.js).
- Gate one obstacle by completion state.

### Week 3: Progress + feedback
- Add scoring, retries, and completion UI.
- Add checkpoints tied to learning milestones.
- Add local save/load.

### Week 4: Polish + performance
- Improve visual clarity and in-world guidance.
- Tune obstacle difficulty and station pacing.
- Optimize frame rate and loading behavior.

### Week 5: Validation
- Playtest with 5–10 learners.
- Gather usability feedback and analytics.
- Iterate on unclear stations.

### Week 6: Portfolio packaging
- Write case study (problem, hypotheses, metrics, outcomes).
- Record demo video showing learning loop.
- Prepare interview talking points and architecture diagram.

## 10) Interview Storyline (How to Pitch It)

Frame the project as:
1. **Problem:** Developers struggle to retain TS/Three.js from passive tutorials.
2. **Solution:** A 3D obstacle course with embedded micro-learning stations.
3. **Execution:** Data-driven lesson architecture + gameplay integration + analytics.
4. **Impact:** Improved completion and concept mastery metrics from playtests.

This turns the project from “a game clone” into “an educational product with measurable value.”
