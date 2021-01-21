# Ohys-Schedule

An anime schedule of the animes Ohys-Raws releases.

## Requirements

This application requires the following back-end applications.

- [Ohys-Server](https://github.com/gokoro/Ohys-Server) - For providing API endpoints.
- [Ohys-Parse](https://github.com/gokoro/Ohys-Parse) - For parsing data from Ohys-Raws. By default, It generally uses MongoDB for dumping data.

These two apps must be running concurrently.

## Getting Started

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Building

```bash
npm run build
# or
yarn build
```

The built static files will be saved in the `.next` folder.

## Running

```bash
npm run start
# or
yarn start
```

After building, You can run a Node.js server to deploy your own application.

Or you can also deploy it on [Vercel](https://vercel.com/) simply.

## License

This repository is licensed under the MIT License.
