import Markdown from 'react-markdown';

interface Props {
  text: string;
  audioUrl: string;
}

export const GptMessageAudio = ({ text, audioUrl }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#28a485] flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-white dark:bg-[#2f2f2f] pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown className="text-[#202020] dark:text-white">{text}</Markdown>
          <audio controls src={audioUrl} className="w-full" autoPlay />
        </div>
      </div>
    </div>
  );
};
