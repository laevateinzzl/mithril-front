rm -r ./dist
quasar build
cp -r ../dist ./dist
docker build -t laevateinzzl/mithril-front:v0.2 ./
docker push laevateinzzl/mithril-front:v0.2