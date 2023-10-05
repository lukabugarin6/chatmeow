import styled from 'styled-components'

function LoadingScreen() {
  return (
    <Wrapper>
        <div className='lds-dual-ring'></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default LoadingScreen