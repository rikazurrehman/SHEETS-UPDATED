
import React, { useEffect, useState, useRef } from 'react';
import { Gamepad, Zap, Shield, Trophy } from 'lucide-react';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'target' | 'obstacle';
  collected?: boolean;
}

const MiniGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const gameSpeed = useRef(5);
  const gameAreaSize = { width: 300, height: 250 };
  
  // Initialize game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setPlayerPosition({ x: 50, y: 50 });
    setGameObjects([]);
    gameSpeed.current = 5;
  };
  
  // End game
  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('portfolioGameHighScore', score.toString());
    }
  };
  
  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      const step = 10;
      const newPosition = { ...playerPosition };
      
      switch(e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - step);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(gameAreaSize.height - 20, newPosition.y + step);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - step);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(gameAreaSize.width - 20, newPosition.x + step);
          break;
      }
      
      setPlayerPosition(newPosition);
      checkCollisions(newPosition);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, playerPosition, gameObjects]);
  
  // Touch controls for mobile
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    
    const handleTouch = (e: TouchEvent) => {
      if (!isPlaying) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const rect = gameArea.getBoundingClientRect();
      const x = Math.min(Math.max(0, touch.clientX - rect.left), gameAreaSize.width - 20);
      const y = Math.min(Math.max(0, touch.clientY - rect.top), gameAreaSize.height - 20);
      
      setPlayerPosition({ x, y });
      checkCollisions({ x, y });
    };
    
    gameArea.addEventListener('touchmove', handleTouch);
    gameArea.addEventListener('touchstart', handleTouch);
    
    return () => {
      gameArea.removeEventListener('touchmove', handleTouch);
      gameArea.removeEventListener('touchstart', handleTouch);
    };
  }, [isPlaying, gameObjects]);
  
  // Create game objects
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      const type = Math.random() > 0.7 ? 'obstacle' : 'target';
      const x = Math.random() * (gameAreaSize.width - 20);
      const y = 0;
      
      setGameObjects(prev => [...prev, {
        id: Date.now(),
        x,
        y,
        type
      }]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  // Game timer
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);
  
  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('portfolioGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);
  
  // Game animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;
    
    // Update game objects positions
    setGameObjects(prevObjects => {
      return prevObjects
        .map(obj => ({
          ...obj,
          y: obj.y + gameSpeed.current * (deltaTime / 16)
        }))
        .filter(obj => obj.y < gameAreaSize.height && !obj.collected);
    });
    
    // Check for collisions
    checkCollisions(playerPosition);
    
    // Increase game speed over time
    gameSpeed.current = Math.min(10, 5 + (score / 100));
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // Start/stop animation loop
  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, playerPosition]);
  
  // Check for collisions between player and game objects
  const checkCollisions = (position: { x: number, y: number }) => {
    setGameObjects(prevObjects => {
      let newScore = score;
      
      const updatedObjects = prevObjects.map(obj => {
        // Skip already collected objects
        if (obj.collected) return obj;
        
        // Check for collision
        const distance = Math.sqrt(
          Math.pow(position.x + 10 - (obj.x + 10), 2) + 
          Math.pow(position.y + 10 - (obj.y + 10), 2)
        );
        
        if (distance < 20) {
          // Handle collision
          if (obj.type === 'target') {
            newScore += 10;
          } else {
            newScore = Math.max(0, newScore - 5);
          }
          
          return { ...obj, collected: true };
        }
        
        return obj;
      });
      
      if (newScore !== score) {
        setScore(newScore);
      }
      
      return updatedObjects;
    });
  };
  
  return (
    <div className="bg-gaming-darker p-4 rounded-sm border-t border-gaming-purple/20">
      <h3 className="text-lg font-orbitron mb-3 text-center">Portfolio Mini-Game</h3>
      
      <div className="text-center mb-3">
        {isPlaying ? (
          <div className="flex justify-between text-sm">
            <div>Score: <span className="text-gaming-purple">{score}</span></div>
            <div>Time: <span className="text-gaming-blue">{timeLeft}s</span></div>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <div>High Score: <span className="text-gaming-purple">{highScore}</span></div>
            <button 
              onClick={startGame}
              className="bg-gaming-purple/20 text-white border border-gaming-purple px-4 py-1 rounded-sm hover:bg-gaming-purple/30 transition-colors flex items-center justify-center gap-1"
            >
              <Gamepad size={16} />
              Play
            </button>
          </div>
        )}
      </div>
      
      <div 
        ref={gameAreaRef}
        className="relative bg-gaming-dark border border-gaming-purple/10 w-full h-[250px] overflow-hidden"
      >
        {!isPlaying && !highScore && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 text-sm">
            <Gamepad className="mb-2" />
            <p>Use arrow keys or touch to play</p>
            <p className="text-xs mt-1">Collect <Zap size={16} className="inline text-gaming-purple" /> and avoid <Shield size={16} className="inline text-gaming-blue" /></p>
          </div>
        )}
        
        {isPlaying && (
          <>
            {/* Player */}
            <div 
              className="absolute bg-gaming-purple text-white flex items-center justify-center"
              style={{ 
                left: playerPosition.x, 
                top: playerPosition.y, 
                width: 20, 
                height: 20,
                borderRadius: '50%'
              }}
            >
              <Gamepad size={12} />
            </div>
            
            {/* Game objects */}
            {gameObjects.map(obj => (
              <div 
                key={obj.id}
                className={`absolute flex items-center justify-center ${
                  obj.type === 'target' ? 'text-gaming-purple' : 'text-gaming-blue'
                }`}
                style={{ 
                  left: obj.x, 
                  top: obj.y, 
                  width: 20, 
                  height: 20,
                  opacity: obj.collected ? 0 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                {obj.type === 'target' ? <Zap size={16} /> : <Shield size={16} />}
              </div>
            ))}
          </>
        )}
        
        {!isPlaying && timeLeft === 0 && (
          <div className="absolute inset-0 bg-gaming-darker/80 flex flex-col items-center justify-center">
            <Trophy className="text-gaming-purple mb-2" />
            <p className="text-gaming-purple font-orbitron text-lg">Game Over!</p>
            <p className="mb-3">Score: {score}</p>
            <button 
              onClick={startGame}
              className="bg-gaming-purple/20 text-white border border-gaming-purple px-4 py-1 rounded-sm hover:bg-gaming-purple/30 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="text-xs text-white/40 mt-2 text-center">
        Collect <Zap size={12} className="inline text-gaming-purple" /> for points. Avoid <Shield size={12} className="inline text-gaming-blue" />.
      </div>
    </div>
  );
};

export default MiniGame;
