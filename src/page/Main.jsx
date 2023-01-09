import { Image } from "../components/image/Image";
import Left from "./Left";
import Right from "./Right";
import Wrapper from "./Wrapper ";

export const Main = () => {
    return (
        <Wrapper>
            <Left>
                <Image />
            </Left>
            <Right>
                {/* ... */}

            </Right>
        </Wrapper>
    );
};
