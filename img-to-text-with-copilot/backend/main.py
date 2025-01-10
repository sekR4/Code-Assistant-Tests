import logging
import os
import uuid
from typing import Any, Dict

import ollama
import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> Dict[str, str]:
    try:
        # Check if ollama is available
        ollama.list()
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")


@app.post("/image-to-text")
async def image_to_text(file: UploadFile = File(...)) -> Dict[str, Any]:
    if not file.content_type in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400, detail="Only JPEG and PNG files are allowed"
        )

    temp_filename = f"temp_{uuid.uuid4()}_{file.filename}"
    try:
        with open(temp_filename, "wb") as f:
            content = await file.read()
            if len(content) > 5 * 1024 * 1024:  # 5MB
                raise HTTPException(status_code=400, detail="File too large")
            f.write(content)

        logger.info(f"Processing image: {file.filename}")
        response = ollama.chat(
            model="llama3.2-vision",
            messages=[
                {
                    "role": "user",
                    "content": "What is in this image?",
                    "images": [temp_filename],
                }
            ],
        )

        message_obj = response.get("message", {})
        description = message_obj.get("content", "")

        if not description:
            raise HTTPException(
                status_code=500, detail="Failed to generate description"
            )

        return {"description": description}

    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)


def main():
    print("Hello from backend!")
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
