cd frontend
npm run build
cd ..
cp -r frontend/dist backend
cd backend
npm install
npm run dev