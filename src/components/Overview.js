import styled from 'vue-styled-components'

export const Overview = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`

export const OverviewRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
  &:first-child {
    border-top: 1px solid #dfdfdf;
  }
`

export const OverviewColumn = styled.div`
display: flex;
padding: 4px;
flex: 1;
border-right: 1px solid #dfdfdf;
align-items: center;
justify-content: center;
&:first-child {
  flex 2;
  border-left: 1px solid #dfdfdf;
  justify-content: flex-start;
}
`

export const OverviewTitle = styled.h2`
  font-size: 14px;
`
export default Overview
