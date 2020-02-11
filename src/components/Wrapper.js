import styled from 'vue-styled-components'

const wrapperProps = { position: String, align: String, direction: String }

const Wrapper = styled('div', wrapperProps)`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props => (props.position ? props.position : 'center')};
  align-items: ${props => (props.align ? props.align : 'center')};
`

export default Wrapper
