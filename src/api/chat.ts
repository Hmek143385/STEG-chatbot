export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.json()
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/linagora/Labess-7b-chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'API error' }), { status: 500 })
  }
}
