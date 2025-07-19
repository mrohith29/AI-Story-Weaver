# TODO: Moving Project to a New Folder

## 1. Before Moving: Clean Up
- [ ] Delete `node_modules/` folder (can be reinstalled)
- [ ] Delete `dist/` folder (will be rebuilt)
- [ ] Delete `lint-report.txt` (temporary file)

## 2. Copy These Files/Folders to the New Location
- [ ] All source code (`src/`, `components/`, `services/`, etc.)
- [ ] Project config files: `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `firebase.json`, `.firebaserc`, `.gitignore`, `README.md`, `tailwind.config.js`, `postcss.config.js`, etc.
- [ ] `.env` file (if present and needed for API keys)

## 3. After Moving: Setup in New Location
- [ ] Open a terminal in the new project folder
- [ ] Run `npm install` to reinstall dependencies
- [ ] (If not logged in) Run `firebase login` to authenticate Firebase CLI
- [ ] Run `npm run build` to generate the `dist/` folder
- [ ] Run `firebase deploy` to deploy to Firebase Hosting (if needed)

## 4. What You Do NOT Need to Do Again
- [ ] Do NOT run `firebase init` again (unless you want to change Firebase setup)
- [ ] Do NOT reconfigure public directory or SPA settings
- [ ] Do NOT set up GitHub Actions again (unless you want to change CI/CD)

---

**Summary:**
- Only move source and config files.
- Delete build artifacts and dependencies before moving.
- Reinstall and rebuild in the new location. 