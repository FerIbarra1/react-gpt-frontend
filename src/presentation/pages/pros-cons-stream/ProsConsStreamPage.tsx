import { useRef, useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';
import { proConsDiscusserStreamGeneratorUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [responseRunning, setResponseRunning] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setResponseRunning(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const stream = proConsDiscusserStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((messages) => [...messages, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    setResponseRunning(false);
    isRunning.current = false;
  };

  const handleStop = () => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
      setResponseRunning(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, ¿Que deseas comparar hoy?." />
          {messages.map((message, i) =>
            message.isGpt ? (
              <GptMessage key={i} text={message.text} />
            ) : (
              <MyMessage key={i} text={message.text} />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas"
        disableCorrections
        disabled={responseRunning}
        stop={handleStop}
      />
    </div>
  );
};
