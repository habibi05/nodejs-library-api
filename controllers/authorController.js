const { Author, Book } = require('../models');

// Get All Authors
const getAuthors = async (req, res) => {
  try {
    // define params per_page and page
    const query = req.query
    const perPage = query.per_page ? parseInt(query.per_page) : 10
    const page = query.page ? parseInt(query.page) : 1

    // calculate for offset
    const offset = page === 1 ? 0 : (page-1)*perPage

    // count all data
    const countAuthors = await Author.count()

    // get data
    const authors = await Author.findAll({
      order: [
        ['id', 'DESC']
      ],
      offset: offset,
      limit: perPage
    });

    // prepare for response
    const prepare = {
      data: authors,
      total: countAuthors,
      per_page: perPage,
      page: page
    }
    res.status(200).json(prepare);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Detail Authors
const getAuthorsDetail = async (req, res) => {
  try {
    // parse params id for check is integer
    const id = parseInt(req.params.id)
    if (id) {
      // get data
      const authorDetail = await Author.findByPk(req.params.id, {
        include: {
          model: Book, 
          as: 'books'
        }
      })
  
      // if data exist
      if (authorDetail) {
        // prepare for response
        const prepare = {
          data: authorDetail,
          message: "Success get authors"
        }
        res.status(200).json(prepare);
      } else {
        // if data doesn't exist
        res.status(404).json({
          message: "Failed get authors",
          error: "Author doesn't exist"
        });
      }
    } else {
      // params is not integer
      res.status(400).json({
        message: "Failed get authors",
        error: "Parameter not valid"
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create Authors
const createAuthors = async (req, res) => {
  try {
    const body = req.body
    const saveAuthor = await Author.create(
      {
        name: body.name,
        bio: body.bio,
        birth_date: body.birth_date,
      }
    )
    const prepare = {
      data: saveAuthor,
      message: "Success create authors"
    }
    res.status(200).json(prepare);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update Authors
const updateAuthors = async (req, res) => {
  try {
    const body = req.body
    const updateAuthor = await Author.update(
      {
        name: body.name,
        bio: body.bio,
        birth_date: body.birth_date,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )

    if (updateAuthor == 0) {
      res.status(404).json({
        message: "Failed update authors",
        error: "Authors doesn't exist"
      });
    } else {
      const prepare = {
        data: body,
        message: "Success update authors"
      }
      res.status(200).json(prepare);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete Authors
const deleteAuthors = async (req, res) => {
  try {
    const deleteAuthor = await Author.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (deleteAuthor === 0) {
      res.status(404).json({
        message: "Failed delete authors",
        error: "Authors doesn't exist"
      });
    } else {
      res.status(200).json({
        message: "Success delete authors",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAuthors,
  getAuthorsDetail,
  createAuthors,
  updateAuthors,
  deleteAuthors
}