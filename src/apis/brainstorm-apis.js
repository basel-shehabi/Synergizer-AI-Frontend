export const createNewThread = async (userProfileData) => {
    try {
        let response = await fetch("http://127.0.0.1:8000/api/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userProfileData),
        })
        return response.json()
    } catch (err) {
        console.log('createNewThread error')
        console.log(err.message)
    }
}

export const fetchThread = async (threadId) => {
    try {
        let response = await fetch(`http://127.0.0.1:8000/api/threads/${threadId}`)
        return response.json()
    } catch (err) {
        console.log(err.message)
    }
}

export const fetchRun = async (threadId, runId) => {
    try {
        let response = await fetch(`http://127.0.0.1:8000/api/threads/${threadId}/runs/${runId}`)
        return response.json()
    } catch (err) {
        console.log(err.message)
    }
}

export const postMessage = async (threadId, message) => {
    try {
        let response = await fetch(`http://127.0.0.1:8000/api/threads/${threadId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content: message})
        })
        return response.json()
    } catch (err) {
        console.log(err.message)
    }
}

export const postToolResponse = async (threadId, runId, toolResponses) => {
    try {
        let response = await fetch(`http://127.0.0.1:8000/api/threads/${threadId}/runs/${runId}/tool`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toolResponses)
        })
        return response.json()
    } catch (err) {
        console.log(err.message)
    }
}
