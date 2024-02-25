cd frontend

# >>> Will throw error if OS is not Linux, Used for Deployment > Can ignore if OS = WIN
npm i
#

npm run build
cd ..
cp -r frontend/dist backend




cd backend
npm install
npm audit fix
npm run dev