import React, { useState, useEffect, useCallback, useRef } from 'react';

const ReflexTestGame: React.FC = () => {
  const [gameState, setGameState] = useState('initial'); // 'initial', 'ready', 'waiting', 'test', 'result'
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const resetGame = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setGameState('initial');
    setStartTime(null);
    setEndTime(null);
    setReactionTime(null);
  }, []);

  useEffect(() => {
    if (gameStateRef.current === 'waiting') {
      const randomDelay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
      timerRef.current = setTimeout(() => {
        setGameState('test');
        setStartTime(performance.now());
      }, randomDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      setReactionTime(endTime - startTime);
    }
  }, [startTime, endTime]);

  const handleClick = useCallback(() => {
    const currentState = gameStateRef.current;
    if (currentState === 'initial') {
      setGameState('ready');
      setReactionTime(null);
    } else if (currentState === 'ready') {
      setGameState('waiting');
    } else if (currentState === 'test') {
      setEndTime(performance.now());
      setGameState('result');
    } else if (currentState === 'result') {
      resetGame();
      setGameState('ready');
    }
  }, [resetGame]);

  const renderContent = () => {
    switch (gameState) {
      case 'initial':
        return 'Click anywhere to start';
      case 'ready':
        return 'Wait for green';
      case 'waiting':
        return 'Wait...';
      case 'test':
        return 'Click Now!';
      case 'result':
        return `Your reaction time: ${reactionTime?.toFixed(2)} ms. Click to try again.`;
      default:
        return '';
    }
  };

  const backgroundColor = () => {
    switch (gameState) {
      case 'ready':
        return 'bg-blue-500';
      case 'waiting':
        return 'bg-red-500';
      case 'test':
        return 'bg-green-500';
      case 'result':
        return 'bg-purple-500';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div
      className={`w-full h-96 flex items-center justify-center text-white text-2xl font-bold rounded-lg cursor-pointer transition-colors duration-200 ${backgroundColor()}`}
      onClick={handleClick}
    >
      {renderContent()}
    </div>
  );
};

export default ReflexTestGame; 