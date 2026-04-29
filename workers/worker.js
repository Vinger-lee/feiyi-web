export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'only POST allowed' }), {
        status: 405,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      });
    }

    const cozeURL = 'https://2qd6fybz9z.coze.site/stream_run';

    try {
      const body = await request.text();

      const cozeResponse = await fetch(cozeURL, {
        method: 'POST',
        headers: {
          Authorization: request.headers.get('Authorization') || '',
          'Content-Type': 'application/json',
        },
        body,
      });

      // Buffer entire response to avoid streaming issues
      const responseText = await cozeResponse.text();

      const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Content-Type': 'text/plain; charset=utf-8',
      });

      return new Response(responseText, {
        status: cozeResponse.status,
        statusText: cozeResponse.statusText,
        headers,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }
  },
};
