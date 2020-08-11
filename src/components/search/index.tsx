import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

import { debounce } from 'utils/tools';

interface Props {
    defaultValue?: string;
    handleFocus?: (value: string) => void;
    handleChange: (value: string) => void;
    handleBlur?: (value: string) => void;
    placeholder?: string;
}

const GlobalSearch: React.FC<Props> = props => {
    const { placeholder } = props;
    
    const [keyWord, setKeyWord] = useState('');
    useEffect(() => {
        setKeyWord(props.defaultValue || '')
    }, [props.defaultValue])

    const debounceHandleChange: any = useRef();
    useEffect(() => {
        debounceHandleChange.current = debounce(props.handleChange)
    }, [props.handleChange])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyWord(value);
        debounceHandleChange.current(null, value)
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
        props.handleFocus && props.handleFocus(e.target.value)
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log(12, e.target.value, keyWord)
        props.handleBlur && props.handleBlur(e.target.value)
    }

    const handleEnter = () => {
        props.handleChange(keyWord)
    };
    return (
        <>
            <Input
                prefix={<SearchOutlined />}
                size='large'
                placeholder={placeholder || ''}
                value={keyWord}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onPressEnter={handleEnter}
            />
        </>

    );
}

export default GlobalSearch;