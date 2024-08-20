# 🧟‍♂️ Zombie Escape Story Generator with VertexAI and Gemini

This project creates interactive stories using Generative AI (GenAI) - VertexAI - Gemini. In this specific example, the story revolves around escaping from zombies. The user provides answers to guide the story, making it a unique and engaging experience.

## 🚀 Quickstart Guide

Follow these steps to set up and deploy the project.

### 1. Set Up Virtual Environment

```sh
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
### 2. Authenticate with Google Cloud
```sh
gcloud auth application-default login
gcloud auth application-default set-quota-project YOUR_PROJECT
```
### 3. Deploy to Google Cloud Run
```sh
gcloud run deploy zombies-story-app --source . --region=us-central1 --platform=managed --timeout=3600 --allow-unauthenticated --session-affinity --max-instances=10
```
### 🏃‍♂️ Run Locally
To run the server locally, authenticate with Google Cloud and start the server:
    
```sh
gcloud auth application-default login
python main.py
```

### 📖 About the Project

This project leverages Generative AI to create an interactive story where the user must escape from zombies. The story evolves based on the user's answers, providing a dynamic and immersive experience.

# Key Features
- Generative AI: Uses advanced AI to generate story content.
- Interactive: User inputs guide the story's progression.
- Cloud Deployment: Easily deployable on Google Cloud Run.
# 🛠️ Technologies Used
- Python: The main programming language.
- FastAPI: For building the web server.
- Google Cloud Run: For deploying the application.
- Generative AI: For creating dynamic story content.
# 📚 Resources
Google Cloud Run Quickstart
# 👥 Contributors
Francisco Riveros
Feel free to contribute to this project by submitting issues or pull requests.

Enjoy creating your own zombie escape stories! 🧟‍♂️🏃‍♂️

