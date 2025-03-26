'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const images = ["🚗", "⛽", "🛠️", "🔥", "💰", "⚡"];
const shuffledCards = [...images, ...images].sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const cards = shuffledCards.map((item) => ({ value: item, flipped: false }));
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && matched.length < images.length * 2) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) setGameOver(true);
  }, [timeLeft, matched, gameStarted]);

  const handleCardClick = (index: number) => {
    if (gameOver) return;

    if (selected.length < 2 && !selected.includes(index) && !matched.includes(index)) {
      const newSelected = [...selected, index];
      setSelected(newSelected);

      if (!gameStarted) {
        setGameStarted(true);
      }

      if (newSelected.length === 2) {
        const [first, second] = newSelected;
        if (cards[first].value === cards[second].value) {
          setMatched([...matched, first, second]);
          setSelected([]);
        } else {
          setTimeout(() => setSelected([]), 1000);
        }
      }
    }
  };

  useEffect(() => {
    if (matched.length === images.length * 2 && timeLeft > 0) {
      setShowDialog(true);
    }
  }, [matched, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FED501] min-h-screen text-[#1D2462]">
      <div className="absolute top-2 left-2">
        <Link href="/" className="p-2 rounded-lg">
          Voltar
        </Link>
      </div>
      <Image src={'/logo.png'} alt="Postos Fitazul" width={200} height={150} className="mb-4" />
      <h1 className="text-3xl font-bold mb-4">Jogo da Memória</h1>
      <p className="mb-2 text-lg">Tempo restante: <span className="font-semibold">{timeLeft}s</span></p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-4 bg-[#1D2462] rounded-lg shadow-lg">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="w-20 h-20 flex items-center justify-center bg-[#FED501] text-3xl font-bold rounded-lg cursor-pointer shadow-md"
            onClick={() => handleCardClick(index)}
            animate={{ rotateY: selected.includes(index) || matched.includes(index) ? 0 : 180 }}
            initial={{ rotateY: 180 }}
          >
            {(selected.includes(index) || matched.includes(index)) ? card.value : "?"}
          </motion.div>
        ))}
      </div>
      {gameOver && <p className="mt-4 text-red-600 text-lg font-semibold">Tempo Esgotado! Tente novamente.</p>}
      {matched.length === images.length * 2 && timeLeft > 0 && (
        <>
          <p className="mt-4 text-green-600 text-lg font-semibold">Parabéns! Você ganhou um bônus! 🎉</p>
        </>
      )}
      <button className="mt-6 bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-6 py-2 text-lg font-semibold rounded-lg" onClick={() => window.location.reload()}>Reiniciar</button>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold">Parabéns! Você ganhou!</h2>
            <p className="mt-2 text-center">Você ganhou 5% de desconto na próxima compra em qualquer conveniência dos Postos Fitazul da região.</p>
            <button onClick={() => { setShowDialog(false); window.location.reload(); }} className="mt-4 bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 py-2 rounded-lg">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
