import { Image } from "../components/image/Image";
import Title from "../components/title";
import Left from "./Left";
import Right from "./Right";
import Wrapper from "./Wrapper ";

export const Main = () => {
    return (
        <Wrapper>
            <Left>
                <Image />
                <Title />
            </Left>
            <Right>
                {/* ... */}

            </Right>
        </Wrapper>
    );
};
