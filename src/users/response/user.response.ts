export const createUserResponse = {
    success : true,
    data : {
        id: 1,
        name: "John Doe",
        age: 26,
        updatedAt: "2022-06-16T05:22:21.938Z",
        createdAt: "2022-06-16T05:22:21.938Z"
    }
}

export const getAllUsersResponse = {
    success : true,
    data : [
        {
            id: 1,
            name: "John Doe",
            age: 26,
            updatedAt: "2022-06-16T05:22:21.938Z",
            createdAt: "2022-06-16T05:22:21.938Z"
        }
    ]
}

export const deleteUserResponse = {
    success : true,
    message : "deleted"
}

export const getOneUserResponse = {
    success : true,
    data : {
        id: 1,
        name: "John Doe",
        age: 26,
        updatedAt: "2022-06-16T05:22:21.938Z",
        createdAt: "2022-06-16T05:22:21.938Z",
        posts : [
            {
                id : 1,
                text : "hello world",
                userId : 1,
                updatedAt: "2022-06-16T05:22:21.938Z",
                createdAt: "2022-06-16T05:22:21.938Z",
            }
        ]
    }
}