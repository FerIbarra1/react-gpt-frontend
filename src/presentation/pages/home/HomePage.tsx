import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Tranquiluxe } from "uvcanvas";
import animationData from "../../../assets/animation.json";

export const HomePage = () => {

    let navigate = useNavigate();

    const onHandleNavigation = () => {
        navigate('dashboard/orthography');
    }

    return (
        <div className="w-full h-[100vh]">
            <Tranquiluxe />
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 z-10 px-4 md:px-0">
                <div className="bg-white text-[#323232] p-12 shadow-2xl rounded-xl flex flex-col items-center justify-center animate-fade-in">
                    <Lottie
                        animationData={animationData}
                        className="w-72 mb-8"
                    />
                    <h1 className="text-4xl font-extrabold text-center">¡Bienvenido a <span className="text-white bg-[#EC0932] rounded px-2">GPT</span> !</h1>
                    <p className="text-center font-bold mt-4">
                        Explora nuestras herramientas impulsadas por IA para mejorar tu productividad.
                    </p>
                    <button onClick={onHandleNavigation} className="btn-primary mt-4">
                        Acceder al Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}
