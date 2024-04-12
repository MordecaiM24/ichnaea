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
  console.log("API_KEY: ");;
  console.log(process.env.ANTHROPIC_API_KEY);;
  const essay = req.body.essay;
  console.log("REQUEST: ");
  console.log(req);
  console.log("REQUEST BODY: ");
  console.log(req.body);
  console.log("ESSAY: ");
  console.log(req.body.essay);

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    temperature: 0,
    system: `Given a college application essay, make it clearer. Do not rewrite it entirely. Just make it clearer and more readable. Take care to emulate the original text's tone, style, and meaning. Approach it like an editor — not a rewriter. Return only the revised essay within a JSON. Do so in this format: { "final_essay": final_essay_here }. DO NOT PUT ANY NEWLINES IN THE ESSAY. ESCAPE ANY NECESSARY NEWLINES WITH THE BACKSLASH N OPERATOR. I REPEAT, DO NOT PUT ANY NEWLINES IN THE JSON WITH THE ESSAY`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `<CollegeEssay>${essay}</CollegeEssay>`,
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
