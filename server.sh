cd frontend
npm i
npm run build
cd ..
cp -r frontend/dist backend
cd backend
npm install
npm audit fix
npm run dev