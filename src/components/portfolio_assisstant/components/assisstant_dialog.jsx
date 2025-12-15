'use client';
import { useEffect, useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';
import qaApi from '@/lib/qaApi';
import { TypeAnimation } from 'react-type-animation';
import Lottie from "lottie-react";

const DEFAULT_PROMPTS = [
  "About Alisher",
  "Alisher’s tech stack",
  "Describe Alisher’s projects",
  "Alisher’s educational background?",
  "How do you work?",
  "What experience does Alisher have?"
];

const AssistantDialog = ({ open, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [apiAwake, setApiAwake] = useState(false);
  const [wakingUp, setWakingUp] = useState(false);

  useEffect(() => {
    setWakingUp(true);
    qaApi.get('/', { timeout: 25000 }).then((res) => {
      if(res.data.status === 200){
        setApiAwake(true);
      } else {
        qaApi.get('/', { timeout: 15000 }).then((res) => {
          if(res.data.status === 200){
            setApiAwake(true);
          }
        })
      }
    }).catch((err) => {
      console.log("API wake up logic failed", err);
    }).finally(() => {
      setWakingUp(false);
    })
  }, [open])

  const askQuestion = async (autoQuest) => {
    const finalQuestion =
      typeof autoQuest === 'string' ? autoQuest : question;

    if (!finalQuestion.trim()) return;

    setQuestion(finalQuestion);
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await qaApi.post('/api/ask', { question: finalQuestion }, { timeout: 20000 });
      setAnswer(res.data.answer);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setQuestion('');
    setAnswer(null);
    setError(null);
    setLoading(false);
    setWakingUp(false);
    setApiAwake(false);
    onClose();
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-end sm:items-center justify-center
        transition-opacity duration-300
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={`
          relative w-full sm:max-w-4xl
          bg-gray-900 text-white
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl overflow-hidden
          transform transition-all duration-300
          ${open ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'}
        `}
      >
        <div className="sm:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold">Ask something</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <IoClose size={22} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row min-h-[420px]">
          <div className="hidden sm:flex w-1/3 bg-gray-800 p-6 flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <HiSparkles className="text-cyan-400" size={28} />
                <h2 className="text-xl font-semibold">Ask something</h2>
              </div>
              <p className="text-sm text-gray-400">
                I can help answer questions about Alisher’s education, experience, projects, and tech stack, or explain how I work.
              </p>
            </div>

            <div className="relative mt-6">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Type your question here…"
                rows={4}
                className="w-full resize-none rounded-lg bg-gray-900 border border-gray-700 p-3 pr-10 text-sm focus:outline-none"
              />

              {question && (
                <button
                  type="button"
                  onClick={() => setQuestion("")}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                  aria-label="Clear text"
                >
                  <IoClose size={18} />
                </button>
              )}
            </div>
            <button
              onClick={askQuestion}
              disabled={loading || !question.trim() || wakingUp}
              className="mt-4 w-full py-2 rounded-md text-sm bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50"
            >
              {wakingUp ? 'Assistant is waking up...' : 'Ask'}
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white cursor-pointer"
            >
              <IoClose size={28} />
            </button>

            <div className="sm:hidden">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask me about my projects, tech stack, or experience…"
                rows={3}
                className="w-full resize-none rounded-lg bg-gray-800 border border-gray-700 p-3 text-sm"
              />
              <button
                onClick={askQuestion}
                disabled={loading || !question.trim() || wakingUp}
                className="mt-3 w-full py-2 rounded-md text-sm bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50"
              >
                {wakingUp ? 'Assistant is waking up...' : 'Ask'}
              </button>
            </div>

            <div className="mt-4 sm:mt-0 flex-1 overflow-y-auto py-4 relative">
              {apiAwake && (
                <>
                  {!question.trim() && !wakingUp && (
                    <div className="flex flex-wrap gap-2 pointer-events-auto mb-4">
                      {DEFAULT_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => askQuestion(p)}
                          type="button"
                          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2.5 py-1.5 rounded-md"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}

                  {loading && (
                    <p className="text-sm text-cyan-400">Thinking…</p>
                  )}

                  {answer && (
                    <TypeAnimation
                      sequence={[answer]}
                      speed={90}
                      wrapper="p"
                      className="text-sm text-gray-300 leading-relaxed text-justify animate-fadeIn"
                      cursor={false}
                    />
                  )}

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}
                </>
              )}

              {!apiAwake && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Lottie
                      path="/lottie/loading-robot.json"
                      loop
                      autoplay
                      className="w-40 h-40"
                    />
                    <p className="text-sm text-gray-400">
                      Assistant is waking up…
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantDialog;
