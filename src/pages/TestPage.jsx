import React from 'react';
import styled from 'styled-components';

const TestPage = () => {
    return (
        <div>
            <Text>Test Page</Text>
        </div>
    );
}

export default TestPage;

const Text = styled.span`
    color: #000000;
    font-size: 20px;
    font-weight: bold;
`;