# Module Federation Template with Rspack and TailwindCSS

Welcome to the **Module Federation Template** powered by **Rspack** and **TailwindCSS**. This repository serves as a boilerplate for building microfrontend architectures.

## Features

- **Rspack**: A fast and efficient bundler for modern web applications.
- **Module Federation**: Enable sharing code and dependencies across multiple applications.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: >= 16.x
- **npm** or **yarn**: Latest stable version

### Installation

1. Copy the repository using degit:

   ```bash
   npx degit https://github.com/Mijura/mf-rspack-tailwindcss.git repo_name
   ```

   **Note:** Replace `repo_name` with the name you want for your local project folder.

2. Navigate to the project directory:

   ```bash
   cd mf-rspack-tailwindcss
   ```

3. Install dependencies:
   ```bash
   yarn
   ```

### Running the Development Server

Start the development server:

```bash
yarn serve
```

Access the application at http://localhost:3000.

### Building for Production

To create a production build:

```bash
yarn build
```

The production-ready files will be available in the `dist/` directory.

## Project Structure

```
mf-rspack-tailwindcss/
├── configs
│   ├── rspack.base.js            # Rspack base configuration
│   ├── rspack.dev.js             # Configuration for development server
│   ├── rspack.prod.js            # Configuration for production build
├── src/
│   ├── components/               # Reusable React components
│   ├── index.tsx                 # Entry point
├── tailwind.config.js            # TailwindCSS configuration
├── package.json                  # Project metadata and scripts
└── README.md                     # Project documentation
```

## Configuration

### Module Federation

Update the `rspack.base.js` file to configure Module Federation:

```javascript
const ModuleFederationPlugin = require("@rspack/plugin-module-federation")

module.exports = {
	plugins: [
		new ModuleFederationPlugin({
			name: "app",
			filename: "remoteEntry.js",
			remotes: {
				otherApp: "otherApp@http://localhost:3001/remoteEntry.js",
			},
			exposes: {
				"./Component": "./src/components/ExampleComponent",
			},
			shared: { react: { singleton: true }, "react-dom": { singleton: true } },
		}),
	],
}
```

### TailwindCSS

Customize your TailwindCSS settings in `tailwind.config.js`:

```javascript
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
}
```

Happy coding with **Module Federation**, **Rspack**, and **TailwindCSS**!
