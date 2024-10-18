## Node.js Boilerplate Backend

This Node.js boilerplate is designed to kickstart your backend development process using the latest stable version of Node.js LTS (Long-Term Support) and supports only Node.js versions above 20.06.

### Instructions

1. Make sure you have Node.js LTS version installed on your system.
2. Create an `.env` file based on the provided `.env-example` file using the following command:
   ```bash
   cp .env-sample .env
   ```
3. Replace placeholders in the `.env` file:
   - Replace `your_mongodb_uri` with your MongoDB connection URI.
   - Replace `your_redis_host` with your Redis server host.
   - Replace `your_redis_port` with your Redis server port.
4. Install project dependencies using npm:
   ```bash
   npm install
   ```
5. Start the project:
   ```bash
   npm start
   ```

### Other Configurations

- This boilerplate provides a basic setup for a Node.js backend. Additional configurations and dependencies can be added as per project requirements.

Feel free to extend and customize this boilerplate according to your project needs.

### Note

Ensure compatibility of any added dependencies with the specified Node.js versions.


###

for log access use 

http://localhost:3000/logs-page

LOG_USERNAME=admin
LOG_PASSWORD=mylogpassword