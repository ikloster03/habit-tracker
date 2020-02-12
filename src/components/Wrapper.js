import styled from 'vue-styled-components'

const wrapperProps = {
  display: String,
  position: String,
  align: String,
  direction: String,
  pt: String,
  pb: String,
  pl: String,
  pr: String,
  mt: String,
  mb: String,
  ml: String,
  mr: String,
}

const Wrapper = styled('div', wrapperProps)`
  display: ${props => (props.display ? props.display : 'flex')};
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props => (props.position ? props.position : 'center')};
  align-items: ${props => (props.align ? props.align : 'center')};
  padding-top: ${props => (props.pt ? props.pt : '')};
  padding-bottom: ${props => (props.pb ? props.pb : '')};
  padding-left: ${props => (props.pl ? props.pl : '')};
  padding-right: ${props => (props.pr ? props.pr : '')};
  margin-top: ${props => (props.mt ? props.mt : '')};
  margin-bottom: ${props => (props.mb ? props.mb : '')};
  margin-left: ${props => (props.ml ? props.ml : '')};
  margin-right: ${props => (props.mr ? props.mr : '')};
`

export default Wrapper
