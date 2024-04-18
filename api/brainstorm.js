import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function extractCurlyBracesSubstring(inputString) {
  // Match the content between the first and last curly braces
  const match = inputString.match(/{.*}/s);

  // If a match is found, return the matched substring, otherwise return null or an empty string
  return match ? match[0] : null;
}

export default async function index(req, res) {
  const { prompt } = req.body;

  const student = {
    activities: [
      {
        name: "Student Government Association",
        role: "Vice President",
        description:
          "Organized school-wide initiatives, including a sustainability week and mental health workshops, leading a team of 10 students.",
        duration: "2 years",
      },
      {
        name: "Varsity Soccer Team",
        role: "Captain",
        description:
          "Led team practices and strategies, improved team's win rate by 20%, and coordinated community soccer clinics for youth.",
        duration: "3 years",
      },
      {
        name: "Math Club",
        role: "Member",
        description:
          "Participated in regional and national math competitions, achieving top 10% placements. Also tutored underclassmen in advanced mathematics.",
        duration: "4 years",
      },
    ],
    coursework: [
      {
        name: "AP Calculus BC",
        description:
          "Covered advanced topics in calculus, including sequences, series, and multivariable calculus.",
      },
      {
        name: "AP Physics C: Mechanics",
        description:
          "Explored principles of mechanics, work, energy, and power, with an emphasis on problem-solving and laboratory work.",
      },
    ],
    projects: [
      {
        name: "Renewable Energy Science Fair Project",
        description:
          "Designed and constructed a small-scale wind turbine to explore efficient energy production, which won 2nd place at the state science fair.",
      },
      {
        name: "Mobile App for Community Service",
        description:
          "Developed a mobile application that connects volunteers with local non-profit organizations, facilitating over 1,000 hours of community service.",
      },
    ],
    firstChoiceMajor: "Mechanical Engineering",
    secondChoiceMajor: "Applied Mathematics",
    careerGoal:
      "To become an innovative mechanical engineer focused on developing sustainable energy solutions.",
    uniqueExperiences:
      "Participated in a summer internship with a local engineering firm, contributing to the design of an eco-friendly irrigation system.",
    uniqueExternalAttributes:
      "Recipient of the Community Leadership Award for outstanding service and commitment to local environmental initiatives.",
    uniqueInternalAttributes:
      "Strong problem-solving skills, creativity in approaching complex challenges, and a passion for sustainability and engineering.",
  };

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    temperature: 0.7,
    system: `Given a college essay prompt and information about a student, generate creative and tailored ideas for their essay. There will be no initial essay content, so this process starts from scratch. Respond in the second person.Ensure the brainstorming ideas are personalized to the student's experiences, interests, and academic goals. Approach this as a creative consultant, aiming to inspire and guide the student in crafting a unique and compelling narrative that aligns with the essay prompt.To do this, first, summarize to yourself the student's provided information and the essay prompt to ensure a clear understanding of the student's background and the essay's requirements. This is crucial for generating relevant and personalized ideas.To generate the most suitable and creative essay ideas for the student, you'll engage in three rounds of brainstorming and reflection. Each round should delve deeper into the student's unique attributes and how they relate to the essay prompt, refining and improving the ideas with each iteration. The final section will present the most impactful and personalized ideas for the student to consider for their essay. Be as creative and diverse as you can with the three different ideas.First, brainstorm a potential essay topic or theme based on the student's information and the prompt. Next, expand on the idea by suggesting possible narratives, examples, or experiences the student might include that align with each theme.Then, reflect on the ideas, considering it's relevance, originality, and potential impact on the essay's effectiveness.Repeat the brainstorming and reflection process two more times.After three rounds of brainstorming and reflection, select the most compelling and fitting ideas to recommend to the student for their final essay topic. Document the process in this string format, surrounded by a JSON: {"brainstorm": "Idea 1: (idea_1_here). \\nReflection: (reflection_1_here). \\n\\nIdea 2: (idea_2_here). \\nReflection: (reflection_2_here). \\n\\nIdea 3: (idea_3_here). \\nReflection: (reflection_3_here). \\n\\nRecommendation: (recommendation_here)"}. O NOT PUT ANY NEWLINES IN THE ESSAY. ESCAPE ANY NECESSARY NEWLINES WITH THE BACKSLASH N OPERATOR. I REPEAT, DO NOT PUT ANY NEWLINES IN THE JSON WITH THE ESSAY. KEEP EVERY SINGLE THING ON ONE LINE.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Given the following student:${student}, brainstorm a response to this prompt:${prompt}`,
          },
        ],
      },
    ],
  });

  console.log("Response:");
  console.log(msg);

  console.log("Response trimmed to just text:");
  const textResponse = msg.content[0].text;
  console.log(textResponse);

  console.log("Response trimmed to JSON object:");
  const jsonResponse = extractCurlyBracesSubstring(textResponse);
  console.log(jsonResponse);

  console.log("Response parsed by JSON:");
  const finalResponse = JSON.parse(jsonResponse);
  console.log(finalResponse);

  res.status(200).json(finalResponse);
  return;
}
