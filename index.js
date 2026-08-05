addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // ধাপ ১ থেকে কপি করা আপনার গিটহাবের আসল Raw আইপিটিভি লিংকটি নিচের লাইনে বসাবেন
  const githubRawUrl = 'https://raw.githubusercontent.com/techpro-iptv/techpro/refs/heads/main/techpro.m3u';

  try {
    const response = await fetch(githubRawUrl);
    
    if (!response.ok) {
      return new Response('Error: File not found or Github blocked', { status: response.status });
    }

    const playlistData = await response.text();

    // আইপিটিভি প্লেয়ার যেন ফাইলটি চিনতে পারে তার জন্য সঠিক হেডার
    return new Response(playlistData, {
      headers: {
        'Content-Type': 'application/x-mpegurl; charset=utf-8',
        'Access-Control-Allow-Origin': '*', 
        'Cache-Control': 'no-cache, no-store, must-revalidate' 
      },
    });

  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }
}
