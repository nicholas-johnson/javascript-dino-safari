# Capstone 3 - Static Site Generator

Build a CLI tool that reads a directory of Markdown-like text files and outputs a folder of HTML pages, with a generated index page linking them all together.

---

## What you're building

```bash
node generate.js --input ./content --output ./site
```

The tool:

1. Scans `./content` for `.txt` files.
2. Converts each file into an HTML page using a template function.
3. Generates an `index.html` that links to every page.
4. Writes everything to `./site`.

No third-party Markdown library - you'll write a minimal converter yourself.

---

## Requirements

### File discovery

- Use `readdir` from `node:fs/promises` to list all `.txt` files in the input directory.
- Build paths with `path.join`; derive `__dirname` from `import.meta.url`.
- Filter the listing with `.filter()` to ignore non-`.txt` files.

### Minimal text-to-HTML conversion

- The first line of each `.txt` file is the title (becomes an `<h1>`).
- Blank lines separate paragraphs (each becomes a `<p>`).
- Lines starting with `## ` become `<h2>` tags.
- Lines starting with `- ` become list items inside a `<ul>`.
- Everything else is a paragraph.
- Write a `convertToHtml(text)` function that uses `.split('\n')`, `.map()`, and `.reduce()` to walk the lines and accumulate HTML strings.

### Template engine (closures)

- Write a `createTemplate(wrapper)` factory that accepts an HTML wrapper string containing `{{title}}` and `{{body}}` placeholders.
- It returns a function `render(title, body)` that closes over the wrapper and replaces the placeholders.
- Load the wrapper from a `template.html` file at startup (sync read is fine here).

### Output

- Create the output directory with `mkdir({ recursive: true })`.
- Write each HTML page with `writeFile`.
- Generate `index.html` with a `<ul>` of links to every page. Derive the link text from each file's title. Use `.map()` to build the list items and `.join()` to assemble the HTML.

### CLI arguments

- Parse `--input` and `--output` from `process.argv`.
- Use default parameters: input defaults to `./content`, output defaults to `./site`.
- Validate that the input directory exists; print a clear error if not.

### Processing with streams (large files)

- For any `.txt` file over 100 KB, read it with `createReadStream` + `createInterface` (readline) instead of `readFile`, to keep memory flat.
- Write a `readLargeFile(filePath)` function that returns a promise resolving to the full text, assembled line by line.

### Error handling

- Wrap all file operations in `try`/`catch`.
- If a single file fails to convert, log a warning and continue with the rest (don't crash the whole build).
- Use a custom `GeneratorError` class with a `code` property (e.g. `MISSING_INPUT`, `PARSE_FAILED`).

### Code organisation

- `cli.js` - argument parsing and validation.
- `convert.js` - text-to-HTML conversion logic.
- `template.js` - template factory.
- `io.js` - all file reading and writing.
- `index.js` - orchestration.

---

## Modules practiced

| Module | How it's used |
|---|---|
| 1 - Modern JS | Template literals for HTML, ESM, `process.argv`, `const`/`let` |
| 2 - Functions | `.filter()`, `.map()`, `.reduce()` for text conversion and link list |
| 3 - Closures | Template factory closing over the wrapper HTML |
| 4 - Gotchas | String edge cases, falsy checks on empty lines, `===` |
| 5 - Objects | Page metadata objects, custom error class with `extends` |
| 6 - Async | `async`/`await`, `Promise.all` to write pages concurrently, `try`/`catch` |
| 7 - Node tools | `fs/promises`, `readFileSync`, `path`, `readline`, `createReadStream` |
| 8 - Code org | Five-module split, facade, custom errors with codes |

---

## Stretch goals

- Add a `--watch` flag that uses `fs.watch` to rebuild when a source file changes.
- Support inline bold (`**text**` → `<strong>text</strong>`) with `replace` and a regex.
- Add a `--serve` flag that starts an `http.createServer` to preview the site locally.
