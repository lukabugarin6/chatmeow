import styled from "styled-components"

function TwoColLayout({ children }) {
  return (
    <Wrapper>
        <Col>
            <ColBgImg src="/images/chatmeowcolimg.png" />
        </Col>
        <Col>
            <ColChildrenContent>
                {children}
            </ColChildrenContent>
        </Col>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
`

const Col = styled.div`
    flex: 1;
    position: relative;
    min-height: 100vh;
`

const ColBgImg = styled.img`
    position: absolute;
    inset: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
`

const ColChildrenContent = styled.div`
    padding: 40px;
    padding-right: 20%;
    
`

export default TwoColLayout