const processLogs = (data) => {
    const logsContainer = document.getElementById('logs');

    data.data.forEach(log => {
        const logEntry = document.createElement('pre');
        logEntry.classList.add('log-entry', log.level);

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
        logsContainer.appendChild(logEntry);
    });

    window.scrollTo(0, document.body.scrollHeight);
};

// fetch('/logs/console')
//     .then(response => response.json())
//     .then(processLogs)
//     .catch(console.error);

const socket = io();
socket.on('log-updated', processLogs);
