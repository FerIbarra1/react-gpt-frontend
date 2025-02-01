import { useState } from 'react';
import {
  GptMessage,
  GptMessageImage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from '../../../core/use-cases';
import { Modal } from '../../components/modal/Modal';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleShow = () => {
    setShow(!show);
  };

  const handleVariation = async () => {
    setIsLoading(true);
    const resp = await imageVariationUseCase(originalImageAndMask.original!);
    setIsLoading(false);

    if (!resp) return;

    setMessages((prev) => [
      ...prev,
      {
        text: 'Variación',
        isGpt: true,
        info: { imageUrl: resp.url, alt: resp.alt },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { original, mask } = originalImageAndMask;

    const imageInfo = await imageGenerationUseCase(text, original, mask);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { text: 'No se pudo generar la imagen.', isGpt: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text,
        isGpt: true,
        info: { imageUrl: imageInfo.url, alt: imageInfo.alt },
      },
    ]);
  };

  return (
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in bg-white dark:bg-[#2f2f2f] p-3 shadow-xl rounded-xl">
          <span className="text-[#202020] dark:text-white font-semibold">Editando</span>
          <img
            src={originalImageAndMask.mask ?? originalImageAndMask.original}
            alt="Imagen Original"
            className="border rounded-xl w-36 h-36 object-contain"
          />
          <button
            onClick={handleShow}
            className="btn-primary mt-2 !bg-[#202020]"
          >
            Abrir Editor
          </button>
          <button onClick={handleVariation} className="btn-primary mt-2">
            Generar Variación
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text="Hola, ¿Que imagen deseas editar hoy?" />
            {messages.map((message, i) =>
              message.isGpt ? (
                <GptMessageImage
                  key={`${i}-image`}
                  text={message.text}
                  imageUrl={message.info?.imageUrl!}
                  alt={message.info?.alt!}
                  onImageSelected={(url) =>
                    setOriginalImageAndMask({
                      original: url,
                      mask: undefined,
                    })
                  }
                />
              ) : (
                // <GptMessageSelectableImage
                //   key={i}
                //   text={message.text}
                //   imageUrl={message.info?.imageUrl!}
                //   alt={message.info?.alt!}
                //   onImageSelected={(maskImageUrl) =>
                //     setOriginalImageAndMask({
                //       original: message.info?.imageUrl!,
                //       mask: maskImageUrl,
                //     })
                //   }
                // />
                <MyMessage key={i} text={message.text} />
              )
            )}
            {messages.map(
              (message, i) =>
                message.isGpt && (
                  <Modal
                    key={`${i}-modal`}
                    show={show}
                    imageUrl={message.info?.imageUrl!}
                    alt={message.info?.alt!}
                    onImageSelected={(maskImageUrl) =>
                      setOriginalImageAndMask({
                        original: message.info?.imageUrl!,
                        mask: maskImageUrl,
                      })
                    }
                    close={handleShow}
                  />
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
        />
      </div>
    </>
  );
};
