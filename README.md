
https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service 

python3 -m venv env
source env/bin/activate
pip install -r requirements.txt 

gcloud auth application-default login

gcloud auth application-default set-quota-project YOUR_PROJECT

gcloud run deploy zombies-story-app --source . --region=us-central1 --platform=managed --timeout=3600 --allow-unauthenticated --session-affinity --max-instances=10


## Run locally

```
gcloud auth application-default login
```
Server:
```
uvicorn main:app --reload
```
