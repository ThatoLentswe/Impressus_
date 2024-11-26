sudo docker stop impressus-frontend
sudo docker rm impressus-frontend -f
sudo docker rmi -f impressus-frontend:1.0.0
sudo docker build --build-arg REACT_APP_API_BASE_URL=http://impressus-frontend-acc.gov.bw:3040/api --build-arg DOMAIN_HOST=impressus-frontend-acc.com -t impressus-frontend:1.0.0 .
sudo docker run --name impressus-frontend -d -p 3344:80 impressus-frontend:1.0.0

sudo docker ps -a
