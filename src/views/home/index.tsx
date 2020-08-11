import React from 'react';
import { message, Spin } from 'antd';
import QueueAnim from 'rc-queue-anim';

import HomeApi, { SearchData } from 'service/home';
import { Search } from 'components';
import List from './github-list';
import History from './history';
import styles from './index.module.scss';

enum ShowStatus {
    'list',
    'history',
    'none',
}
export default class extends React.Component {
    currentDom: any = null;
    state = {
        searchData: {
            repositoryCount: 0,
            nodes: [],
        } as SearchData,
        histroyData: [],
        showStatus: ShowStatus.none,
        loading: false,
        historyList: [] as string[],
        defaultKeyWord: '',
    }
    componentDidMount() {
        HomeApi.getViewer().catch(err => {
            message.error('github链接失败，请刷新或更新token---error' + err)
        });
        const historyList = JSON.parse(localStorage.getItem('historyList') || '[]');
        this.setState({ historyList });
        this.currentDom = document.getElementById('searchBox');
    }

    getSearchData = async (keyWord: string) => {
        this.setState({ loading: true });
        const data: SearchData = await HomeApi.getSearchData(keyWord);
        console.log('keyword:', keyWord, 'data', data);
        this.setState({ loading: false, searchData: data })
    }

    handleChange = (keyWord: string) => {
        if (keyWord) {
            this.setState({ showStatus: ShowStatus.list }, () => this.getSearchData(keyWord));
            this.saveHistory(keyWord);
        } else {
            this.setState({ showStatus: ShowStatus.history });
        }

    }
    handleFocus = (keyWord: string) => {
        if (keyWord) {
            this.setState({ showStatus: ShowStatus.list })
        } else {
            this.setState({ showStatus: ShowStatus.history })
        }
    }

    saveHistory = (value: string) => {
        const { historyList } = this.state;
        if (historyList.includes(value)) {
            // 将value提前 去重
            let newHistoryList = [...new Set([value, ...historyList])];
            this.setState({ historyList: newHistoryList }, () => {
                localStorage.setItem('historyList', JSON.stringify(this.state.historyList))
            })
        } else {
            this.setState({ historyList: [value, ...historyList] }, () => {
                localStorage.setItem('historyList', JSON.stringify(this.state.historyList))
            })
        }
    }

    handleClickHistory = (history: string) => {
        this.setState({ defaultKeyWord: history });
        this.handleChange(history);
        this.saveHistory(history);
    }

    handlePageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (this.currentDom && !this.currentDom.contains(e.target)) {
            // 收起弹窗
            this.setState({ showStatus: ShowStatus.none })
        }
    }

    render() {
        const { showStatus, loading, historyList, defaultKeyWord } = this.state;
        return <div className={styles.container} onClick={this.handlePageClick}>
            <div className={styles.pageBox} id="searchBox">
                <Search
                    placeholder='search on github repository'
                    defaultValue={defaultKeyWord}
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                />

                <QueueAnim
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, -50] }, // 进场
                        { opacity: [1, 0], translateY: [0, -50] } // 出场
                    ]}>
                    {
                        showStatus !== ShowStatus.none && [
                            <div className={styles.dropBox} key="search">
                                {
                                    showStatus === ShowStatus.history && <History
                                        historyList={historyList}
                                        handleClickHistory={this.handleClickHistory}
                                    />
                                }
                                {
                                    showStatus === ShowStatus.list && <Spin spinning={loading}>
                                        <div className={styles.searchBox}>
                                            {!loading && <List data={this.state.searchData} />}
                                        </div>
                                    </Spin>
                                }
                            </div>]
                    }
                </QueueAnim>
            </div>
        </div>
    }
}