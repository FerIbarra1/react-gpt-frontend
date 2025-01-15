import { useEffect, useRef, useState } from 'react';

interface Props {
  show: boolean;
  imageUrl: string;
  alt: string;
  onImageSelected?: (imageUrl: string) => void;
  close: () => void;
}

export const Modal = ({ show, imageUrl, onImageSelected, close }: Props) => {
  const originalImageRef = useRef<HTMLImageElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    originalImageRef.current = image;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);

    // Obtener las coordenadas del mouse relativo al canvas
    const startX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const startY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // console.log({startX, startY});
    setCoords({ x: startX, y: startY });
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL('image/png');
    // console.log({ url });
    // https://jaredwinick.github.io/base64-image-viewer/
    onImageSelected && onImageSelected(url);
  };
  const onMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;

    const currentX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const currentY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // Calcular el alto y ancho del rectángulo
    const width = currentX - coords.x;
    const height = currentY - coords.y;

    const canvaWidth = canvasRef.current!.width;
    const canvaHeight = canvasRef.current!.height;

    // Limpiar el canva
    const ctx = canvasRef.current!.getContext('2d')!;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(originalImageRef.current!, 0, 0, canvaWidth, canvaHeight);

    // Dibujar el rectangulo, pero en este caso, limpiaremos el espacio
    // ctx.fillRect(coords.x, coords.y, width, height);
    ctx.clearRect(coords.x, coords.y, width, height);
  };

  const resetCanvas = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(
      originalImageRef.current!,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );

    onImageSelected && onImageSelected(imageUrl);
  };
  return (
    <div
      className={`${
        !show && 'hidden'
      } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full rounded-xl fade-in`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white dark:bg-[#2f2f2f] rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-[#202020] dark:text-white">
              Editor
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={close}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              className="rounded-xl"
            />
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-center gap-5">
            <button className="btn-primary" onClick={resetCanvas}>
              Borrar selección
            </button>
            <button className="btn-primary !bg-[#202020]" onClick={close}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
