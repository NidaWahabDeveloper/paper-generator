# AI Paper Generator — Frontend (React + Vite + Tailwind)

Ye MERN Stack project ka **frontend-only demo** hai (mid-term ke liye). Backend/AI abhi connect nahi hai — Paper Generation dummy data se hota hai, taake demo ke liye kaam kare.

## Tech Stack
- React (Vite)
- Tailwind CSS
- React Router
- React Hook Form
- jsPDF (PDF export)
- Axios (installed, future backend calls ke liye ready)

## Setup (Step by Step)

1. **Node.js install hona chahiye** (nodejs.org se download karein, LTS version).

2. Terminal mein is folder ke andar jaayein:
   ```
   cd paper-generator
   ```

3. Dependencies install karein:
   ```
   npm install
   ```

4. Project ko run karein:
   ```
   npm run dev
   ```

5. Terminal mein jo link aaye (usually `http://localhost:5173`) usay browser mein khol lein.

## Kaise Use Karein
1. Sidebar se **"Generate Paper"** par jayein.
2. Form bharein (School Name, Class, Subject, Paper Type, Difficulty, waghera).
3. **Generate Paper** button dabayein — thori dair mein dayen taraf paper preview aa jayega.
4. **Download as PDF** button se real PDF file download hogi.

## Folder Structure
```
paper-generator/
  src/
    components/     -> Sidebar, Navbar, Layout, Button, Card, PaperPreview
    pages/           -> Dashboard, GeneratePaper, History, Settings, Login
    data/             -> dummy question bank
    utils/            -> paper generation logic + PDF export logic
    App.jsx           -> routes
    main.jsx          -> entry point
```

## Next Steps (Phase 2, baad mein)
- Node.js/Express backend banake `/generate` API se real AI (Gemini/Groq) connect karna
- Tesseract.js se OCR add karna (image se text nikalne ke liye)
- MongoDB mein papers save karna (History page real data dikhaye)
