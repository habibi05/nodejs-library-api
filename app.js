const express = require('express');
const app = express();
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');

app.use(express.json());
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
