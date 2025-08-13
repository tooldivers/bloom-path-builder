import { CheckCircle, Circle } from "lucide-react";

interface OnboardingStepsProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingSteps({ currentStep, totalSteps }: OnboardingStepsProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${isCompleted ? 'bg-mm-mint text-white' : 
                isCurrent ? 'bg-mm-primary text-white' : 
                'bg-gray-200 text-gray-500'}
            `}>
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < totalSteps && (
              <div className={`
                w-8 h-0.5 mx-2
                ${stepNumber < currentStep ? 'bg-mm-mint' : 'bg-gray-200'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}
