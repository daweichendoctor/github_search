import React from 'react';

import styles from './index.module.scss';

interface Props {
    historyList: string[];
    handleClickHistory: (value: string) => void;
}

export default function (props: Props) {
    const { historyList, handleClickHistory } = props;
    return <div className={styles.container}>
        <header>历史记录</header>
        <ul>
            {
                historyList.map((history: string, index: number) => <li key={index} onClick={() => handleClickHistory(history)}>{history}</li>)
            }
        </ul>
    </div>
}