import cv2
import mediapipe as mp
import numpy as np
import random
import time

# MediaPipe hand detection
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)
mp_draw = mp.solutions.drawing_utils

# Game constants
WIDTH, HEIGHT = 640, 480
BIRD_RADIUS = 20
GRAVITY = 3
PIPE_WIDTH = 70
PIPE_GAP = 160
PIPE_SPEED = 14
FALL_VELOCITY_MULTIPLIER = 2.5

# Webcam setup
cap = cv2.VideoCapture(0)
cap.set(3, WIDTH)
cap.set(4, HEIGHT)

def reset_game():
    return {
        "bird_y": HEIGHT // 2,
        "velocity": 0,
        "pipe_x": WIDTH,
        "pipe_height": random.randint(100, 300),
        "score": 0,
        "game_over": False
    }

# Game loop
while True:
    game_state = reset_game()

    while not game_state["game_over"]:
        success, frame = cap.read()
        if not success:
            continue

        frame = cv2.flip(frame, 1)
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        h, w, _ = frame.shape
        finger_detected = False

        # Hand detection
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                index_finger = hand_landmarks.landmark[8]
                target_y = int(index_finger.y * h)
                # Smooth follow
                game_state["bird_y"] += int(0.2 * (target_y - game_state["bird_y"]))
                game_state["velocity"] = 0
                finger_detected = True

        # Gravity when no hand
        if not finger_detected:
            game_state["velocity"] += GRAVITY * FALL_VELOCITY_MULTIPLIER
            game_state["bird_y"] += int(game_state["velocity"])

        # Pipe movement
        game_state["pipe_x"] -= PIPE_SPEED
        if game_state["pipe_x"] < -PIPE_WIDTH:
            game_state["pipe_x"] = WIDTH
            game_state["pipe_height"] = random.randint(100, 300)
            game_state["score"] += 1

        # Collision detection
        bird_top = game_state["bird_y"] - BIRD_RADIUS
        bird_bottom = game_state["bird_y"] + BIRD_RADIUS
        pipe_top = game_state["pipe_height"]
        pipe_bottom = game_state["pipe_height"] + PIPE_GAP
        bird_x = 100

        if (
            bird_top <= 0 or bird_bottom >= HEIGHT or
            (game_state["pipe_x"] < bird_x + BIRD_RADIUS < game_state["pipe_x"] + PIPE_WIDTH and
             not (pipe_top < game_state["bird_y"] < pipe_bottom))
        ):
            game_state["game_over"] = True

        # Drawing game objects
        cv2.rectangle(frame, (game_state["pipe_x"], 0),
                      (game_state["pipe_x"] + PIPE_WIDTH, pipe_top), (0, 255, 0), -1)
        cv2.rectangle(frame, (game_state["pipe_x"], pipe_bottom),
                      (game_state["pipe_x"] + PIPE_WIDTH, HEIGHT), (0, 255, 0), -1)

        cv2.circle(frame, (bird_x, game_state["bird_y"]), BIRD_RADIUS, (255, 0, 0), -1)
        cv2.putText(frame, f"Score: {game_state['score']}", (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)

        cv2.imshow("Flappy Finger Bird", frame)

        key = cv2.waitKey(1)
        if key == 27:  # ESC
            cap.release()
            cv2.destroyAllWindows()
            exit()

    # Game Over screen
    cv2.putText(frame, "Game Over", (180, 200), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 4)
    cv2.putText(frame, "Press R to Restart or ESC to Quit", (50, 250),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    cv2.imshow("Flappy Finger Bird", frame)

    while True:
        key = cv2.waitKey(0)
        if key == ord('r'):
            break
        elif key == 27:
            cap.release()
            cv2.destroyAllWindows()
            exit()
