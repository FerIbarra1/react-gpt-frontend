interface Props {
  userScore: number;
  errors: string[];
  message: string;
}

export const GptOrthographyMessage = ({
  userScore,
  errors,
  message,
}: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#28a485] flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-white dark:bg-[#2f2f2f] pt-3 pb-2 px-4 shadow rounded-xl">
          <h3 className="text-3xl text-[#202020] dark:text-white font-semibold">Puntaje: <span className="text-[#28a485]">{userScore}</span> %</h3>
          <p className="text-[#202020] dark:text-white">{message}</p>
          {errors && errors.length === 0 ? (
            <p>No se encontraron errores, perfecto!</p>
          ) : (
            <>
              <h3 className="text-2xl text-[#202020] dark:text-white font-semibold">Errores encontrados:</h3>
              <ul>
                {errors.map((error, i) => (
                  <li key={i} className="text-[#202020] dark:text-white">{error}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
