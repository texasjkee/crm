import styled from "@emotion/styled";

function Header() {
    return (
        <HeaderWrapper>
            <h1>CRM</h1>
        </HeaderWrapper>
    );
}

export default Header;

const HeaderWrapper = styled("div")`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--yellow);
`;
