cd frontend
npm run build
cd ..
cp -r frontend/dist backend
cd backend
npm run dev