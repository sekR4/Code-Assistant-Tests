# Continue (offline mode)

We're using Ollama and this `.continue/config.json` settings.

```json
...
  "models": [
    {
      "model": "vanilj/Phi-4",
      "provider": "ollama",
      "title": "vanilj/Phi-4"
    }
  ],
  "tabAutocompleteModel": {
      "model": "qwen2.5-coder",
      "provider": "ollama",
      "title": "qwen2.5-coder"
  },
  "embeddingsProvider": {
    "provider": "ollama",
    "model": "jina/jina-embeddings-v2-base-en"
  },
  ...
```

**How to automagically edit code?**
Select code you want to edit, push CMD + I. It appears in the sidebar. Then prompt. You can then choose to accept or reject changes.

# Notes

-   Prompts totally didn't work. Ran into errors.
-   Default slash actions not useful to me. Additions/edits didn't show up. Not usable
