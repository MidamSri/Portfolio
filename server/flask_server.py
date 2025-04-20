from flask import Flask
import subprocess
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/launch-game')
def launch_game():
    try:
        subprocess.Popen(["python", "flappy_game.py"])
        return "Game launched", 200
    except Exception as e:
        return f"Error: {e}", 500

if __name__ == '__main__':
    app.run(port=5000)
