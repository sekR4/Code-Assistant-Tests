from fastapi import FastAPI, File, UploadFile, HTTPException
import ollama
import os
from tempfile import NamedTemporaryFile

app = FastAPI()

# Temporary directory to store images
TEMP_DIR = "temp_images"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.post("/describe-image/")
async def describe_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file temporarily
        temp_file_path = os.path.join(TEMP_DIR, file.filename)
        
        with open(temp_file_path, "wb") as buffer:
            buffer.write(await file.read())
            
        # Call Ollama model to describe the image
        response = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': 'What is in this image?',
                'images': [temp_file_path]
            }]
        )
        
        # Clean up temporary file
        os.remove(temp_file_path)
        
        return {"description": response['message']['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)