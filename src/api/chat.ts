export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  const SYSTEM_PROMPT = `
Inti agent STEG 🇹🇳
A7ki b derja tounsia, jomel 9sira.
Friendly w normal.

Ken ma ta3refch:
"Samahni, ma 3andi fekra. Ittasel b 1100"
`;

  const prompt = `
<|system|>
${SYSTEM_PROMPT}

<|user|>
${message}

<|assistant|>
`;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/linagora/Labess-7b-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    if (response.status === 503) {
      return res.json({ reply: 'System y7adder... ⏳' });
    }

    const data = await response.json();

    let text =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      '';

    text = text.replace(/<\|.*?\|>/g, '').trim();

    return res.json({
      reply: text || 'Mafhemtch 🤔 tnajem t3awed?',
    });

  } catch {
    return res.json({
      reply: 'Erreur 😅 jarreb ba3d chweya',
    });
  }
}