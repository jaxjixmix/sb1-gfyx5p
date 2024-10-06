import React, { useState, useEffect } from 'react'
import { Shuffle } from 'lucide-react'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      setMoves(moves + 1)
      if (cards[flippedCards[0]].emoji === newCards[id].emoji) {
        newCards[flippedCards[0]].isMatched = true
        newCards[id].isMatched = true
        setCards(newCards)
        setFlippedCards([])
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false
          newCards[id].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Memory Pair Game</h1>
      <div className="mb-4">
        <span className="mr-4">Moves: {moves}</span>
        <button
          onClick={initializeGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Shuffle className="mr-2" />
          Restart
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-20 h-20 flex items-center justify-center text-4xl cursor-pointer rounded-lg transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-white'
                : 'bg-blue-500 text-blue-500'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App