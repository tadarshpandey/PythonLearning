from fastapi import FastAPI
from fastapi import Response

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from API"}


@app.get("/csv")
def csv():
    csv_content = "name, age, city\nAlice, 30, nyc\nBob, 25, la"
    return Response(content=csv_content, media_type="text/plain")