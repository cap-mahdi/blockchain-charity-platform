import React from 'react';
interface LabelType {
  text: string;
  size?: number | string;
}
interface PropsType {
  barStyle?: string;
  progressStyle?: string;
  commonStyle?: string;
  width?: number | string;
  height?: number | string;
  percentage?: number;
  label?: LabelType;
}
export function ProgressBar({
  barStyle = '',
  progressStyle = '',
  commonStyle = '',
  width = 250,
  height = 22,
  percentage = 0.3,
  label = { text: '', size: '20px' },
}: PropsType) {
  const progressWidth = percentage + '%';
  const styles = {
    common: `  rounded-[12px] `,
    blankBar: `  bg-gray absolute `,
    progressBar: ` bg-blue absolute  `,
  };

  return (
    <div className="relative flex flex-col">
      <div style={{ height, width }}>
        <div
          style={{ width, height }}
          className={styles.common + styles.blankBar + commonStyle + barStyle}
        ></div>
        {percentage > 0.1 ? (
          <div
            style={{ width: progressWidth, height }}
            className={
              styles.common + styles.progressBar + commonStyle + progressStyle
            }
          ></div>
        ) : (
          ''
        )}
      </div>
      <h5
        style={{ fontSize: label.size }}
        className="px-2 text-dark-gray font-medium"
      >
        {label.text}
      </h5>
    </div>
  );
}
