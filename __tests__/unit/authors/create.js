function create(data) {

    const prepare = {
        data: {
            id: 1,
            name: data.name,
            bio: data.bio,
            birth_date: `${data.birth_date}T00:00:00.000Z`,
            updatedAt: "2024-01-01T01:01:01.000Z",
            createdAt: "2024-01-01T01:01:01.000Z"
        },
        message: "Success create author"
    };
    return JSON.stringify(prepare)

}

module.exports = create