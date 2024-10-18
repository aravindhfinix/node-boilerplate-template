# Ready-to-go-node-template

A complete Node.js boilerplate template with built-in support for **Socket.io** and **MongoDB** (via Mongoose). This template helps you quickly set up a modern Node.js server with environment configuration and essential middleware.

## Features

- **Socket.io**: Preconfigured for real-time web socket communication.
- **MongoDB**: Integrated with Mongoose for easy MongoDB interactions.
- **Environment Setup**: Ready-to-use `.env` file based on `.sample-env`.
- **Modular Architecture**: Organized folder structure for easy scaling.
- **Ready for Development**: Nodemon setup for development mode.

## Requirements

- **Node.js**: v20.6.0 or above
- **MongoDB**: Make sure MongoDB is installed and running.

## Installation

### Step 1: Clone the Boilerplate

Use `npx` to quickly clone the boilerplate template into your project directory:

```bash
npx ready-to-go-node-template
```

### Step 2: Install Dependencies

Navigate into the project directory and install all dependencies:

```bash
npm install
```

### Step 3: Configure Environment Variables

Copy the `.sample-env` file to `.env` to create your environment configuration:

```bash
cp .sample-env .env
```

### Step 4: Start the Server

To start the server in production mode, run:

```bash
npm start
```

For development, use `npm run dev` to start the project with **Nodemon** for automatic restarts:

```bash
npm run dev
```

## MongoDB Setup

Ensure that your MongoDB service is running locally or adjust your `.env` file to connect to a remote MongoDB instance.

## License

This project is licensed under the MIT License.

