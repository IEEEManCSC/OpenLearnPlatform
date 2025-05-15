type progress = {
  progress: number;
  topicName?: string;
  type?: 'strengths' | 'weak';
  index?: number;
  hideLabel?: boolean;
  height?: number;
  bgColor?: string;
};

const ProgressBar = ({
  progress,
  topicName,
  type,
  index,
  hideLabel,
  height = 4,
  bgColor = '#e5esb7',
}: progress) => {
  return (
    <div className="my-2">
      {!hideLabel &&
        topicName &&
        (type === 'strengths' ? (
          <h5 className="flex items-center gap-3 max-xl:text-[12px] max-sm:text-sm">
            {topicName}{' '}
            <span
              className={`bg-main-green-900 text-main-green-100 inline-block rounded-xl px-2 py-1 text-xs`}
            >
              {progress + '%'}
            </span>{' '}
          </h5>
        ) : (
          <h5 className="flex items-center gap-3 max-xl:text-[12px] max-sm:text-sm">
            {index !== undefined && `Topic ${index + 1} : `}
            {topicName}
            <span className="bg-danger-900 text-danger-100 inline-block rounded-xl px-2 py-1 text-xs">
              {progress + '%'}
            </span>{' '}
          </h5>
        ))}
      <div className="pt-2">
        <div
          className={`h-1 w-full overflow-hidden rounded-full bg-gray-200`}
          style={{ height: `${height}px`, backgroundColor: `#${bgColor}` }}
        >
          <div
            className={`bg-IEEEorange h-full rounded-e-4xl ${type === 'strengths' && 'bg-main-green-100'} ${type === 'weak' && 'bg-danger-100'} `}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
