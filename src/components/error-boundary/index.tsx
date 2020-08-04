import React from 'react';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // 你同样可以将错误日志上报给服务器
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary