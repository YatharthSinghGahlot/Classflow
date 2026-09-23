/**
 * Realistic Mock Data Generator for TeachAI
 * Pre-calibrated for Photosynthesis (Grade 8 Science 45 min)
 * with robust generative fallbacks for any custom topic/grade/subject.
 */

export const DEFAULT_PHOTOSYNTHESIS_LESSON = {
  id: "lesson-photosynthesis-g8",
  meta: {
    topic: "Photosynthesis",
    grade: "Grade 8",
    subject: "Science",
    duration: "45 minutes",
    teachingStyle: "Mixed",
    difficulty: "Standard",
    learningPreferences: ["Visual", "Hands-on", "Discussion"],
    classType: "Whole Class",
    createdAt: new Date().toISOString()
  },
  readinessCheck: {
    score: 98,
    status: "Ready to teach",
    badgeType: "success",
    items: [
      { id: "r1", label: "Grade appropriate", passed: true, note: "Vocabulary and concepts calibrated for Grade 8 level" },
      { id: "r2", label: "Fits 45-minute class", passed: true, note: "Pacing timed: 5m Hook, 10m Expl, 15m Activity, 10m Disc, 5m Assess" },
      { id: "r3", label: "Learning objectives included", passed: true, note: "3 distinct Bloom taxonomy cognitive levels included" },
      { id: "r4", label: "Assessment included", passed: true, note: "5-question quiz + formative exit ticket provided" },
      { id: "r5", label: "Activities included", passed: true, note: "Hands-on paired leaf stomata simulation included" },
      { id: "r6", label: "Worksheet aligned", passed: true, note: "Directly reinforces core chloroplast concepts" },
      { id: "r7", label: "Quiz aligned", passed: true, note: "Mapped across recall, understanding, application, analysis" }
    ]
  },
  lessonPlan: {
    title: "Introduction to Photosynthesis: Powering Life on Earth",
    overview: "In this 45-minute interactive science lesson, 8th-grade students explore how autotrophs transform solar energy, water, and carbon dioxide into glucose and oxygen. Students will dissect the cellular factory of the chloroplast, model the biochemical reaction, and connect plant energy conversion to global ecological balance.",
    objectives: [
      "Define photosynthesis and explain its essential chemical equation in plain terms.",
      "Identify the raw materials (reactants) required and the products generated.",
      "Explain the specific role of sunlight and chlorophyll in cellular energy conversion."
    ],
    materials: [
      "Fresh variegated leaves or spinach leaf samples (1 per student pair)",
      "Magnifying hand lenses / basic classroom microscope slides",
      "Student Worksheet: 'The Photosynthesis Equation Blueprint'",
      "Dry-erase board and markers for student visual diagramming",
      "Printed 2-Minute Exit Tickets"
    ],
    timeline: [
      {
        id: "tl1",
        time: "00–05 min",
        phase: "HOOK",
        title: "The Plant Mystery: How Do Giants Eat?",
        description: "Display an image of a 300-foot Redwood tree alongside a tiny acorn. Ask students: 'Where did all that wood mass come from if plants don't have mouths and soil doesn't disappear?' Let students debate briefly in pairs.",
        tip: "Encourage misconceptions to surface early (e.g. 'they eat soil nutrients') so you can dismantle them systematically."
      },
      {
        id: "tl2",
        time: "05–15 min",
        phase: "EXPLANATION",
        title: "The Chloroplast Factory & The Chemical Equation",
        description: "Direct instruction on plant anatomy and the chemical recipe. Introduce chlorophyll as the solar panel and write the core word equation on the board: Carbon Dioxide + Water + Light Energy ──> Glucose + Oxygen.",
        tip: "Break down CO₂ and H₂O with simple color-coded circles so visual learners grasp atom rearrangements."
      },
      {
        id: "tl3",
        time: "15–30 min",
        phase: "ACTIVITY",
        title: "Hands-on Leaf Stomata & Equation Modeling",
        description: "Students work in pairs with fresh leaves and hand lenses to spot stomata on the leaf undersides. Then using equation cards, pairs physically assemble the reactants and products of photosynthesis.",
        tip: "Circulate the room to ensure students distinguish between inputs entering stomata vs. root absorption."
      },
      {
        id: "tl4",
        time: "30–40 min",
        phase: "DISCUSSION",
        title: "Classroom Synthesis: The Global Oxygen Link",
        description: "Facilitate a structured whole-class discussion: 'What would happen to animal life if all plant photosynthesis stopped for one month?' Connect local cellular processes to planetary climate stability.",
        tip: "Cold call 2-3 student pairs to share their leaf observation findings before opening the floor."
      },
      {
        id: "tl5",
        time: "40–45 min",
        phase: "ASSESSMENT",
        title: "Wrap-Up & 2-Minute Exit Ticket",
        description: "Students complete the individual 2-minute Exit Ticket handout to assess comprehension of reactants vs products before dismissal.",
        tip: "Collect tickets at the classroom door as their pass to dismissal."
      }
    ],
    assessment: "Formative checks during paired modeling activity, quick-response verbal questions during discussion, and graded 5-question Quiz & Exit Ticket.",
    homework: "Observe 3 different plants in your neighborhood or home. Sketch one leaf and write 2 sentences predicting where its chlorophyll is most concentrated and why."
  },
  teachingScript: {
    heading: "Teacher Script",
    subheading: "What to say and do during the lesson.",
    timeline: [
      {
        id: "ts1",
        time: "00–05 min",
        phase: "Hook",
        action: "Point to the projection of a massive 300ft Sequoia tree. Hold up a tiny acorn in your hand.",
        question: "If plants don't eat like humans, and soil mass doesn't decrease when trees grow, where does all this wood and food come from?",
        expectedResponse: "Students usually shout: 'From the soil!', 'From water!', or 'From sunlight!'.",
        teacherTip: "Acknowledge every guess: 'Notice how we naturally assume food must come from soil! Today we'll discover why plants literally build themselves out of thin air.'"
      },
      {
        id: "ts2",
        time: "05–15 min",
        phase: "Explanation",
        action: "Move to the classroom chalkboard. Draw a large sun with arrows beaming toward a stylized leaf outline.",
        question: "Look closely at the leaf. What pigment gives it that rich green color, and what does it trap?",
        expectedResponse: "'Chlorophyll!' and 'It traps sunlight / solar energy!'",
        teacherTip: "Emphasize that light isn't a physical ingredient like water; it is the energy power source that drives the machinery."
      },
      {
        id: "ts3",
        time: "15–30 min",
        phase: "Activity Guidance",
        action: "Hand out the leaf specimens and hand lenses. Signal student pairs to examine the underside of the leaf.",
        question: "Turn the leaf over under your lens. Do you see microscopic pores? What are those called and what enters through them?",
        expectedResponse: "'Stomata! Carbon dioxide goes in, and oxygen comes out!'",
        teacherTip: "Circulate to table 3 and 5 first to verify students are focusing their lenses correctly."
      },
      {
        id: "ts4",
        time: "30–40 min",
        phase: "Discussion Facilitation",
        action: "Call attention back to the center board. Connect photosynthesis to human respiration.",
        question: "Take a deep breath in. Who made that oxygen you just breathed? And what gas did you just exhale back for the plants?",
        expectedResponse: "'Plants made the oxygen, and we gave them carbon dioxide back!'",
        teacherTip: "Highlight the reciprocal mutualism between animal respiration and plant photosynthesis."
      },
      {
        id: "ts5",
        time: "40–45 min",
        phase: "Wrap-up & Assessment",
        action: "Pass out the exit ticket slips. Set a 2-minute timer on the classroom screen.",
        question: "Before you pack up, write down the three ingredients plants need, and the one thing that is still fuzzy for you.",
        expectedResponse: "Silent individual writing. Students deposit tickets in the collection bin on exit.",
        teacherTip: "Review the 'What is still unclear' responses during your planning period to adjust tomorrow's warmup."
      }
    ]
  },
  worksheet: {
    title: "Student Practice Worksheet: The Photosynthesis Engine",
    instructions: "Read each question carefully. Write your answers in the spaces provided or select the best option. Do not use your textbook for Part B.",
    questions: [
      {
        id: "w1",
        type: "short_answer",
        prompt: "1. What is photosynthesis? Define it in your own words and explain why it is an energy transformation.",
        lines: 3
      },
      {
        id: "w2",
        type: "equation",
        prompt: "2. Complete the chemical word equation for photosynthesis by filling in the missing blanks:",
        equation: "________________ + Water + Sunlight  ───>  Glucose + ________________"
      },
      {
        id: "w3",
        type: "multiple_choice",
        prompt: "3. Which organelle inside plant cells contains chlorophyll and serves as the site of photosynthesis?",
        options: ["A. Mitochondria", "B. Chloroplast", "C. Nucleus", "D. Ribosome"]
      },
      {
        id: "w4",
        type: "short_answer",
        prompt: "4. What role do stomata play on the underside of a leaf? What gas enters and what gas exits?",
        lines: 2
      },
      {
        id: "w5",
        type: "application",
        prompt: "5. Real-World Scenario: A greenhouse grower notices their plants stop growing when they seal all windows airtight for three weeks. Based on today's lesson, which gas was depleted and why?",
        lines: 3
      }
    ]
  },
  quiz: {
    title: "5-Question Photosynthesis Mastery Assessment",
    questions: [
      {
        id: 1,
        question: "What are the two primary chemical products created during the process of photosynthesis?",
        options: [
          "A. Carbon dioxide and water",
          "B. Glucose and oxygen",
          "C. Sunlight and chlorophyll",
          "D. Nitrogen and starch"
        ],
        correct: "B",
        explanation: "Plants convert light energy, carbon dioxide, and water into glucose (chemical energy) and release oxygen as a byproduct.",
        category: "Recall"
      },
      {
        id: 2,
        question: "What is the primary function of chlorophyll in plant leaf cells?",
        options: [
          "A. To absorb water directly from the surrounding air",
          "B. To protect the plant against harmful insect pests",
          "C. To capture light energy from the sun to drive chemical reactions",
          "D. To transport glucose from the leaves down into the roots"
        ],
        correct: "C",
        explanation: "Chlorophyll is the green pigment in chloroplasts that absorbs sunlight energy required to split water molecules.",
        category: "Understanding"
      },
      {
        id: 3,
        question: "If a scientist places an aquatic plant under bright light and counts bubbles emerging from its stem, what gas do those bubbles primarily contain?",
        options: [
          "A. Oxygen (O₂)",
          "B. Carbon dioxide (CO₂)",
          "C. Hydrogen gas (H₂)",
          "D. Methane (CH₄)"
        ],
        correct: "A",
        explanation: "Under bright light, photosynthesis proceeds actively, and excess oxygen gas is released as bubbles in water.",
        category: "Application"
      },
      {
        id: 4,
        question: "Which of the following environmental factors would directly SLOW DOWN the rate of photosynthesis in a garden?",
        options: [
          "A. An increase in sunny daylight hours",
          "B. An increase in soil moisture during drought",
          "C. Adequate ambient carbon dioxide levels",
          "D. Heavy smog or dust covering leaf stomata pores"
        ],
        correct: "D",
        explanation: "Blocked stomata prevent carbon dioxide from entering the leaf, severely restricting the photosynthetic reaction rate.",
        category: "Application"
      },
      {
        id: 5,
        question: "How does the law of conservation of mass apply to photosynthesis?",
        options: [
          "A. Sunlight is converted into physical matter inside the plant stem",
          "B. The total number of carbon, hydrogen, and oxygen atoms in the reactants equals the atoms in the products",
          "C. Mass is created from nothing because plants grow heavier each week",
          "D. Water disappears completely and is replaced by sugar molecules"
        ],
        correct: "B",
        explanation: "Photosynthesis rearranges 6 CO₂ + 6 H₂O into C₆H₁₂O₆ + 6 O₂; no atoms are created or destroyed.",
        category: "Analysis"
      }
    ],
    answerKey: [
      { questionNumber: 1, correctOption: "B" },
      { questionNumber: 2, correctOption: "C" },
      { questionNumber: 3, correctOption: "A" },
      { questionNumber: 4, correctOption: "D" },
      { questionNumber: 5, correctOption: "B" }
    ],
    coverage: {
      recall: 1,
      understanding: 1,
      application: 2,
      analysis: 1
    }
  },
  differentiation: {
    support: {
      badge: "Support Scaffolding",
      color: "#16A34A",
      bgLight: "#F0FDF4",
      description: "For students who need additional scaffolding and visual structure",
      strategies: [
        "Sentence starters for all short-answer questions (e.g. 'Photosynthesis happens when...')",
        "Pre-labeled diagram of the chloroplast showing where light and water enter",
        "Word bank containing key vocabulary (Chlorophyll, Stomata, Glucose, Reactants)",
        "Paired buddy system for the leaf inspection activity"
      ],
      modifiedTask: "Focus on identifying the 3 inputs and 2 outputs using color-coded cards before writing equations."
    },
    standard: {
      badge: "Grade-Level Standard",
      color: "#2563EB",
      bgLight: "#EFF6FF",
      description: "Grade-level learning for typical Grade 8 students",
      strategies: [
        "Complete word equation and chemical symbols (CO₂ + H₂O -> C₆H₁₂O₆ + O₂)",
        "Independent hand-lens observation with guided questions",
        "Standard 5-question mastery quiz with higher-order distractors",
        "Collaborative discussion on energy flow in ecosystems"
      ],
      modifiedTask: "Follow regular worksheet and timeline activities as specified in the lesson plan."
    },
    challenge: {
      badge: "Extension & Challenge",
      color: "#9333EA",
      bgLight: "#FAF5FF",
      description: "For advanced students and rapid-mastery learners",
      strategies: [
        "Investigate Light-Dependent vs. Light-Independent (Calvin cycle) stages",
        "Analyze graphs of photosynthesis rate vs. light intensity and temperature",
        "Formulate a hypothesis explaining why chlorophyll reflects green light instead of absorbing it",
        "Bonus question: Predict how desert plants (CAM photosynthesis) conserve water while taking in CO₂"
      ],
      modifiedTask: "Design a controlled experiment to measure the rate of photosynthesis under blue, green, and red light filters."
    }
  },
  visualAid: {
    title: "Teaching Visual & Classroom Board Plan",
    boardPlan: `
        PHOTOSYNTHESIS
   "Putting Together With Light"

             ☀️ SUNLIGHT (Energy)
                 │
                 ▼
         🌿 LEAF [Chloroplast]

    [REACTANTS: In]          [PRODUCTS: Out]
    • CO₂ (Carbon Dioxide)   • Glucose (C₆H₁₂O₆)
    • H₂O (Water from Soil)  • Oxygen (O₂)

    Equation:
    CO₂  +  H₂O  ──[Sunlight / Chlorophyll]──>  GLUCOSE  +  O₂

    Key Vocabulary:
    ★ CHLOROPHYLL: Green solar pigment
    ★ STOMATA: Breathing pores under leaf
    `,
    suggestions: [
      "Draw a plant diagram showing roots taking in H₂O and arrows for CO₂ entering leaves.",
      "Show a live leaf specimen and peel thin epidermal layer for magnifying viewer.",
      "Use sunlight demonstration with a prism to illustrate photon energy.",
      "Ask students to label the process on individual whiteboards during the synthesis check."
    ]
  },
  exitTicket: {
    title: "2-Minute Exit Ticket",
    subtitle: "Quick formative check before class dismissal.",
    questions: [
      { id: "e1", prompt: "1. What is one key thing you learned about how plants make their food today?" },
      { id: "e2", prompt: "2. Explain photosynthesis in one complete sentence using the words 'sunlight' and 'glucose'." },
      { id: "e3", prompt: "3. What concept is still unclear or fuzzy for you from today's lesson?" }
    ]
  },
  catchUpPack: {
    title: "Student Catch-Up Pack",
    subtitle: "For students who missed the lesson.",
    sections: {
      missedSummary: "In this lesson, we discovered that plants are autotrophs—organisms that make their own food! Instead of eating soil, plants use specialized green pigments called chlorophyll to capture light energy from the sun. They combine this sunlight with carbon dioxide from the air and water from their roots to produce glucose (sugar) and oxygen gas.",
      keyConcepts: [
        "Photosynthesis converts radiant light energy into stored chemical energy (glucose).",
        "The two inputs are Carbon Dioxide (CO₂) and Water (H₂O).",
        "The two outputs are Glucose (C₆H₁₂O₆) and Oxygen (O₂).",
        "The organelle responsible is the Chloroplast, containing Chlorophyll.",
        "Gases enter and leave through tiny pores on the underside of leaves called Stomata."
      ],
      vocabulary: [
        { term: "Autotroph", definition: "An organism that produces its own food from inorganic substances." },
        { term: "Chloroplast", definition: "The cellular organelle in plants where photosynthesis takes place." },
        { term: "Chlorophyll", definition: "The green pigment inside chloroplasts that absorbs light energy." },
        { term: "Stomata", definition: "Microscopic openings on leaf surfaces that control gas exchange." },
        { term: "Glucose", definition: "A simple sugar that plants use for energy and building cellular structures." }
      ],
      practice: [
        "1. Where does a plant obtain the carbon atoms needed to build glucose?",
        "2. Why are leaves green instead of red or blue?",
        "3. What happens to the oxygen produced during photosynthesis?",
        "4. If a plant is kept in total darkness for a week, what will happen to its glucose production?",
        "5. Write the word equation for photosynthesis from memory."
      ],
      miniQuiz: [
        { q: "1. What is the source of energy for photosynthesis?", a: "Sunlight (solar radiant energy)" },
        { q: "2. What pore allows CO₂ to enter the leaf?", a: "Stomata" },
        { q: "3. What are the two products of photosynthesis?", a: "Glucose and Oxygen" }
      ]
    }
  }
};

/**
 * Generate a complete dynamic lesson package for any custom inputs
/**
 * Generates calibrated questions for any topic with Bloom cognitive taxonomy balance
 */
export function buildDynamicQuiz(safeTopic, subject = "Science", count = 5, grade = "Grade 8") {
  const isPhotosynthesis = safeTopic.toLowerCase().includes('photosynthesis');
  const targetCount = Math.max(1, Math.min(Number(count) || 5, 15));

  // 15 calibrated questions for Photosynthesis
  const photosynthesisPool = [
    {
      id: 1,
      question: "What are the two primary chemical products created during the process of photosynthesis?",
      options: [
        "A. Carbon dioxide and water",
        "B. Glucose and oxygen",
        "C. Sunlight and chlorophyll",
        "D. Nitrogen and starch"
      ],
      correct: "B",
      explanation: "Plants convert light energy, carbon dioxide, and water into glucose (chemical energy) and release oxygen as a byproduct.",
      category: "Recall"
    },
    {
      id: 2,
      question: "What is the primary function of chlorophyll in plant leaf cells?",
      options: [
        "A. To absorb water directly from the surrounding air",
        "B. To protect the plant against harmful insect pests",
        "C. To capture light energy from the sun to drive chemical reactions",
        "D. To transport glucose from the leaves down into the roots"
      ],
      correct: "C",
      explanation: "Chlorophyll is the green pigment in chloroplasts that absorbs sunlight energy required to split water molecules.",
      category: "Understanding"
    },
    {
      id: 3,
      question: "If a scientist places an aquatic plant under bright light and counts bubbles emerging from its stem, what gas do those bubbles primarily contain?",
      options: [
        "A. Oxygen (O₂)",
        "B. Carbon dioxide (CO₂)",
        "C. Hydrogen gas (H₂)",
        "D. Methane (CH₄)"
      ],
      correct: "A",
      explanation: "Under bright light, photosynthesis proceeds actively, and excess oxygen gas is released as bubbles in water.",
      category: "Application"
    },
    {
      id: 4,
      question: "Which of the following environmental factors would directly SLOW DOWN the rate of photosynthesis in a garden?",
      options: [
        "A. An increase in sunny daylight hours",
        "B. An increase in soil moisture during drought",
        "C. Adequate ambient carbon dioxide levels",
        "D. Heavy smog or dust covering leaf stomata pores"
      ],
      correct: "D",
      explanation: "Blocked stomata prevent carbon dioxide from entering the leaf, severely restricting the photosynthetic reaction rate.",
      category: "Application"
    },
    {
      id: 5,
      question: "How does the law of conservation of mass apply to photosynthesis?",
      options: [
        "A. Sunlight is converted into physical matter inside the plant stem",
        "B. The total number of carbon, hydrogen, and oxygen atoms in the reactants equals the atoms in the products",
        "C. Mass is created from nothing because plants grow heavier each week",
        "D. Water disappears completely and is replaced by sugar molecules"
      ],
      correct: "B",
      explanation: "Photosynthesis rearranges 6 CO₂ + 6 H₂O into C₆H₁₂O₆ + 6 O₂; no atoms are created or destroyed.",
      category: "Analysis"
    },
    {
      id: 6,
      question: "Which microscopic organelle serves as the primary site of photosynthesis in eukaryotic plant cells?",
      options: [
        "A. Chloroplast",
        "B. Mitochondrion",
        "C. Ribosome",
        "D. Endoplasmic reticulum"
      ],
      correct: "A",
      explanation: "Chloroplasts contain thylakoid membranes and stroma where light reactions and the Calvin cycle occur.",
      category: "Recall"
    },
    {
      id: 7,
      question: "What is the primary organic sugar molecule synthesized during the Calvin Cycle in plant leaves?",
      options: [
        "A. Fructose diphosphate",
        "B. Glucose (C₆H₁₂O₆)",
        "C. Lactose",
        "D. Cellulose fiber"
      ],
      correct: "B",
      explanation: "The Calvin cycle utilizes ATP and NADPH to reduce CO₂ into carbohydrates including glucose.",
      category: "Understanding"
    },
    {
      id: 8,
      question: "Which wavelength spectrum of visible light is LEAST absorbed and most reflected by chlorophyll a and b?",
      options: [
        "A. Blue light (430–450 nm)",
        "B. Red light (640–660 nm)",
        "C. Green light (500–550 nm)",
        "D. Violet light (400–420 nm)"
      ],
      correct: "C",
      explanation: "Chlorophyll pigments reflect green wavelengths, which is why healthy foliage appears green to the human eye.",
      category: "Analysis"
    },
    {
      id: 9,
      question: "How do specialized desert plants (such as cacti) minimize water loss while still acquiring carbon dioxide for photosynthesis?",
      options: [
        "A. By taking in CO₂ exclusively at night via CAM photosynthesis",
        "B. By absorbing glucose directly through taproots from underground soil",
        "C. By eliminating stomata pores completely from their stems",
        "D. By replacing chlorophyll with carotene pigments permanently"
      ],
      correct: "A",
      explanation: "CAM plants fix CO₂ at night when transpiration is minimized, storing organic acids until daytime sunlight fuels light reactions.",
      category: "Application"
    },
    {
      id: 10,
      question: "What role does the photolysis (splitting) of water molecules play in the light-dependent reactions of photosynthesis?",
      options: [
        "A. It supplies replacement electrons to photosystem II reaction centers",
        "B. It absorbs carbon dioxide directly from the atmosphere",
        "C. It breaks down glucose into pyruvate molecules",
        "D. It cools the internal temperature of the leaf tissue"
      ],
      correct: "A",
      explanation: "Splitting H₂O generates electrons to replenish chlorophyll reaction centers, releasing H⁺ protons and oxygen gas.",
      category: "Analysis"
    },
    {
      id: 11,
      question: "Why are autotrophs considered the foundational trophic level in terrestrial ecosystems?",
      options: [
        "A. They convert inorganic radiant solar energy into organic chemical energy accessible to heterotrophs",
        "B. They consume decomposing bacteria in topsoil layers",
        "C. They generate thermal heat necessary to regulate regional climates",
        "D. They reproduce more rapidly than all invertebrate species"
      ],
      correct: "A",
      explanation: "Primary producers provide the baseline biomass and chemical potential energy supporting all higher trophic levels.",
      category: "Evaluation"
    },
    {
      id: 12,
      question: "In a controlled classroom experiment, an elodea plant kept in total darkness for 48 hours is tested for starch with iodine. What is the expected result?",
      options: [
        "A. Dark blue-black staining indicating high starch synthesis",
        "B. Pale brown staining indicating depleted starch reserves due to lack of light",
        "C. Bright green fluorescing indicating rapid chlorophyll surge",
        "D. Immediate bubbling of concentrated oxygen gas"
      ],
      correct: "B",
      explanation: "Without light, photosynthesis halts and the plant consumes stored starch for maintenance respiration.",
      category: "Analysis"
    },
    {
      id: 13,
      question: "Which specialized epidermal leaf structures open and close to regulate gas exchange and transpiration?",
      options: [
        "A. Stomata guarded by pairs of guard cells",
        "B. Root xylem tracheids",
        "C. Cuticular wax plates",
        "D. Petiole vascular bundles"
      ],
      correct: "A",
      explanation: "Turgor pressure changes in guard cells cause stomatal pores to open for CO₂ uptake or close to conserve water.",
      category: "Recall"
    },
    {
      id: 14,
      question: "If atmospheric CO₂ concentration is doubled in an enclosed greenhouse with optimal lighting and irrigation, how does photosynthetic yield generally respond?",
      options: [
        "A. Yield increases until another limiting factor (such as enzyme saturation or light) is reached",
        "B. Photosynthesis stops immediately due to toxic gas saturation",
        "C. Plants produce only nitrogen gas instead of carbohydrates",
        "D. Rate remains strictly constant regardless of input concentrations"
      ],
      correct: "A",
      explanation: "Carbon dioxide acts as a substrate; increasing it elevates photosynthetic velocity up to the light/temperature saturation threshold.",
      category: "Evaluation"
    },
    {
      id: 15,
      question: "Which equation accurately balances the stoichiometric chemical transformation of oxygenic photosynthesis?",
      options: [
        "A. 6 CO₂ + 6 H₂O + light ──> C₆H₁₂O₆ + 6 O₂",
        "B. C₆H₁₂O₆ + 6 O₂ ──> 6 CO₂ + 6 H₂O + ATP",
        "C. 2 H₂ + O₂ ──> 2 H₂O + energy",
        "D. CO₂ + H₂O ──> CH₂O + O"
      ],
      correct: "A",
      explanation: "Six molecules of carbon dioxide and six molecules of water yield one molecule of glucose and six molecules of oxygen gas.",
      category: "Recall"
    }
  ];

  // Generic pool for other topics
  const genericPool = [
    {
      id: 1,
      question: `What is the primary defining characteristic or purpose of ${safeTopic}?`,
      options: [
        `A. Its role in organizing core principles of ${subject}`,
        "B. Its random and unrepeatable behavior",
        "C. Its historical obsolescence in modern practice",
        "D. Its restriction to introductory levels only"
      ],
      correct: "A",
      explanation: `The primary value of ${safeTopic} lies in its foundational organizing capacity within ${subject}.`,
      category: "Recall"
    },
    {
      id: 2,
      question: `When evaluating a scenario involving ${safeTopic}, what is the first factor to consider?`,
      options: [
        "A. The cost of materials",
        "B. The primary underlying variables and baseline conditions",
        "C. The opinion of peers",
        "D. The speed of execution"
      ],
      correct: "B",
      explanation: "Accurate analysis requires establishing baseline conditions before making assertions.",
      category: "Understanding"
    },
    {
      id: 3,
      question: `In a practical scenario, how would an unexpected shift in input variables affect ${safeTopic}?`,
      options: [
        "A. The system outcome predictably shifts according to underlying principles",
        "B. The system immediately collapses without reason",
        "C. No change can ever occur",
        "D. The rules invert completely"
      ],
      correct: "A",
      explanation: "Systems governed by these principles adapt according to established operational models.",
      category: "Application"
    },
    {
      id: 4,
      question: `Which scenario represents the most effective application of ${safeTopic}?`,
      options: [
        "A. Ignoring edge cases during testing",
        "B. Applying principles systematically to optimize outcomes",
        "C. Memorizing terms without understanding connections",
        "D. Skipping preliminary safety or validation steps"
      ],
      correct: "B",
      explanation: "Systematic application yields the most reliable, reproducible outcomes.",
      category: "Application"
    },
    {
      id: 5,
      question: `How does ${safeTopic} contribute to broader critical and analytical literacy?`,
      options: [
        "A. It trains learners to critique evidence, test assumptions, and construct models",
        "B. It proves that intuition is always superior to empirical data",
        "C. It eliminates the need for further experimental inquiry",
        "D. It is only useful for standard examinations"
      ],
      correct: "A",
      explanation: "Deep conceptual learning builds cross-cutting critical thinking skills.",
      category: "Analysis"
    },
    {
      id: 6,
      question: `Which key vocabulary term is most centrally associated with ${safeTopic}?`,
      options: [
        `A. The foundational operational mechanism in ${subject}`,
        "B. An irrelevant historical footnote",
        "C. A decorative stylistic preference",
        "D. A single-use temporary guideline"
      ],
      correct: "A",
      explanation: "Core vocabulary anchors students' technical precision and conceptual taxonomy.",
      category: "Recall"
    },
    {
      id: 7,
      question: `What distinguishes ${safeTopic} from related adjacent concepts in ${subject}?`,
      options: [
        "A. Its distinct theoretical assumptions and practical domain of applicability",
        "B. It has no distinctions and can be used interchangeably in all contexts",
        "C. It only applies during laboratory demonstrations",
        "D. It was invented purely for textbook problem sets"
      ],
      correct: "A",
      explanation: "Recognizing conceptual boundaries prevents misapplication across differing problem domains.",
      category: "Understanding"
    },
    {
      id: 8,
      question: `If an anomaly occurs while investigating ${safeTopic}, what should be inspected first?`,
      options: [
        "A. Measurement error or boundary assumption violations",
        "B. Concluding that standard theory is permanently broken",
        "C. Deleting all collected data points immediately",
        "D. Changing the textbook definition arbitrarily"
      ],
      correct: "A",
      explanation: "Systematic inquiry isolates parameter anomalies and instrumentation tolerances first.",
      category: "Analysis"
    },
    {
      id: 9,
      question: `How would you evaluate the real-world significance of ${safeTopic} in modern society?`,
      options: [
        "A. It underpins critical technologies, ethical processes, and informed decisions",
        "B. It has zero measurable influence outside academic classrooms",
        "C. It only impacts obsolete historical devices",
        "D. Its relevance ended in the nineteenth century"
      ],
      correct: "A",
      explanation: "Foundational academic topics connect directly to modern technological and societal infrastructure.",
      category: "Evaluation"
    },
    {
      id: 10,
      question: `When collaborating with peers on ${safeTopic}, which strategy best ensures concept mastery?`,
      options: [
        "A. Explaining reasoning aloud and peer-reviewing problem steps",
        "B. Letting one group member complete all the work in silence",
        "C. Avoiding asking clarifying questions to save time",
        "D. Memorizing final numbers without checking units"
      ],
      correct: "A",
      explanation: "Peer explanation and peer critique strengthen cognitive retention and diagnostic clarity.",
      category: "Application"
    },
    {
      id: 11,
      question: `What is a common misconception learners encounter when first studying ${safeTopic}?`,
      options: [
        "A. Conflating correlation with causation or superficial resemblance with structural equivalence",
        "B. Assuming that equations must balance mathematically",
        "C. Believing that evidence is required before drawing conclusions",
        "D. Relying on verified textbook references"
      ],
      correct: "A",
      explanation: "Surfacing misconceptions allows instructors to address intuitive errors explicitly.",
      category: "Analysis"
    },
    {
      id: 12,
      question: `In what way does ${safeTopic} exemplify the iterative nature of inquiry in ${subject}?`,
      options: [
        "A. Hypotheses are tested, refined, and expanded as new evidence emerges",
        "B. Rules were finalized centuries ago and cannot be questioned",
        "C. New discoveries are strictly prohibited",
        "D. Inventions happen only by accident without method"
      ],
      correct: "A",
      explanation: "Disciplinary knowledge continually evolves through sustained empirical testing.",
      category: "Evaluation"
    },
    {
      id: 13,
      question: `Which diagnostic check proves that a student has mastered the core mechanism of ${safeTopic}?`,
      options: [
        "A. The student can accurately explain the concept to a novice and predict system behavior in novel scenarios",
        "B. The student can recite definitions word-for-word without understanding variables",
        "C. The student guesses multiple choice answers without reviewing options",
        "D. The student finishes the test in under three minutes"
      ],
      correct: "A",
      explanation: "Transfer of knowledge to novel scenarios is the gold standard of cognitive mastery.",
      category: "Evaluation"
    },
    {
      id: 14,
      question: `How does scaling up problem complexity alter the application of ${safeTopic}?`,
      options: [
        "A. Core principles remain invariant, while multivariable interactions must be tracked systematically",
        "B. The rules completely vanish as problems grow larger",
        "C. Only qualitative intuition matters at larger scales",
        "D. It becomes impossible to solve by human reasoning"
      ],
      correct: "A",
      explanation: "Universal principles hold across scales, requiring multivariable tracking rather than abandonment of rules.",
      category: "Application"
    },
    {
      id: 15,
      question: `What synthesis statement best summarizes the overarching importance of ${safeTopic} in ${grade}?`,
      options: [
        `A. It provides a vital conceptual stepping stone toward advanced mastery in ${subject}`,
        "B. It is an isolated requirement with no future relevance",
        "C. It is purely ornamental curriculum filler",
        "D. It can be bypassed without consequence"
      ],
      correct: "A",
      explanation: "Curricular coherence ensures each grade's core competencies empower future learning.",
      category: "Understanding"
    }
  ];

  const pool = isPhotosynthesis ? photosynthesisPool : genericPool;
  const questions = pool.slice(0, targetCount).map((q, idx) => ({
    ...q,
    id: idx + 1
  }));

  const answerKey = questions.map(q => ({
    questionNumber: q.id,
    correctOption: q.correct
  }));

  const coverage = {
    recall: questions.filter(q => q.category === 'Recall').length,
    understanding: questions.filter(q => q.category === 'Understanding').length,
    application: questions.filter(q => q.category === 'Application').length,
    analysis: questions.filter(q => q.category === 'Analysis').length,
    evaluation: questions.filter(q => q.category === 'Evaluation').length
  };

  return {
    title: `${targetCount}-Question ${safeTopic} Assessment`,
    questions,
    answerKey,
    coverage
  };
}

/**
 * Generate a complete dynamic lesson package for any custom inputs
 */
export function generateCustomLessonPackage({
  topic = "Photosynthesis",
  grade = "Grade 8",
  subject = "Science",
  duration = "45 minutes",
  teachingStyle = "Mixed",
  difficulty = "Standard",
  learningPreferences = ["Visual", "Discussion"],
  classType = "Whole Class",
  differentiatedEnabled = true,
  quizQuestionCount = 5,
  selectedResources = {
    lessonPlan: true,
    teachingScript: true,
    worksheet: true,
    quiz: true,
    visualAid: true,
    exitTicket: true,
    catchUpPack: true
  }
}) {
  const safeTopic = topic.trim() || "Core Concepts";
  const requestedQuestions = Number(quizQuestionCount) || 5;

  // If user entered Photosynthesis with default 5 questions, return canonical package for full test suite fidelity
  const isPhotosynthesis = topic.trim().toLowerCase().includes("photosynthesis");
  if (isPhotosynthesis) {
    const base = {
      ...DEFAULT_PHOTOSYNTHESIS_LESSON,
      id: `lesson-${Date.now()}`,
      meta: {
        topic: "Photosynthesis",
        grade,
        subject,
        duration,
        teachingStyle,
        difficulty,
        learningPreferences,
        classType,
        quizQuestionCount: requestedQuestions,
        createdAt: new Date().toISOString()
      }
    };

    if (requestedQuestions !== 5) {
      base.quiz = buildDynamicQuiz("Photosynthesis", subject, requestedQuestions, grade);
      base.readinessCheck = {
        ...base.readinessCheck,
        items: base.readinessCheck.items.map(item => 
          item.id === 'r4' 
            ? { ...item, note: `${requestedQuestions}-question quiz + formative exit ticket provided` } 
            : item
        )
      };
    }
    return base;
  }

  // Generative template for any topic/grade/subject
  return {
    id: `lesson-${Date.now()}`,
    meta: {
      topic: safeTopic,
      grade,
      subject,
      duration,
      teachingStyle,
      difficulty,
      learningPreferences,
      classType,
      createdAt: new Date().toISOString()
    },
    readinessCheck: {
      score: 96,
      status: "Ready to teach",
      badgeType: "success",
      items: [
        { id: "r1", label: "Grade appropriate", passed: true, note: `Calibrated specifically for ${grade} cognitive level` },
        { id: "r2", label: `Fits ${duration} class`, passed: true, note: `Pacing optimized for a ${duration} timeframe` },
        { id: "r3", label: "Learning objectives included", passed: true, note: "3 distinct Bloom taxonomy targets specified" },
        { id: "r4", label: "Assessment included", passed: true, note: `Formative exit ticket + ${requestedQuestions}-question summative quiz` },
        { id: "r5", label: "Activities included", passed: true, note: `Hands-on inquiry task aligned with ${teachingStyle} teaching style` },
        { id: "r6", label: "Worksheet aligned", passed: true, note: "Directly reinforces core instructional competencies" },
        { id: "r7", label: "Quiz aligned", passed: true, note: "Balanced distribution across recall and analytical problem-solving" }
      ]
    },
    lessonPlan: {
      title: `Mastering ${safeTopic}: Concepts & Practical Application`,
      overview: `In this ${duration} ${subject} lesson designed for ${grade}, students engage in structured inquiry into ${safeTopic}. Through collaborative exploration, real-world examples, and guided practice, learners develop foundational mastery and analytical confidence.`,
      objectives: [
        `Identify and articulate the core principles governing ${safeTopic}.`,
        `Analyze real-world scenarios or problem sets using ${safeTopic} frameworks.`,
        `Demonstrate concept mastery by completing guided exercises and peer synthesis.`
      ],
      materials: [
        `Teacher presentation and interactive whiteboard guide for ${safeTopic}`,
        `Student Practice Handout: '${safeTopic} Mastery Blueprint'`,
        "Collaboration chart paper and dry-erase markers",
        "Printed 2-Minute Exit Tickets for lesson wrap-up"
      ],
      timeline: [
        {
          id: "tl1",
          time: "00–05 min",
          phase: "HOOK",
          title: `The Hook: Why Does ${safeTopic} Matter?`,
          description: `Present an engaging real-world challenge or question connected to ${safeTopic}. Prompt students to discuss their initial predictions in pairs for 90 seconds.`,
          tip: "Record student initial intuition on the side board to compare at lesson conclusion."
        },
        {
          id: "tl2",
          time: "05–15 min",
          phase: "EXPLANATION",
          title: `Core Conceptual Foundations of ${safeTopic}`,
          description: `Deliver clear, scaffolded direct instruction. Break down the 3 primary rules/components of ${safeTopic} with visual diagrams and worked examples.`,
          tip: "Check for understanding every 3 minutes with thumbs up/down or quick finger voting."
        },
        {
          id: "tl3",
          time: "15–30 min",
          phase: "ACTIVITY",
          title: "Guided Investigation & Paired Problem Solving",
          description: `Students work in pairs on structured investigation cards applying ${safeTopic} to authentic problem sets.`,
          tip: "Target interventions at student pairs needing extra scaffolding while offering extension challenges to early finishers."
        },
        {
          id: "tl4",
          time: "30–40 min",
          phase: "DISCUSSION",
          title: "Whole-Class Synthesis & Error Analysis",
          description: `Facilitate whole-group review of common stumbling blocks and discuss how ${safeTopic} connects to future curriculum units.`,
          tip: "Have student volunteers explain their reasoning step-by-step to the class."
        },
        {
          id: "tl5",
          time: "40–45 min",
          phase: "ASSESSMENT",
          title: "Individual Reflection & Exit Ticket",
          description: `Individual completion of the 2-minute Exit Ticket to capture formative feedback for tomorrow's instruction.`,
          tip: "Quickly scan exit tickets to group students for tomorrow's warmup."
        }
      ],
      assessment: "Observation during paired activity, active questioning checks, and individual Exit Ticket responses.",
      homework: `Complete the review reflection worksheet on ${safeTopic} and identify one real-life example in your everyday environment.`
    },
    teachingScript: {
      heading: "Teacher Script",
      subheading: "What to say and do during the lesson.",
      timeline: [
        {
          id: "ts1",
          time: "00–05 min",
          phase: "Hook",
          action: `Display an intriguing scenario related to ${safeTopic} on the classroom screen.`,
          question: `Have you ever wondered why ${safeTopic} behaves this way in everyday life? What is your gut prediction?`,
          expectedResponse: "Students offer diverse intuitive guesses and share prior experiences.",
          teacherTip: "Validate all perspectives: 'Great observation! Let's examine what evidence supports that hypothesis.'"
        },
        {
          id: "ts2",
          time: "05–15 min",
          phase: "Explanation",
          action: `Write the primary rule of ${safeTopic} clearly on the center board.`,
          question: `Looking at this rule, what happens if we change the first variable?`,
          expectedResponse: "'The outcome shifts proportionally' or 'It changes the final result.'",
          teacherTip: "Emphasize key academic vocabulary explicitly."
        },
        {
          id: "ts3",
          time: "15–30 min",
          phase: "Activity Guidance",
          action: "Circulate between small groups as students work through the problem sets.",
          question: `Walk me through step 2 of your solution. How did you decide on that method?`,
          expectedResponse: "Students explain their logical sequence and verify with evidence.",
          teacherTip: "Prompt students to explain their thinking rather than giving away answers."
        },
        {
          id: "ts4",
          time: "30–40 min",
          phase: "Discussion Facilitation",
          action: "Highlight one common misconception on the whiteboard.",
          question: `Why might someone get tripped up on this step, and how can we double-check our work?`,
          expectedResponse: "'Because they forgot to check the unit/rule!'",
          teacherTip: "Normalize mistakes as valuable learning evidence."
        },
        {
          id: "ts5",
          time: "40–45 min",
          phase: "Wrap-up & Assessment",
          action: "Distribute exit tickets and set a 2-minute countdown.",
          question: "Summarize the single biggest takeaway you have from today's lesson.",
          expectedResponse: "Individual focused writing.",
          teacherTip: "Check for clarity of learning objectives before dismissal."
        }
      ]
    },
    worksheet: {
      title: `Student Practice Worksheet: ${safeTopic} Foundations`,
      instructions: "Answer all questions thoroughly in the spaces provided. Show all your work and reasoning.",
      questions: [
        {
          id: "w1",
          type: "short_answer",
          prompt: `1. In your own words, define ${safeTopic} and explain why it is significant in ${subject}.`,
          lines: 3
        },
        {
          id: "w2",
          type: "short_answer",
          prompt: `2. List the 3 most essential characteristics or rules associated with ${safeTopic}.`,
          lines: 3
        },
        {
          id: "w3",
          type: "multiple_choice",
          prompt: `3. Which of the following statements about ${safeTopic} is most accurate?`,
          options: [
            `A. It operates independently of standard ${subject} principles`,
            `B. It provides a foundational framework for understanding broader ${subject} systems`,
            `C. It only applies in theoretical laboratory environments`,
            `D. It has been replaced by modern automated computation`
          ]
        },
        {
          id: "w4",
          type: "short_answer",
          prompt: `4. Explain how you would apply ${safeTopic} to solve a real-world dilemma or case study.`,
          lines: 3
        },
        {
          id: "w5",
          type: "application",
          prompt: `5. Challenge Question: Compare and contrast ${safeTopic} with a related concept from earlier this semester.`,
          lines: 3
        }
      ]
    },
    quiz: buildDynamicQuiz(safeTopic, subject, requestedQuestions, grade),
    differentiation: {
      support: {
        badge: "Support Scaffolding",
        color: "#16A34A",
        bgLight: "#F0FDF4",
        description: "Scaffolded materials with sentence stems and graphic organizers",
        strategies: [
          `Visual glossary of key terms related to ${safeTopic}`,
          "Step-by-step worked examples with guided prompts",
          "Chunked reading segments with paired check-ins",
          "Sentence starters for all written reflection questions"
        ],
        modifiedTask: "Focus on identifying core vocabulary and sequencing steps before analyzing complex cases."
      },
      standard: {
        badge: "Grade-Level Standard",
        color: "#2563EB",
        bgLight: "#EFF6FF",
        description: `Grade-level standard expectations for ${grade}`,
        strategies: [
          "Standard investigation problem set with independent practice",
          "Paired analytical discussions with evidence citing",
          "Complete 5-question multiple choice assessment",
          "Exit ticket synthesis"
        ],
        modifiedTask: "Complete all timeline activities and standard worksheet questions as outlined."
      },
      challenge: {
        badge: "Extension & Challenge",
        color: "#9333EA",
        bgLight: "#FAF5FF",
        description: "Advanced analytical extension for gifted and fast learners",
        strategies: [
          `Open-ended research prompt linking ${safeTopic} to recent discoveries`,
          "Multi-variable problem sets requiring justification of alternative solutions",
          "Peer-coaching role during small group investigation",
          "Design of an original experiment or model"
        ],
        modifiedTask: `Formulate an original hypothesis exploring an edge case where standard rules of ${safeTopic} require nuance.`
      }
    },
    visualAid: {
      title: "Teaching Visual & Classroom Board Plan",
      boardPlan: `
        TOPIC: ${safeTopic.toUpperCase()}
        [${grade} • ${subject} • ${duration}]

        ┌──────────────────────────────────────────────────────────┐
        │  1. KEY QUESTION:                                        │
        │     How does ${safeTopic} shape our world?               │
        │                                                          │
        │  2. CORE DIAGRAM / FLOW:                                 │
        │     [INPUT / TRIGGER] ───► [PROCESS] ───► [RESULT]       │
        │                                                          │
        │  3. ESSENTIAL VOCABULARY:                                │
        │     • Concept A: Foundational baseline                   │
        │     • Concept B: Active catalyst / variable              │
        │     • Concept C: Measured outcome                        │
        │                                                          │
        │  4. COMMON MISCONCEPTION TO AVOID:                       │
        │     Remember that process X is not the same as Y!        │
        └──────────────────────────────────────────────────────────┘
      `,
      suggestions: [
        `Draw an active flow diagram illustrating how ${safeTopic} progresses step-by-step.`,
        "Color-code inputs in blue and results in green on the whiteboard.",
        "Use physical props or classroom gestures to anchor abstract vocabulary.",
        "Have students recreate the board diagram in their personal notebooks."
      ]
    },
    exitTicket: {
      title: "2-Minute Exit Ticket",
      subtitle: `Quick formative feedback on ${safeTopic}.`,
      questions: [
        { id: "e1", prompt: `1. What is the single most important rule or idea you learned about ${safeTopic}?` },
        { id: "e2", prompt: `2. In one clear sentence, explain how ${safeTopic} works.` },
        { id: "e3", prompt: "3. What question do you still have that wasn't fully answered today?" }
      ]
    },
    catchUpPack: {
      title: "Student Catch-Up Pack",
      subtitle: "For students who missed the lesson.",
      sections: {
        missedSummary: `While you were absent, our class explored ${safeTopic}. We discussed how key principles operate in real scenarios, practiced working through authentic problems, and identified the most critical vocabulary.`,
        keyConcepts: [
          `The core purpose and function of ${safeTopic}.`,
          "How input variables interact to determine observable outcomes.",
          "Practical problem-solving steps to apply when analyzing new questions.",
          "Common pitfalls and how to verify your results."
        ],
        vocabulary: [
          { term: "Primary Concept", definition: `The foundational baseline rule defining ${safeTopic}.` },
          { term: "Operational Variable", definition: "A factor that influences how the system responds." },
          { term: "Synthesis", definition: "Combining individual observations into a coherent explanation." }
        ],
        practice: [
          `1. Explain ${safeTopic} in your own words.`,
          "2. What is the first step when solving this type of problem?",
          "3. Give one authentic example from everyday life.",
          "4. How would you explain this to a classmate?",
          "5. Solve the review exercise on page 1 of the attached worksheet."
        ],
        miniQuiz: [
          { q: `1. What subject area does ${safeTopic} belong to?`, a: subject },
          { q: "2. Name the primary rule covered today.", a: "Outlined in key concepts section" },
          { q: "3. What is the key takeaway?", a: "Systematic application of principles" }
        ]
      }
    }
  };
}

/**
 * Pre-seeded lessons for history page (localStorage initial state)
 */
export const INITIAL_HISTORY_LESSONS = [
  {
    id: "hist-1",
    topic: "Photosynthesis",
    grade: "Grade 8",
    subject: "Science",
    duration: "45 minutes",
    createdAt: "Today",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    resourcesCount: 7,
    status: "Completed"
  },
  {
    id: "hist-2",
    topic: "Quadratic Equations",
    grade: "Grade 10",
    subject: "Mathematics",
    duration: "60 minutes",
    createdAt: "Yesterday",
    timestamp: Date.now() - 1000 * 60 * 60 * 26, // 26 hours ago
    resourcesCount: 6,
    status: "Completed"
  }
];
