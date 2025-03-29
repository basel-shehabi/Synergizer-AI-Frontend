import { useState, useEffect } from 'react';
import { createNewThread, fetchThread } from "../apis/brainstorm-apis";
import { runFinishedStates } from "../constants/constants";
import axios from 'axios';

export const useThread = (run, setRun) => {
    const [threadId, setThreadId] = useState(undefined);
    const [thread, setThread] = useState(undefined);
    const [actionMessages, setActionMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sample, setsample] = useState([]);
    const [userProfileData, setUserProfileData] = useState();

    // This hook is responsible for creating a new thread if one doesn't exist
    useEffect(() => {
        if (threadId === undefined) {
            const localThreadId = localStorage.getItem("thread_id");
            if (localThreadId) {
                console.log(`Resuming thread ${localThreadId}`);
                setThreadId(localThreadId);
                fetchThread(localThreadId).then(setThread);
            } else {
                console.log("Creating new thread");
                const user_id = JSON.parse(localStorage.getItem("user_id"));
                axios.get(`http://127.0.0.1:8000/get_user_profile?user_id=${user_id}`).then((response) => {
                    console.log('in createThread');
                    console.log(response);
                    setUserProfileData(response.data.user_data);
                    if (response.data.user_data) {
                        createNewThread(response.data.user_data).then((data) => {
                            setRun(data);
                            setThreadId(data.thread_id);
                            localStorage.setItem("thread_id", data.thread_id);
                            console.log(`Created new thread ${data.thread_id}`);
                        });
                    }
                })
            }
        }
    }, [threadId, setThreadId, setThread, setRun]);

    // This hook is responsible for fetching the thread when the run is finished
    useEffect(() => {
        if (!run || !runFinishedStates.includes(run.status)) {
            return;
        }

        console.log(`Retrieving thread ${run.thread_id}`);
        fetchThread(run.thread_id)
            .then((threadData) => {
                setThread(threadData);
            });
    }, [run, runFinishedStates, setThread]);

    // This hook is responsible for transforming the thread into a list of messages
    useEffect(() => {
        if (!thread) {
            return;
        }
        console.log(`Transforming thread into messages`);

        let newMessages = [...thread.messages, ...actionMessages]
            .sort((a, b) => a.created_at - b.created_at)
            .filter((message) => message.hidden !== true)
        setMessages(newMessages);

        let samplemsg = []
        if(sample.length>0){
            let last = sample.length - 1;
            samplemsg = newMessages.filter((m) => m.created_at > sample[last].created_at)
        }
        else{
            samplemsg = newMessages;
        }
        
        setsample([...sample,...samplemsg])
    }, [thread, actionMessages, setMessages]);

    const clearThread = () => {
        localStorage.removeItem("thread_id");
        setThreadId(undefined);
        setThread(undefined);
        setRun(undefined);
        setMessages([]);
        setsample([]);
        setActionMessages([]);
    }

    return {
        threadId,
        messages,
        setMessages,
        clearThread,
        sample,
        setsample
    };
};
