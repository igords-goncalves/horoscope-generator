import Button from "../components/button";
import Footer from "../components/footer";
import Form from "../components/form";
import Image from "../components/image";
import Title from "../components/title";
import Left from "./Left";

import Right from "./Right";
import Wrapper from "./Wrapper ";


function handlerResults(e) {
    e.preventDefault();
    
    console.log('teste')
}

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
                <Form />
                <Button callback={handlerResults}/>
            </Right>
        </Wrapper>
    );
};
