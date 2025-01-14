A small locally running nice looking web app that accepts an image as input through an UI and returns a description of the image.

### Implementation notes

Backend setup

```zsh
mkdir backend
cd backend
uv init
uv add fastapi
mv hello.py main.py
# Test
uv run main.py
```

Frontend setup (Yes to all defaults)

```zsh
npx create-next-app@latest frontend
```

Used o1.

Frontend looked not nice. But Button was implemented and it worked.

```zsh
cd frontend && npm run dev
```

Creating the backend with the second prompt worked kind of. Additional manual steps:

```zsh
cd backend
uv add ollama
uv add python-multipart
uv add uvicorn
uv run main.py

# In another terminal
curl -X POST http://localhost:8000/image-to-text -F file=@test_image.png
```

Additional prompts

> When I do `curl -X POST http://localhost:8000/image-to-text -F file=@test_image.png`
> I get an empty response like this `{"description":""}% `

> Result still empty '{"description":""}%'. Not sure why u implemented choices?..Anyway it's empty. Are u sure we send the file correctly and we call the ollama api correctly and we handle the result correctly?

By curling i didn't see anything. But the fastapi printed out what we wanted. So I gave the model a clue.

> with `print("OLLAMA response:", response)` we can see that we're looking for `response['message']['content']`. This is the description we want.

Then the model got it right. Did some minor cleanup manually.

Result display:
The prompt i used created erroneous code, which i fixed using copilot. However, I do not see anything except the upload button.

> I do not see anything except the upload button on the landing page

Had problems with `5 | import ResultDisplay from "./components/ResultDisplay"; |`. Looks like Copilot created another components folder elsewhere. I moved the file to the correct location manually.

> The page does not show the upload button completely anymore and there is a copy button... I want to upload the image and see a description below, which I can copy then

Lol? "Sorry, your request was rate-limited. Please wait 10 hours 55 minutes before trying again."

Switching to Claude and retry.

Then multiple iterations. Try and error we debugged and fixed together. Finally got it working.

![alt text](screenshot_webapp.png)
