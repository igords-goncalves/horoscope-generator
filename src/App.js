import styled from 'styled-components';
import { Wrapper } from './style'

function App() {

    const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

    return (
        <Wrapper>
            <Title>Hello World!</Title>
        </Wrapper>
    );
}

export default App;
