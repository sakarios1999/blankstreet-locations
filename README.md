Blank Street Locations — Case Study

A Next.js application replicating the Blank Street locations UI flow, with two screens:
	1.	List of all locations, grouped by city.
	2.	Detail view with embedded map and hours for a single location.

This case study prioritizes clean code, modularity, and maintainability over visual polish.

⸻

📁 Project Structure

src/
├─ app/
│  ├─ api/locations/route.ts      # server proxy
│  ├─ locations/
│  │  ├─ [marketName]/[slug]/page.tsx   # detail page
│  │  └─ page.tsx               # list page
│  ├─ layout.tsx                # root layout
│  └─ page.tsx                  # redirect `/` → `/locations`
├─ components/
│  ├─ CityTabs.tsx
│  ├─ LocationGrid.tsx
│  ├─ LocationCard.tsx
│  ├─ MapView.tsx
│  └─ LocationDetails.tsx
├─ services/
│  └─ locations.ts              # data-fetching functions
├─ utils/
│  ├─ groupBy.ts                # array grouping helper
│  └─ slugify.ts                # text slug generator
└─ types/
   └─ location.ts               # API type definitions


⸻

🛠️ Prerequisites
	•	Node.js v16 or later
	•	npm (bundled with Node.js) or yarn

⸻

⚙️ Installation
	1.	Clone the repo

git clone https://github.com/sakarios1999/blankstreet-locations.git
cd blankstreet-locations


	2.	Install dependencies

npm install
# or
yarn install


	3.	(Optional) Configure API URL
By default the app calls https://api.blankstreet.com/locations. To override:

export NEXT_PUBLIC_API_URL="https://your.proxy/api"

⸻

📦 Development

Start the development server with live reload:

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser.

⸻

🚧 Production Build
	1.	Build the app:

npm run build
# or

yarn build

2. **Start** in production mode:

```bash
npm start
# or
yarn start

By default Next.js listens on port 3000. You can change it:

PORT=4000 npm start

⸻

🤝 License

MIT © Chris Sakr