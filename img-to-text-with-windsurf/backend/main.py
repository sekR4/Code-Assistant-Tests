from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ollama
import os
from tempfile import NamedTemporaryFile

app = FastAPI()

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/describe-image")
async def describe_image(file: UploadFile):
    # Validate file type
    if not file.content_type in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Only JPEG and PNG files are allowed")
    
    try:
        # Create a temporary file to store the uploaded image
        with NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            # Write uploaded file content to temporary file
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()
            
            # Process image with Ollama
            response = ollama.chat(
                model='llama3.2-vision',
                messages=[{
                    'role': 'user',
                    'content': 'What is in this image? Provide a brief description.',
                    'images': [temp_file.name]
                }]
            )
            
            # Clean up temporary file
            os.unlink(temp_file.name)
            
            # Return the description
            return {"description": response['message']['content']}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
