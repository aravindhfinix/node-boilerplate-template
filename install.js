#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const cloneBoilerplate = async () => {
    const srcDir = path.join(__dirname, 'template'); // Path to your template folder inside the package
    const destDir = path.join(process.cwd(), 'my-boilerplate'); // Destination for the cloned project

    try {
        // Copy the template folder to the destination directory
        await fs.copy(srcDir, destDir);
        console.log(`Boilerplate cloned to ${destDir}`);

        // Rename .gitignore.template to .gitignore if needed
        const gitignoreTemplate = path.join(destDir, '.gitignore.template');
        const gitignore = path.join(destDir, '.gitignore');
        if (await fs.pathExists(gitignoreTemplate)) {
            await fs.rename(gitignoreTemplate, gitignore);
            console.log('Renamed .gitignore.template to .gitignore');
        }

        // Check for the presence of .env and .gitignore files
        const files = await fs.readdir(destDir, { withFileTypes: true });
        if (!files.some(file => file.name === '.env')) {
            console.warn('.env file is missing');
        }
        if (!files.some(file => file.name === '.gitignore')) {
            console.warn('.gitignore file is missing');
        }
    } catch (err) {
        console.error('Error cloning boilerplate:', err);
    }
};

cloneBoilerplate();
