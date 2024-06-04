import { FC, ReactNode } from 'react';
import { Card } from './Card';
import { Spinner } from './Spinner';
import { GrValidate } from 'react-icons/gr';

interface StepProgresProps {
  steps: {
    title: string;
    description: string;
    icon?: ReactNode;
  }[];
  selectedStep: number;
  status: 'success' | 'failure';
}

export const StepProgress: FC<StepProgresProps> = ({
  steps,
  selectedStep,
  status,
}) => {
  return (
    <Card className="w-full h-auto">
      <div className="p-10">
        <div className="flex flex-row justify-start items-start gap-1">
          {steps.map((step, index) => (
            <>
              <div className="text-center px-6 flex justify-center items-center flex-col gap-2 ">
                <div
                  className={`rounded-lg flex items-center justify-center border border-gray-200 ${
                    index < selectedStep
                      ? 'bg-green-100'
                      : index === selectedStep && status === 'failure'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="bg-transparent h-20 flex items-center justify-center icon-step">
                    {step.icon}
                  </div>
                  <div className="w-2/3 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                    <h2 className="font-bold text-sm">{step.title}</h2>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index === selectedStep && status === 'failure' && (
                  <div className="text-red-500">Failed</div>
                )}
                {index === selectedStep && status === 'success' && <Spinner />}
              </div>
              <div className="flex-1 flex items-center justify-center self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" />
                </svg>
              </div>
            </>
          ))}
          <div className=" flex items-center justify-center py-5">
            <GrValidate fontSize={55} />
          </div>
        </div>
      </div>
    </Card>
  );
};
