import React from 'react';
import { StarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { SearchData, GithubNode } from 'service/home';
import { openPage, formatNum } from 'utils/tools';
import styles from './index.module.scss';

export default function ({ data }: { data: SearchData }) {
    const { repositoryCount, nodes } = data;
    return (
        <div className={styles.container}>
            <header>{repositoryCount} repository results </header>
            <section>
                <ul>
                    {
                        nodes.map((node: GithubNode) => {
                            const { databaseId, description, issues, nameWithOwner, url, stargazers, repositoryTopics } = node;
                            return <li key={databaseId}>
                                <div>
                                    <span className={styles.title} onClick={() => openPage(url)}>{nameWithOwner}</span>
                                    <span onClick={() => openPage(url + '/stargazers')}>
                                        <span><StarOutlined /></span>
                                        <span className="m-l-1x">{formatNum(stargazers.totalCount)}</span>
                                    </span>
                                    <span onClick={() => openPage(url + '/issues')}>
                                        <span><ExclamationCircleOutlined /></span>
                                        <span className="m-l-1x">{formatNum(issues.totalCount)}</span>
                                    </span>
                                </div>
                                <div>{description}</div>
                                <div className={styles.topic}>
                                    {
                                        repositoryTopics.nodes.map((topicInfo: { url: string, topic: { name: string } }, index: number) => {
                                            return <span key={index} onClick={() => openPage(topicInfo.url)}>{topicInfo.topic.name}</span>
                                        })
                                    }
                                </div>
                            </li>
                        })
                    }
                </ul>
            </section>
        </div>
    )
}