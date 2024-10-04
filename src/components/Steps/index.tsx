import { CardStepProps } from "@/types/interface";

const Step = ({ isLastStep, isActive, isCompleted, desk }: CardStepProps) => {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative flex items-center justify-center w-full">
                <div
                    className={`h-6 w-6 md:h-12 md:w-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-50
                    ${isActive || isCompleted ? "bg-blue-500 text-white border-blue-500 shadow-lg" : "bg-gray-200 text-gray-500 border-gray-300"}`}
                >
                    <svg className="w-2 h-2 md:w-4 md:h-4" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="6" fill="white" />
                    </svg>
                </div>

                {/* Garis penghubung */}
                {!isLastStep && (
                    <div className="absolute left-1/2 top-1/2 w-full h-1 bg-gray-300 transform -translate-y-1/2">
                        <div
                            className={`h-full bg-blue-500 transition-all duration-1000 ease-in-out 
                            ${isCompleted ? "w-full" : "w-0"}`}
                        ></div>
                    </div>
                )}
            </div>

            {/* Step Description */}
            <div className="mt-4 text-center">
                <p className={`text-xs md:text-sm transition-colors duration-300 ${isActive || isCompleted ? "text-blue-500" : "text-gray-500"}`}>
                    {desk}
                </p>
            </div>
        </div>
    );
};

export default Step;
