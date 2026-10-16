# Third-party dependencies

The app currently loads pinned CDN versions. No third-party binaries are bundled in this ZIP because network downloads were unavailable during creation.

Run `node tools/download-vendor.mjs` from the project root to download these files and switch the app to local paths:

| Dependency | Version | License |
| --- | --- | --- |
| Mozilla PDF.js and PDF worker | 3.11.174 | Apache-2.0 |
| PDF-LIB | 1.17.1 | MIT |
| SortableJS | 1.15.6 | MIT |

Keep the downloaded license files when redistributing these libraries. Versions preserve the working API integration; they are not a claim to be the latest releases. Dependency upgrades require compatibility and security review plus browser testing.
