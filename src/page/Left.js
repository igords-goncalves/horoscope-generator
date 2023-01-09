import styled from "styled-components";
import elements from "../assets/img/3D_elements/3d_elements.png";

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    height: 100vh;
    width: 50vw;
    background: #E6E7F0;
    background-image: url(${elements});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left;
`;

export default Left;