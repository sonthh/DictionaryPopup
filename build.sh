echo ">>> Make production directory"
mkdir -p production
echo ">>> Copy css js manifest.json icons"
cp -R css production
cp -R js production
cp manifest.json production
cp icon_16.png production
cp icon_48.png production
cp icon_128.png production
echo ">>> Build frontend reactjs"
cd frontend
npm run build
echo ">>> Copy frontend reactjs build"
cd ..
cp -R frontend/build production/ui
echo ">>> Completed"
