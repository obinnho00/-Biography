from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Allow requests from React or anywhere
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

# Helper to load any JSON file
def load_json(file_name):
    file_path = os.path.join(DATA_DIR, file_name)
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return {"error": f"File not found: {file_name}"}
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in file {file_path}: {e}")
        return {"error": f"Invalid JSON format in {file_name}"}

# Routes loading JSON "database"
@app.get("/introduction")
def get_introduction():
    return load_json("introduction.json")

@app.get("/research")
def get_research():
    return load_json("research.json")

@app.get("/tutorial")
def get_tutorial():
    return load_json("tutorials.json")

@app.get("/personal_work")
def get_personal_work():
    return load_json("personal_work.json")

@app.get("/work")
def get_work():
    return load_json("work.json")

@app.get("/about_me")
def get_about_me():
    return load_json("about_me.json")
