// Node.js File System Module is used for working with system files
const fs = require('fs');

// Check if there is a build folder for changing the production mode
if (fs.existsSync('client/build')) {
    process.env.NODE_ENV = 'production';
    process.env.databaseUri = process.env.MONGODB_URI;
    process.env.databaseName = 'mernmoviesdb';
} else {
    process.env.NODE_ENV = 'development';
    process.env.databaseUri = 'mongodb://localhost:27017';
    process.env.databaseName = 'mernmoviesdb';
}