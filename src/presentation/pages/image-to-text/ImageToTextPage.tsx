import { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from '../../components';
import { imageToTextUseCase } from '../../../core/use-cases/image-generation/image-to-text.use-case';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ImageToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, imageFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const resp = await imageToTextUseCase(imageFile, text);
    setIsLoading(false);

    if (!resp) return;

    setMessages((prev) => [...prev, { text: resp.msg, isGpt: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes enviarme la imagen que desees y te generare una descripción." />
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
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aqui lo que deseas"
        accept="image/*"
      />
    </div>
  );
};
