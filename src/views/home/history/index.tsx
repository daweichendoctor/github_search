import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import styles from './index.module.scss';

interface Props extends RouteComponentProps {
    historyList: string[];
    handleClickHistory: (value: string) => void;
}

const History = function (props: Props) {
    console.log('history component props', props)
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

export default withRouter(History)