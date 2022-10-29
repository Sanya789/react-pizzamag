import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block" 
    speed={1}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="143" cy="125" r="125" /> 
    <rect x="1" y="267" rx="11" ry="11" width="280" height="30" /> 
    <rect x="1" y="308" rx="11" ry="11" width="280" height="88" /> 
    <rect x="1" y="409" rx="8" ry="8" width="95" height="30" /> 
    <rect x="123" y="410" rx="15" ry="15" width="152" height="42" />
  </ContentLoader>
)

export default Skeleton

