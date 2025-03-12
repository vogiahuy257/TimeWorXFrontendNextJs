import styles from './css/LoadingSmall.module.css';

const LoadingSmall = ({ content }) => {
    return (
        <div className={`flex flex-col items-center z-50 justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <div className={`w-10 h-10 border-4 rounded-lg ${styles.loader}`} />
            <div className="mt-2">
                <span className="text-[min(5vw,14px)] font-normal tracking-wide text-center">{content || "Please wait..."}</span>
            </div>
        </div>
    );
};

export default LoadingSmall;
