"use client";

import { useEffect, useRef, useState } from "react";

const WIDTH = 640;
const HEIGHT = 480;
const BIRD_RADIUS = 20;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_SPEED = 5;

export default function GameWithCamera() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fingerYRef = useRef<number | null>(null);
  const fingerPositionRef = useRef<{ x: number; y: number } | null>(null);

  const [gameState, setGameState] = useState({
    birdY: HEIGHT / 2,
    pipeX: WIDTH,
    pipeHeight: Math.random() * 200 + 100,
    score: 0,
    gameOver: false,
  });

  const restartGame = () => {
    setGameState({
      birdY: HEIGHT / 2,
      pipeX: WIDTH,
      pipeHeight: Math.random() * 200 + 100,
      score: 0,
      gameOver: false,
    });
    requestAnimationFrame(loop);
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = gameState;

    if (fingerYRef.current !== null) {
      g.birdY = Math.min(Math.max(fingerYRef.current, BIRD_RADIUS), HEIGHT - BIRD_RADIUS);
    }

    g.pipeX -= PIPE_SPEED;
    if (g.pipeX < -PIPE_WIDTH) {
      g.pipeX = WIDTH;
      g.pipeHeight = Math.random() * 200 + 100;
      g.score += 1;
    }

    const birdTop = g.birdY - BIRD_RADIUS;
    const birdBottom = g.birdY + BIRD_RADIUS;
    const pipeTop = g.pipeHeight;
    const pipeBottom = g.pipeHeight + PIPE_GAP;

    if (
      birdTop <= 0 || birdBottom >= HEIGHT ||
      (g.pipeX < 100 + BIRD_RADIUS && g.pipeX + PIPE_WIDTH > 100 - BIRD_RADIUS &&
        !(g.birdY > pipeTop && g.birdY < pipeBottom))
    ) {
      g.gameOver = true;
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "green";
    ctx.fillRect(g.pipeX, 0, PIPE_WIDTH, g.pipeHeight);
    ctx.fillRect(g.pipeX, pipeBottom, PIPE_WIDTH, HEIGHT - pipeBottom);

    ctx.beginPath();
    ctx.arc(100, g.birdY, BIRD_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    if (fingerPositionRef.current) {
      const { x, y } = fingerPositionRef.current;
      ctx.beginPath();
      ctx.arc(x - 20, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${g.score}`, 10, 30);

    if (g.gameOver) {
      ctx.fillStyle = "red";
      ctx.font = "36px Arial";
      ctx.fillText("Game Over", 180, 200);
    } else {
      requestAnimationFrame(loop);
    }

    setGameState({ ...g });
  };

  useEffect(() => {
    const loadMediapipe = async () => {
      if (typeof window === "undefined") return;

      // @ts-ignore
      const hands = new window.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        if (results.multiHandLandmarks.length > 0) {
          const indexFinger = results.multiHandLandmarks[0][8];
          const x = indexFinger.x * WIDTH;
          const y = indexFinger.y * HEIGHT;
          fingerYRef.current = y;
          fingerPositionRef.current = { x, y };
        }
      });

      if (videoRef.current) {
        // @ts-ignore
        const camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: WIDTH,
          height: HEIGHT,
        });
        camera.start();
      }
    };

    loadMediapipe();
    requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") restartGame();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex gap-4">
      <div>
        <video
          ref={videoRef}
          width={WIDTH}
          height={HEIGHT}
          autoPlay
          muted
          className="rounded-xl"
        />
      </div>
      <div>
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="rounded-xl border border-black"
        />
      </div>
    </div>
  );
}