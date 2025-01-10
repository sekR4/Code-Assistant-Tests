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
