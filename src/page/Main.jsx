import Footer from "../components/footer";
import Image from "../components/image";
import Title from "../components/title";
import Left from "./Left";

import Right from "./Right";
import Wrapper from "./Wrapper ";

export const Main = () => {
    return (
        <Wrapper>
            <Left>
                <Image />
                <Title title='Horoscope Generator' />
                <Footer />
            </Left>
            <Right>
                <Title title='Your data' />

            </Right>
        </Wrapper>
    );
};
