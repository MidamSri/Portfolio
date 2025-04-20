// src/components/Game.tsx
import React from "react";
import FlappyFingerBird from "./FlappyFingerBird";

const Game = () => {
  return (
    <section id="game" className="section bg-gray-100 py-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Flappy Finger Bird!</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto mb-10">
          Control the bird using your index finger in real-time. Move your hand up and down in front of your webcam to play.
        </p>
        <div className="flex justify-center">
          <FlappyFingerBird />
        </div>
      </div>
    </section>
  );
};

export default Game;
