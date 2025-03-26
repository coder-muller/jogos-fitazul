'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Lista de palavras relacionadas a postos de combustíveis
const words = ["gasolina", "etanol", "diesel", "biodiesel", "combustivel", "abastecer", "posto", "tanque", "Fitazul", "filtro"];
const randomWord = words[Math.floor(Math.random() * words.length)];

export default function Forca() {
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(6);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleGuess = (letter: string) => {
        if (guessedLetters.includes(letter) || gameOver) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (!randomWord.includes(letter)) {
            setAttempts(attempts - 1);
        }

        if (randomWord.split("").every((char) => guessedLetters.includes(char) || char === letter)) {
            setWon(true);
            setGameOver(true);
            setShowDialog(true);
        }

        if (attempts <= 1) {
            setGameOver(true);
        }
    };

    const renderWord = () => {
        return randomWord.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ");
    };

    const resetGame = () => {
        setGuessedLetters([]);
        setAttempts(6);
        setGameOver(false);
        setWon(false);
        setShowDialog(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-[#FED501] min-h-screen text-[#1D2462]">
            <div className="absolute top-2 left-2">
                <Link href="/" className="p-2 rounded-lg">
                    Voltar
                </Link>
            </div>
            <Image src={'/logo.png'} alt="Postos Fitazul" width={200} height={150} className="mb-15" />
            <h1 className="text-3xl font-bold mb-4">Jogo da Forca</h1>
            <p className="text-lg mb-4">Tentativas restantes: {attempts}</p>
            <p className="text-2xl mb-4">{renderWord()}</p>
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
                {Array.from(Array(26)).map((_, index) => {
                    const letter = String.fromCharCode(97 + index); // 'a' = 97
                    const isGuessed = guessedLetters.includes(letter);
                    return (
                        <button
                            key={letter}
                            onClick={() => handleGuess(letter)}
                            disabled={isGuessed || gameOver}
                            className={`px-4 py-3 text-xl rounded-lg ${isGuessed ? 'bg-gray-400 text-gray-200' : 'bg-[#1D2462] text-[#FED501] hover:bg-[#14203F]'}`}
                        >
                            {letter.toUpperCase()}
                        </button>
                    );
                })}
            </div>
            {gameOver && (
                <div className="mt-4">
                    {won ? (
                        <p className="text-green-600 text-lg font-semibold text-center">Você ganhou! 🎉</p>
                    ) : (
                        <>
                            <p className="text-red-600 text-lg font-semibold text-center">Você perdeu! A palavra era: {randomWord} 😢</p>
                            <p className=" text-lg font-semibold text-center">Não desista, tente novamente!</p>
                        </> 
                    )}
                    <button onClick={resetGame} className="mt-4 bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 py-2 rounded-lg w-full">
                        Reiniciar Jogo
                    </button>
                </div>
            )}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold">Parabéns! Você ganhou!</h2>
                        <p className="mt-2 text-center">Você adivinhou a palavra: {randomWord} 🎉</p>
                        <p className="mt-2 text-center">Agora você pode ganhar um desconto de 5% na sua próxima compra na conveniência dos Postos Fitazul!</p>
                        <button onClick={() => { setShowDialog(false); resetGame(); }} className="mt-4 bg-[#1D2462] text-[#FED501] hover:bg-[#14203F] px-4 py-2 rounded-lg">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
