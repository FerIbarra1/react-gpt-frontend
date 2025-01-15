import { useState } from "react";

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}

export const ModalSignUp = ({ show, setShow }: Props) => {

    const [validation, setValidation] = useState('');

    const handleValidation = () => {
        if (validation === '1234IbarraFernando') {
            setShow(false);
        } else {
            alert('Contraseña incorrecta');
        }
    }

    return (
        <div
            className={`${!show && 'hidden'
                } overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 px-8 md:px-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full rounded-xl fade-in`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <form className="relative bg-white dark:bg-[#2f2f2f] rounded-lg shadow" onSubmit={(e) => { e.preventDefault(); handleValidation(); }}>
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                        <h3 className="text-xl font-semibold text-[#202020] dark:text-white">
                            Ingresa la contraseña
                        </h3>
                    </div>

                    <div className="p-4 md:p-5 space-y-4 text-center">

                        <p>Para poder utilizar la página es necesario que ingreses la contraseña.</p>
                        <input
                            type="password"
                            autoFocus
                            name="validation"
                            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-[#EC0932] dark:bg-[#2f2f2f] dark:text-white pl-4 h-10"
                            placeholder="Contraseña"
                            value={validation}
                            onChange={(e) => setValidation(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center p-4 md:p-5 border-gray-200 rounded-b justify-center gap-5">
                        <button className="btn-primary" type="submit">
                            Acceder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
