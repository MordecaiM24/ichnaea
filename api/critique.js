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
  console.log("API_KEY: ");
  console.log(process.env.ANTHROPIC_API_KEY);
  const essay = req.body.essay;
  const prompt = req.body.prompt;
  console.log("REQUEST: ");
  console.log(req);
  console.log("REQUEST BODY: ");
  console.log(req.body);
  console.log("ESSAY: ");
  console.log(req.body.essay);

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    temperature: 0.7,
    system:
      'Criticize the following college application essay, given the essay and its prompt. Return your response in the second person, as if you\'re talking directly to the writer. Think about this from the perspective of an admissions officer, pointing out any parts of the essay that are cookie-cutter, unoriginal, overused, or anything else. Try not to be firm without being mean, and provide specific suggestions on how to improve, with examples, like saying "Even though this part of the essay is unoriginal, it can be improved by detailing how experience X or Y impacted you specifically".  Return the critique as a string of issues, in the following format: { "critiques": "1. (First issue here) \\n\\n2. (Second issue here) \\n\\n3. Third issue here)" }. DO NOT PUT ANY NEWLINES IN THE CRITIQUE. ESCAPE ANY NECESSARY NEWLINES WITH THE BACKSLASH N OPERATOR. I REPEAT, DO NOT PUT ANY NEWLINES IN THE JSON WITH THE ESSAY. KEEP EVERY SINGLE THING ON ONE LINE.',
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `<CollegeEssay>${essay}</CollegeEssay>\n<Prompt>${prompt}</Prompt>`,
          },
        ],
      },
    ],
  });

  console.log("Response:");
  console.log(msg);

  console.log("Response trimmed to just text:");
  let textResponse = msg.content[0].text;

  if (msg.stop_reason === "max_tokens") {
    console.log("Response too long");
    textResponse = textResponse.concat("", '" }');
  }
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
