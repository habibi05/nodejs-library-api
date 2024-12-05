const create = require('./create')

test('Create Author', () => {
    const request = {
        name: "Habibi 5",
        bio: "Bio Habibi 5",
        birth_date: "1999-10-05"
    }

    const data = {
        id: 1,
        ...request,
        birth_date: `${request.birth_date}T00:00:00.000Z`,
        updatedAt: "2024-01-01T01:01:01.000Z",
        createdAt: "2024-01-01T01:01:01.000Z"
    }
    
    const response = {
        data,
        message: "Success create author"
    }
    expect(create(request)).toBe(JSON.stringify(response));
});