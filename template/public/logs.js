const processLogs = (data) => {
    const logsContainer = document.getElementById('logs');

    // Check if the user is already at the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

    // Clear the container before appending new logs
    logsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    data.data.forEach(log => {
        const logEntry = document.createElement('pre');
        
        // Ensure log.level is valid and not empty
        if (log.level) {
            logEntry.classList.add('log-entry', log.level.trim());
        } else {
            logEntry.classList.add('log-entry', 'unknown'); // Fallback if log.level is empty or undefined
        }

        // Optional: Add styling based on log level
        if (log.level === 'info:') {
            logEntry.classList.add('info');
        } else if (log.level === 'error:') {
            logEntry.classList.add('error');
        }

        const timestamp = new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('timestamp');
        timestampSpan.textContent = `${timestamp} - `;

        const messageSpan = document.createElement('span');
        messageSpan.textContent = typeof log.message === 'object' ? JSON.stringify(log.message, null, 2) : log.message;

        logEntry.append(timestampSpan, messageSpan);
        fragment.appendChild(logEntry);
    });

    logsContainer.appendChild(fragment);

    // Scroll to bottom only if the user was already at the bottom
    if (isAtBottom) {
        window.scrollTo(0, document.body.scrollHeight);
    }
};

// Initialize socket listener for log updates
const socket = io();
socket.on('log-updated', processLogs);
