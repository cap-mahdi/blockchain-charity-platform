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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z" />
                    </svg>
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
