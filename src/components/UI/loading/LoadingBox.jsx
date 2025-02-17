import styles from './css/LoadingBox.module.css'

const LoadingBox = ({ className, content }) => {
    return (
        <div className={`${styles.scene} ${className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center`}>
            <div className={styles.cube}>
                <div className={`${styles.face} ${styles.front}`}/>
                <div className={`${styles.face} ${styles.back}`}/>
                <div className={`${styles.face} ${styles.right}`}/>
                <div className={`${styles.face} ${styles.left}`}/>
                <div className={`${styles.face} ${styles.top}`}/>
                <div className={`${styles.face} ${styles.bottom}`}/>
            </div>
            <p className="mt-5 text-[min(5vw,12px)] font-medium uppercase tracking-wide text-center">
                {content || 'Loading ...'}
            </p>
        </div>
    )
}

export default LoadingBox
