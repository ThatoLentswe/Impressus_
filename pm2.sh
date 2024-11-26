sudo pm2 stop "impressus-frontend"
sudo pm2 del "impressus-frontend"
sudo npx kill-port 3000 -y
sudo npm install -g serve
sudo rm -r build --verbose
sudo yarn build --verbose
#sudo pm2 start npm --name "impressus-frontend" -- start
pm2 start "serve -s build" --name "impressus-frontend"
sudo pm2 logs
