// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// // export default {
// //   setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
// //   testEnvironment: "jsdom",
// //   moduleNameMapper: {
// //     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
// //     "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
// //   },
// // };




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ✅ Import vitest config
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js' // create this file next
  }
});
