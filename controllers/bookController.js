const { Op } = require('sequelize');
const { Book, Author } = require('../models')

const getBooks = async (req, res) => {
    try {
        const query = req.query
        const perPage = query.per_page ? parseInt(query.per_page) : 10
        const page = query.page ? parseInt(query.page) : 1

        // calculate for offset
        const offset = page === 1 ? 0 : (page-1)*perPage

        // count all data
        const countBooks = await Book.count()

        // get data
        const books = await Book.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset: offset,
            limit: perPage
        });

        // prepare for response
        const prepare = {
            data: books,
            total: countBooks,
            per_page: perPage,
            page: page
        }
        res.status(200).json(prepare);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBooksDetail = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (id) {
            const bookDetail = await Book.findByPk(req.params.id, {
                include: { 
                    model: Author, 
                    as: 'author'
                }
            })

            if (bookDetail) {
                const prepare = {
                    data: bookDetail,
                    message: "Success get books"
                }
                res.status(200).json(prepare);
            } else {
                res.status(404).json({
                    message: "Failed get books",
                    error: "Books doesn't exist"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed get books",
                error: "Parameter not valid"
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createBooks = async (req, res) => {
    try {
        const body = req.body
        const saveBook = await Book.create(
        {
            title: body.title,
            description: body.description,
            publish_date: body.publish_date,
            author_id: body.author_id,
        }
        )
        const prepare = {
            data: saveBook,
            message: "Success create book"
        }
        res.status(200).json(prepare);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateBooks = async (req, res) => {
    try {
        const body = req.body
        const updateBook = await Book.update(
            {
                title: body.title,
                description: body.description,
                publish_date: body.publish_date,
                author_id: body.author_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        )

        if (updateBook == 0) {
            res.status(404).json({
                message: "Failed update book",
                error: "Book doesn't exist"
            });
        } else {
            const prepare = {
                data: body,
                message: "Success update book"
            }
            res.status(200).json(prepare);
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteBooks = async (req, res) => {
    try {
        const deleteBook = await Book.destroy({
            where: {
              id: req.params.id,
            },
        })
        if (deleteBook === 0) {
            res.status(404).json({
                message: "Failed delete book",
                error: "Book doesn't exist"
            });
        } else {
            res.status(200).json({
                message: "Success delete book",
            });
        } 
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const search = async (req, res) => {
    try {
        const { search, author, year } = req.query;

        let filterConditions = {};

        if (search) {
            filterConditions['title'] = { [Op.like]: `%${search}%` };
        }
        if (author) {
            filterConditions['author_id'] = author;
        }
        if (year) {
            filterConditions['publish_date'] = year;
        }

        const books = await Book.findAll({
            where: filterConditions,
            include: {
                model: Author,
                as: 'author',
                attributes: ['id', 'name'],
            },
        });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found with the given search and filters' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message }) 
    }
}

module.exports = {
    getBooks,
    getBooksDetail,
    updateBooks,
    deleteBooks,
    createBooks,
    search
}