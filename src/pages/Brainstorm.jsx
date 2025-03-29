import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useThread } from '../hooks/useThread';
import { useRunPolling } from '../hooks/useRunPolling';
import { useRunStatus } from '../hooks/useRunStatus';
import { postMessage } from '../apis/brainstorm-apis';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';

const Brainstorm = () => {
    const [run, setRun] = useState(undefined);
    const [input, setInput] = useState('');
    const [dialog, setDialog] = useState(false);
    const [processedSample, setProcessedSample] = useState([]);
    const [rowSize, setRowSize] = useState(1);

    const { threadId, messages, setMessages, clearThread, sample } = useThread(run, setRun);
    const { status, processing } = useRunStatus(run);

    useRunPolling(threadId, run, setRun);

    const chatContainerRef = useRef(null);

    const sendMessage = useCallback(() => {
      if (!input.trim()) return;
      setMessages((prev) => [...prev, { content: input, role: 'user' }]);
      postMessage(threadId, input).then(setRun);
      setInput('');
    }, [input, threadId, setMessages]);

    const stripBracketsFromLastMessage = useCallback((messages) => {
      if (messages.length === 0) return messages;
      let lastMessage = messages[messages.length - 1];
      let strippedMessage = lastMessage.content.replace(/\[.*?\]/g, '');
      return [...messages.slice(0, -1), { ...lastMessage, content: strippedMessage }];
    }, []);

    useEffect(() => {
      setProcessedSample(stripBracketsFromLastMessage(sample));
    }, [sample, stripBracketsFromLastMessage]);

    // Auto-scroll when messages update
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [processedSample]);

    // Dynamically adjust row size based on input length
    useEffect(() => {
      setRowSize(Math.min(5, Math.round(input.length / 105) + 1)); // Max 5 rows
    }, [input]);

    return (
      <div className='w-full'>
        <div className='flex justify-center mt-4'>
          <div className='flex justify-center items-center w-2/3 text-sm bg-[#ed7d2d] rounded-lg py-4 text-white space-x-4'>
            <i className='fa-solid fa-circle-info'></i>
            <p>Synergizer AI can make mistakes and cannot provide legal advice. Please validate the information provided and use it at your discretion.</p>
          </div>
        </div>

        <section className='flex justify-center h-screen'>
          <div className="flex flex-col h-3/4 w-2/3 mt-4 border-2 shadow-lg rounded-lg">
            <div ref={chatContainerRef} id="chat-container" className="w-full p-4 space-y-4 flex-grow overflow-y-auto">
              {processedSample.map((msg, index) => (
                <div key={index} className={`py-2 px-4 rounded-lg max-w-fit ${msg.role === 'user' ? 'bg-orange-500 text-white ml-auto' : 'bg-amber-700 text-white mr-auto'}`}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkMath]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ))}
            </div>

            {processing && status && (
              <div role="status" className='flex space-x-4 items-center px-8 py-2 animate-pulse'>
                <svg aria-hidden="true" className="w-8 h-8 text-gray-500 animate-spin fill-orange-500" viewBox="0 0 100 101">
                  <path d="M100 50.59C100 78.21 77.61 100.59 50 100.59S0 78.21 0 50.59 22.39 0.59 50 0.59 100 22.98 100 50.59Z" fill="currentColor" />
                  <path d="M93.97 39.04C96.39 38.4 97.86 35.91 97.01 33.55C95.29 28.82 92.87 24.37 89.82 20.35C85.85 15.12 80.88 10.72 75.21 7.41C69.54 4.1 63.28 1.94 56.77 1.05C51.77 0.37 46.7 0.45 41.73 1.28C39.26 1.69 37.81 4.2 38.45 6.62C39.09 9.05 41.57 10.47 44.05 10.11C47.85 9.55 51.72 9.53 55.54 10.05C60.86 10.78 65.99 12.55 70.63 15.26C75.27 17.96 79.33 21.56 82.58 25.84C84.92 28.91 86.8 32.29 88.18 35.88C89.08 38.22 91.54 39.68 93.97 39.04Z" fill="currentFill" />
                </svg>
                <div className='text-orange-500 text-xl'>{status}</div>
              </div>
            )}

            <div className="flex space-x-2 items-center p-4 border-t border-gray-200">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={rowSize}
                className="w-5/6 max-h-28 p-2 rounded-lg border border-gray-300 resize-none"
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="p-2 w-1/6 rounded-lg bg-orange-500 text-white">Send</button>
              <button onClick={() => setDialog(true)} className="p-2 w-1/6 rounded-lg bg-red-500 text-white">Clear Chat</button>
            </div>

            {dialog && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
                  <p className="mb-4">Are you sure you want to clear the chat?</p>
                  <div className="flex justify-end">
                    <button onClick={() => setDialog(false)} className="bg-gray-300 text-black py-2 px-4 rounded mr-2">Cancel</button>
                    <button onClick={() => { clearThread(); setDialog(false); }} className="bg-red-500 text-white py-2 px-4 rounded">Yes, Clear</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
};

export default Brainstorm;