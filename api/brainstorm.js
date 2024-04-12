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
  const { student, prompt } = req.body;

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    temperature: 0.7,
    system:
      "Given a college essay prompt and information about a student, generate creative and tailored ideas for their essay. There will be no initial essay content, so this process starts from scratch. Respond in the second person.Ensure the brainstorming ideas are personalized to the student's experiences, interests, and academic goals. Approach this as a creative consultant, aiming to inspire and guide the student in crafting a unique and compelling narrative that aligns with the essay prompt.To do this, first, summarize to yourself the student's provided information and the essay prompt to ensure a clear understanding of the student's background and the essay's requirements. This is crucial for generating relevant and personalized ideas.To generate the most suitable and creative essay ideas for the student, you'll engage in three rounds of brainstorming and reflection. Each round should delve deeper into the student's unique attributes and how they relate to the essay prompt, refining and improving the ideas with each iteration. The final section will present the most impactful and personalized ideas for the student to consider for their essay. Be as creative and diverse as you can with the three different ideas.First, brainstorm a potential essay topic or theme based on the student's information and the prompt. Next, expand on the idea by suggesting possible narratives, examples, or experiences the student might include that align with each theme.Then, reflect on the ideas, considering it's relevance, originality, and potential impact on the essay's effectiveness.Repeat the brainstorming and reflection process two more times.After three rounds of brainstorming and reflection, select the most compelling and fitting ideas to recommend to the student for their final essay topic.Document the process in this JSON format: {'idea_1': 'idea_1_here','reflection_1': 'reflection_1_here','idea_2': 'idea_2_here','reflection_2': 'reflection_2_here','idea_3': 'idea_3_here','reflection_3': 'reflection_3_here','recommendation': 'recommendation_here',}",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Given the following student:${student}Brainstorm a response to this prompt:${prompt}`,
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
