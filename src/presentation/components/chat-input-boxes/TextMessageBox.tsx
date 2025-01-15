import { FormEvent, useState } from 'react';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  disabled?: boolean;
  stop?: () => void;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  disabled = false,
}: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setMessage('');
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white dark:bg-[#2f2f2f] w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-[#EC0932] dark:bg-[#2f2f2f] dark:text-white pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="ml-4">
        {!disabled ? (
          <button className="btn btn-primary">
            <span className="mr-2">Enviar</span>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={stop}>
            <span className="mr-2">Detener</span>
            <i className="fa-solid fa-stop"></i>
          </button>
        )}
      </div>
    </form>
  );
};
