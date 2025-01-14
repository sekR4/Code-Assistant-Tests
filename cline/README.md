# Cline

https://ollama.com/library/phi4
https://github.com/cline/cline

Preparation

```zsh
# Model
ollama pull phi4


# Frontend
npx create-next-app@latest frontend
```

<!-- ![alt text](cline_choose_model.png) -->

# Implementation Notes

-   Mac gets loud quickly with too much context
-   No autocomplete like Copilot or Continue. Maybe combo Cline & Continue does the trick?
-   Under Auto-approve I checked the boxes Read..., Edit ..., Execute...,

## 1. File Upload

The initial prompt did not work. It ended in "❌ Cline is having trouble...". Cline tried to solve all at once. It also tried to create new folders.

Another shot.

```
Help me to implement the 'File Upload' feature within @frontend. This includes:

-   Single file upload interface with drag-and-drop support
-   Immediate file processing upon selection
-   File type validation (png, jpg, jpeg)
-   File size validation (max 5MB)
-   Loading state indication during upload and processing
-   Error handling with user-friendly notifications
```

It did too much at once. So I stopped it. Another shot.

```
Help me to implement the 'File Upload' feature within @frontend. This includes:

-   Single file upload interface with drag-and-drop support
-   Immediate file processing upon selection
-   File type validation (png, jpg, jpeg)
-   File size validation (max 5MB)
-   Loading state indication during upload and processing
-   Error handling with user-friendly notifications

In this task focus ONLY on FRONTEND. INGORE backend for now (just remember, we connect both later)
```

It kept repeating the content of `.clinerules` until "❌ Cline is having trouble...". Deleted it. Another prompt.

```
Want to create a small locally running nice looking static website that accepts an image as input. I already created via `npx create-next-app@latest frontend`). IGNORE THE BACKEND FOR NOW!!!

Use:
- Next.js 15+ as framework
- TypeScript for type safety
- Tailwind CSS for styling

Functionalities:
-   Single file upload interface with drag-and-drop support
-   Immediate file processing upon selection
-   File type validation (png, jpg, jpeg)
-   File size validation (max 5MB)
-   Loading state indication during upload and processing
-   Error handling with user-friendly notifications
```

Somehow it always ended up in trouble. Gave up
