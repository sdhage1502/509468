

# 🚀 Journey Builder React Coding Challenge

This is a submission for the **Avantos Journey Builder React Coding Challenge**. The app renders a list of forms from a DAG (Directed Acyclic Graph) and allows users to configure field-level prefill mappings using upstream form fields or global data.
## Youtube Video Link :- https://youtu.be/SmHnFCAKLtI
---

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Architecture Design](#architecture-design)
- [Extensibility](#extensibility)
- [Screenshots](#screenshots)
- [Author](#author)

---

## ✅ Features

- 📦 Fetches forms DAG from mock server
- 🧩 Renders a list of forms in the sidebar
- 🔎 Displays each form’s fields with existing prefill configuration
- 🛠 Allows:
  - Setting prefill from upstream forms or global data
  - Clearing prefill mappings
- 🧱 Modular design to support future data sources

---

## 🧪 Demo

A 30-minute screen recording demonstrating the following is included:
- Setuping the mock server
- Setuping the React + Vite.JS + TypeScript Project
- Fetching and displaying forms

> https://youtu.be/SmHnFCAKLtI
---

## ⚙️ Installation

```bash
# 1. Clone the project
git clone https://github.com/your-username/journey-builder-react.git
cd journey-builder-react

# 2. Install dependencies
npm install

# 3. Clone and run the mock server (in a new terminal tab)
git clone https://github.com/mosaic-avantos/frontendchallengeserver
cd frontendchallengeserver
npm install
npm start

# 4. Start the React app
cd ../journey-builder-react
npm run dev
````

> App will run on: `http://localhost:5173/`

---

## 💡 Usage

1. Start the mock server (`frontendchallengeserver`).
2. Open the app (`npm run dev`).
3. Click on a form in the sidebar to view its fields.
4. Click on any field to:

   * Select a prefill source (upstream form fields or global data).
   * Clear a prefill using the ❌ button.

---

## 📁 Folder Structure

```
src/
├── api/
│   └── formApi.ts           # API logic to fetch DAG
├── components/
│   ├── FormList/
│   │   └── FormList.tsx     # Sidebar with forms
│   ├── PrefillConfig/
│   │   └── prefillConfig.tsx # Field-level prefill mapping UI
│   └── Modal/
│       └── Modal.tsx        # Modal for selecting prefill source
├── types/
│   └── index.ts             # TypeScript types/interfaces
├── utils/
│   ├── graphUtils.ts        # DAG traversal logic
│   ├── parseGraph.ts        # Converts API DAG into usable graph
│   └── globalData.ts        # Mock global data for prefill
├── App.tsx                  # Main app entry
├── App.css                  # App styles
├── index.css                # Base styles
└── main.tsx                 # Vite entry
```

---

## 🛠️ Tech Stack

* **React** (with hooks)
* **TypeScript**
* **Vite** (build tool)
* **Axios** (HTTP requests)
* **Tailwind CSS** (utility-first styling)
* **JavaScript** (mock API server)

---

## 🧱 Architecture Design

The app is architected for clarity and extensibility:

* **Data Sources**: Each prefill field can be populated from upstream form fields or global data.
* **Modular Components**: Modal and prefill logic are separated and reusable.
* **DAG Utilities**: Custom graph parser and DAG traversal to identify upstream dependencies.

---

## 🌱 Extensibility

The architecture supports easy integration of new prefill sources:

1. Add your new data source to `globalData.ts` or a new file.
2. Extend `Modal.tsx` to display it as an option.
3. Update `PrefillSource` type in `types/index.ts`.

> Future sources like Action Properties or Client Organization Properties can be added without disrupting existing logic.

---

## 📸 Screenshots

> Replace these with actual images if you're submitting via GitHub

### 🧾 Form List Sidebar

![Screenshot 2025-05-23 013819](https://github.com/user-attachments/assets/784b720a-b4fd-4499-af80-3114f829b599)


### 🛠️ Prefill Mapping View

![Screenshot 2025-05-23 013831](https://github.com/user-attachments/assets/2a850ca2-d39c-4306-9ad5-2028509b2589)


### 🔍 Source Selection Modal
![Screenshot 2025-05-23 013840](https://github.com/user-attachments/assets/5349ab49-26c7-40a5-8649-74d76b8f6ab4)

![Screenshot 2025-05-23 014056](https://github.com/user-attachments/assets/b5a2d701-fe3b-48cd-add6-d8725af8d674)


---


## 📃 License

This project was built as part of the **Avantos Frontend Coding Challenge** and is for evaluation purposes only.

---

