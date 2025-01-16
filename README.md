# Code Assistant Tests

## The Task

Build small web app that accepts an image as input through an UI and returns a description of the image. We'll tackle this task with:

-   Continue (locally hosted models),
-   Github Copilot,
-   Windsurf,
-   and Cline (locally hosted models).

<!-- TODO: Check if bold.DIY might be an interesting offline alternative for Continue -->

We'll use Brief Product Requirements (click to see) as custom instructions for the code assistant within `.continuerules`, `.github/copilot-instructions.md`, `.windsurfrules` and `.clinerules`.

<details>
<summary>Brief Product Requirements</summary>

### Project overview

A small locally running nice looking web app that accepts an image as input through an UI and returns a description of the image.
Technologies Used:

-   Next.js 15+ as framework
-   TypeScript for type safety
-   Tailwind CSS for styling
-   FastAPI as backend (calling ollama model)

### Core Functionalities

**File Upload**

-   Single file upload interface with drag-and-drop support
-   Immediate file processing upon selection
-   File type validation (png, jpg, jpeg)
-   File size validation (max 5MB)
-   Loading state indication during upload and processing
-   Error handling with user-friendly notifications

**Image to Text**

-   Automatically image gets described
-   Server-side (so here my local host) processing with temporary file storage
-   Comprehensive error handling

**Result Display**

-   Clean representation of image description
-   Formatted text display with proper whitespace handling
-   Option to copy text to clipboard with a click
-   Error state handling with user feedback

### Docs

An example of image to text with ollama.

```python
import ollama

response = ollama.chat(
    model='llama3.2-vision',
    messages=[{
        'role': 'user',
        'content': 'What is in this image?',
        'images': ['image.jpg']
    }]
)

print(response)
```

Basic folder structure

```
root/
  backend/
    main.py
    pyproject.toml
    ...
  frontend/
    package.json
    ...
```

### Implementation notes

-   Use Llama 3.2 Vison https://ollama.com/library/llama3.2-vision (`ollama pull llama3.2-vision`)
-   Install Node `brew install node` & run `npx create-next-app@latest`. Name the app `frontend`
-   Within `backend/` run `uv init` && `uv add fastapi` (don't use pip)

</details>

## Detailed Instructions for Setting Up and Running the App

### Step-by-Step Instructions for Installing Dependencies

1. **Install Node.js and npm**: If you don't have Node.js and npm installed, you can install them using Homebrew:
    ```bash
    brew install node
    ```

2. **Install Python and pip**: If you don't have Python and pip installed, you can install them using Homebrew:
    ```bash
    brew install python
    ```

3. **Install Ollama**: If you don't have Ollama installed, you can install it using pip:
    ```bash
    pip install ollama
    ```

4. **Install FastAPI and Uvicorn**: If you don't have FastAPI and Uvicorn installed, you can install them using pip:
    ```bash
    pip install fastapi uvicorn
    ```

5. **Install Next.js**: If you don't have Next.js installed, you can install it using npm:
    ```bash
    npx create-next-app@latest
    ```

### Instructions for Starting the Development Servers

1. **Start the Backend Server**:
    ```bash
    cd backend
    uvicorn main:app --reload
    ```

2. **Start the Frontend Server**:
    ```bash
    cd frontend
    npm run dev
    ```

3. **Access the App**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app.

### Troubleshooting Tips and Common Issues

1. **Backend Server Not Starting**:
    - Ensure that you have installed all the required dependencies.
    - Check if the port 8000 is already in use. If so, you can specify a different port using the `--port` option:
        ```bash
        uvicorn main:app --reload --port 8001
        ```

2. **Frontend Server Not Starting**:
    - Ensure that you have installed all the required dependencies.
    - Check if the port 3000 is already in use. If so, you can specify a different port using the `-p` option:
        ```bash
        npm run dev -p 3001
        ```

3. **Issues with File Upload**:
    - Ensure that the file type and size are within the allowed limits (png, jpg, jpeg; max 5MB).
    - Check the browser console for any error messages.

4. **Issues with Image Description**:
    - Ensure that the backend server is running and accessible.
    - Check the backend server logs for any error messages.

## Prompts I used

Example prompt (so that you can read the conversation history better):

> Write a haiku

I do the setup myself to not distract the model and to set some structure. Note: for each ai tool reference to files/folders via '@' or '#'. Don't just copy the prompt. Should help the model understand the context better.

So for a replay, clone the repo and cd into the ai-tool folder and open VSC (Continue, Copilot, Cline) or Windsurf.

Note, for some tools follow-up commands & prompts were necessary. I documented them in corresponding README.md files.

**Preparations**

```zsh
# Install llama3.2-vision (if you don't already have it)
ollama pull llama3.2-vision

# Move into the ai-tool folder
cd <INSERT_TOOL_NAME> # e.g. cd copilot

# Create backend
mkdir backend && cd backend
uv init && uv add fastapi ollama
mv hello.py main.py

# Move test_image.png into the ai-tool/backend folder
cp ../../test_image.png .

# Create frontend (Yes to all defaults)
cd ..
npx create-next-app@latest frontend
```


### 1. File Upload

Initial prompt:

> I created the nextjs project within `frontend/`. Help me implementing the **File Upload** feature. Note, we'll work on `backend/` after that.

### 2. Image to Text

Initial prompt:

> We've created a nice looking UI. Now let's move on to **Image to Text**. I initialized the uv project first and installed FastAPI for the backend (`cd backend && uv init && uv add fastapi`). Create the fastapi backend. It should accept an image as input from the frontend, send the image to the ollama model (you have an example for this) and receive the response from ollama. I also provided a test_image.png in `backend/`.

### 3. Result Display

> Frontend seems to work and the backend as well (both are turned off at the moment). Now let's work on **Result Display**.

Follow up prompt (bonus):

> In general it works. But it would also be nice to see the image which was uploaded. Let's add that.

## Results & Conclusion

Every tool had the same initial data and prompts. However, some tools seemed to understand better what I wanted. I was a bit surprised, that Github Copilot Edits in combination with o1 performed so much worse than Claude in Windsurf. I assume it's not just the model, but the context and how it is processed. It could also be that my .\*rules had too many characters.

### Windsurf ✅

-   Holy!
-   Fast iterations. Fixed issues automagically.
-   Created a nice looking web app that did what I wanted.

![](windsurf/screenshot_webapp.png)

### Github Copilot ✅

-   Took a bit longer. But it worked.
-   Together we could fix some issues. Didn't get stuck.
-   NOTE: I used Copilot Edits which is currently still a preview version.

![](copilot/screenshot_webapp.png)

### Continue ❌

-   Macbook got loud sometimes. Had to `brew services restart ollama` or stop ollama completely (100% GPU).
-   In the chat ENTER was my friend. CMD+ENTER confused the model since it checked the whole codebase.
-   The backend was created without any issues. Frontend didn't work as expected. Couldn't upload a file. Not sure what the issue was. Don't have much experience with it. Gave up.

![](continue.dev/screenshot_webapp.png)

### Cline ❌

-   Same as Continue. Mac gets loud quickly with too much context
-   No autocomplete like Copilot or Continue. Maybe combo Cline & Continue does the trick?
-   Didn't even get the first prompt to work. Divide & Conquer wasn't possible. Cline always wanted to create frontend & backend at once.
-   Context in `.clinerules` was always repeated. Yet, deleting and adding details into the prompt didn't help either.
-   Gave up.
