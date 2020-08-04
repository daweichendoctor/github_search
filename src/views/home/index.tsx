import React from 'react';
import { Button } from 'antd';

import HomeApi from 'service/home';

export default class extends React.Component {
    componentDidMount() {
        HomeApi.getViewer(`{ viewer { login }}`).then(data => {
            console.log(333, data)
        })
    }
    render() {
        console.log(this.props)
        return <>
            <Button type="primary">confirm</Button>
        </>
    }
}