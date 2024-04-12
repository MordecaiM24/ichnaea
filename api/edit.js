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
  // const essay = req.body.essay;

  // const msg = await anthropic.messages.create({
  //   model: "claude-3-haiku-20240307",
  //   max_tokens: 1000,
  //   temperature: 0,
  //   system: `Given a college application essay, make it clearer. Do not rewrite it entirely. Just make it clearer and more readable. Take care to emulate the original text's tone, style, and meaning. Approach it like an editor — not a rewriter. Return only the revised essay within a JSON. Do so in this format: { "final_essay": final_essay_here }`,
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         {
  //           type: "text",
  //           text: `<CollegeEssay>${essay}</CollegeEssay>`,
  //         },
  //       ],
  //     },
  //   ],
  // });

  // console.log("Response:");
  // console.log(msg);

  // console.log("Response trimmed to just text:");
  // const textResponse = msg.content[0].text;
  // console.log(textResponse);

  // console.log("Response trimmed to JSON object:");
  // const jsonResponse = extractCurlyBracesSubstring(textResponse);
  // console.log(jsonResponse);

  // console.log("Response parsed by JSON:");
  // const finalResponse = JSON.parse(jsonResponse);
  // console.log(finalResponse);

  const finalResponse = {
    final_essay:
      "Ever since I was a child, I've had a deep passion for helping others. My interest in community service began when I joined the local volunteer club in my hometown. Through this club, I had the opportunity to participate in a variety of service activities, such as food drives, park cleanups, and assisting at the local senior center. These experiences taught me the profound importance of serving one's community, and I found great fulfillment in helping those in need.",
  };

  res.status(200).json(finalResponse);
  return;
}
