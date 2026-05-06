// create a a function that uses fetch to fetch user data 

const BASE_URL = "http://localhost:3000"

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`)

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// create a a function that uses fetch to fetch posts data
export const fetchPostsData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching posts data:", error);
  }
}


// create a function to add a new user using fetch 

export const addUser = async (userDetails) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error adding user:", error);
    }
}