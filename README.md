# Pagecraft PDF Merger

A browser-based PDF merger built with plain HTML, CSS and JavaScript. No build step, paid service, account, or backend is required.

## Start here in VS Code

1. Extract the ZIP. Open the extracted **PDF-Merger-Project** folder with **File → Open Folder**. This is the folder containing `index.html`.
2. Open Extensions (`Ctrl+Shift+X`), search **Live Server** by Ritwick Dey, and install it. VS Code also recommends it when you open this project.
3. In the Explorer, right-click `index.html` and choose **Open with Live Server**.
4. Your browser opens a local address, normally `http://127.0.0.1:5500`. Keep Live Server running while testing. Saving edits refreshes the page, so download your result before editing if you need to keep it.
5. Add two PDFs and test preview arrows, reordering, rotation, duplication, deletion, undo and export.

Use a local server rather than double-clicking the HTML file, especially when testing PDF workers. There is no npm install or compilation step. Node.js is optional; it is used only by the bundled developer tools.

## What goes where

| File | Edit it to change |
| --- | --- |
| `index.html` | Page structure, labels and toolbar markup |
| `css/styles.css` | Colors, layout, animations and mobile breakpoints |
| `js/state.js` | Shared state, dependency checks and PDF worker configuration |
| `js/workspace.js` | Page cards, thumbnail strip, status messages and UI refresh |
| `js/viewer.js` | Enlarged PDF preview and viewer navigation |
| `js/page-order.js` | Rotate, duplicate, delete, move and undo |
| `js/pdf-tools.js` | PDF import, thumbnail rendering, merged PDF generation and download |
| `js/sounds.js` | Synthesized sound effects |
| `js/app.js` | Button wiring, keyboard shortcuts and drag/drop setup |
| `assets/favicon.svg` | Browser-tab icon |
| `vendor/README.md` | Third-party libraries and optional local installation |
| `tools/download-vendor.mjs` | Optional script to download libraries and switch to local copies |
| `tools/check.mjs` | JavaScript syntax and local reference checks |
| `.vscode/` | Editor settings and extension recommendations |
| `.nojekyll` | Makes GitHub Pages serve this static project directly |

The JavaScript files are ordinary browser scripts sharing the state declared in `state.js`. Keep their script order in `index.html`. They are deliberately not ES modules, so this project needs no bundler or import configuration. Function declarations are available by the time app.js wires up the interface.

## Publish to a NEW GitHub repository

Recommended: publish this as a separate repository named **pdf-merger**, leaving your existing website intact.

1. Install Git from https://git-scm.com/downloads if needed. Restart VS Code after installing. You can check with `git --version` in **Terminal → New Terminal**.
2. Open Source Control (`Ctrl+Shift+G`) and click **Initialize Repository**.
3. Stage the project files using the **+** beside Changes. Enter a commit message such as `Create PDF merger`, then click **Commit**.
4. If Git asks for your author identity, follow the prompt. Alternatively set `git config --global user.name "Your Name"` and `git config --global user.email "YOUR_GITHUB_EMAIL"` in the terminal. You may use the privacy email provided in your GitHub email settings.
5. Press `Ctrl+Shift+P`, run **Publish to GitHub**, and sign in when prompted. Choose a **public repository** for the simplest GitHub Pages setup on GitHub Free. This publishes the app's source code, not PDFs selected by users.
6. On GitHub, open the repository's **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**. Choose the branch you published (normally `main`), select **/(root)**, then **Save**.
8. Wait for the deployment to finish. GitHub displays the website URL on that page. With your username and a repository named `pdf-merger`, it should be `https://ex0skeleton.github.io/pdf-merger/`.

Upload the CONTENTS of this project at the repository root. `index.html` must be directly at the publishing root, alongside `css`, `js` and `assets`. Uploading only the ZIP will not publish the app.

Your existing `https://ex0skeleton.github.io?PDF` address belongs to the root website. Publishing a separate repository does not automatically change that address or its routing. Use the new `/pdf-merger/` URL; integrating the old query-string route requires your existing site's code.

Official guides:
- https://code.visualstudio.com/docs/sourcecontrol/repos-remotes
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Future updates

1. Open this same project folder in VS Code.
2. Edit the relevant files and test through Live Server.
3. In Source Control, review the changes, stage them, enter a message, and **Commit**.
4. Click **Sync Changes** (or Push). GitHub Pages deploys the updated files automatically.

If you ask for changes here, provide the latest project ZIP or the changed files so the next version starts from your current source. Back up your current work before replacing files with an updated project.

## Libraries and internet access

This delivery retains pinned CDN libraries because the creation environment could not download their binaries. All your own HTML, CSS and JavaScript are included. The app currently needs internet access to load PDF.js, PDF-LIB and SortableJS. Your selected PDFs are processed in browser memory; the app does not upload their contents.

To include libraries in the repository and remove those CDN requests, install Node.js if needed, open the VS Code terminal in the project folder, and run:

```sh
node tools/download-vendor.mjs
```

The script downloads the exact pinned libraries, worker, and license files over HTTPS, then switches the HTML and worker configuration to local paths. It switches paths only after all downloads succeed. Commit the resulting `vendor` files and changed `index.html` and `js/state.js`. You can rerun the script if a network request fails. This removes the CDN dependency; it does not install the website as an offline app or guarantee offline reloads.

## Optional developer checks

With Node.js installed, run:

```sh
node tools/check.mjs
```

This checks JavaScript syntax, referenced local files and the absence of leftover inline application code. It is not an end-to-end browser test.

## Features and practical limits

- Add multiple PDFs; failed or password-protected files are reported and skipped.
- Drag page handles on desktop and touch devices, or use Move to place a page before any other page.
- Preview with Previous/Next controls; rotate, duplicate, delete, reorder, add files, undo and merge from the viewer.
- Undo retains up to 25 changes. Reloading the page clears the workspace; there is no autosave.
- PDF output copies source pages rather than turning them into screenshots. Complex forms, signatures, attachments, bookmarks and document-level metadata are not guaranteed to survive merging. This is a page organizer, not an editor for text inside a PDF.
- Large files consume device memory. Browser and phone capacity varies.
- Sounds are generated with Web Audio after user interaction. You can toggle them in the header.
- Download sounds indicate the file was generated and sent to the browser. Browsers do not report when a file finishes saving to disk.
- Browser and physical touch-device testing still need to be done. Syntax and reference checks do not verify PDF rendering or touch behavior.
