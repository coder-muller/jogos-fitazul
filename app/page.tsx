'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [showDialog, setShowDialog] = useState(false);

    const openDevDialog = () => {
        setShowDialog(true);
    };

    return (
        <div className="h-screen w-screen bg-[#FED501] flex items-start justify-center py-20">
            <div className="flex flex-col items-center justify-center">
                <Image src={'/logo.png'} alt="Postos Fitazul" width={200} height={150} className="mb-8" />
                <p className="text-2xl font-bold mb-4 text-center text-[#1D2462]">⬇️Escolha o jogo⬇️</p>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Link href="/memoria" className="w-full text-center bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 text-2xl py-2 rounded-lg">
                        Jogo da Memória
                    </Link>
                    <Link href="/forca" className="w-full text-center bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 text-2xl py-2 rounded-lg">
                        Jogo da Forca
                    </Link>
                    <div className="w-full text-center bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 text-2xl py-2 rounded-lg" onClick={openDevDialog}>
                        Onde está o combustível?
                    </div>
                </div>
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold text-[#1D2462]">Desculpe!</h2>
                            <p className="mt-2 text-center text-[#1D2462]">O jogo &quot;Onde está o combustível?&quot; ainda está em desenvolvimento, mas você pode testar outros jogos!</p>
                            <button onClick={() => setShowDialog(false)} className="mt-4 bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 py-2 rounded-lg">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}   