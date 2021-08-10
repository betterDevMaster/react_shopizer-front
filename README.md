This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### USING NPM

### `npm i`

### `npm run dev`

### docker files ###

docker build . -t shopizerecomm/shopizer-shop:latest

docker run \
-e "REACT_APP_APP_MERCHANT=DEFAULT" \
-e "REACT_APP_APP_BASE_URL=http://localhost:8080" \
-it --rm -p 80:80 shopizerecomm/shopizer-shop-reactjs

http://localhost

## Change theme color

env should have
REACT_APP_APP_THEME_COLOR=#D1D1D1
