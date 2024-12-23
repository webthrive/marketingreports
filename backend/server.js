const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const htmlToMarkdown = require('html-to-markdown');  // Use html-to-markdown for conversion
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3002;

// Directories to store HTML and MD files
// const mdDir = path.join(__dirname, '../content/');

// Ensure the directories exist

// Middleware to parse incoming JSON request body
app.use(bodyParser.json({ limit: 'Infinity' }));
app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true }));
app.use(cors());
// Sanitize file names to avoid issues
const sanitizeFileName = (name) => {
    return name.replace(/[<>:"/\\|?*]/g, '_');
};

// API to input HTML and convert it to Markdown
app.post('/input', async (req, res) => {
    var { content, fileName } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'HTML text is required' });
    }

    console.log(fileName);

    try {
        // Sanitize the file name
        const sanitizedFileName = sanitizeFileName(fileName);
        const htmlDir = path.join(__dirname, `../public/${sanitizedFileName}`);
        fs.ensureDirSync(htmlDir);

        // Generate unique file names based on timestamp
        const htmlFilePath = path.join(htmlDir, 'index.html');

        // Save the HTML content to a file
        content = content.replace('<lcr', '<script').replace('</lcr>', '</script>');
        await fs.writeFile(htmlFilePath, content);

        // Return success response with file paths
        res.status(200).json({
            message: 'Files saved successfully',
            htmlFile: htmlFilePath,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save files' });
    }
});

// API to get the list of downloaded HTML files
app.delete('/input', async (req, res) => {
    const { folderName } = req.body;

    if (!folderName) {
        return res.status(400).json({ error: 'Folder name is required' });
    }

    try {
        // Sanitize the folder name to avoid directory traversal or other security risks
        const sanitizedFolderName = sanitizeFileName(folderName);
        const folderPath = path.join(__dirname, `../public/${sanitizedFolderName}`);

        // Check if the folder exists
        const folderExists = await fs.pathExists(folderPath);
        if (!folderExists) {
            return res.status(404).json({ error: 'Public page link does not exist.' });
        }

        // Delete the folder and its contents
        await fs.remove(folderPath);
        res.status(200).json({
            message: 'Folder deleted successfully',
            folderName: sanitizedFolderName,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete folder' });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
