import * as React from 'react'
const ShadowWhiteBox = (props) => {
  return (
    <div className={`box rounded-small ${props.className}`}>
      {props.children}
      <style jsx>{`
        .box {
          background: #ffffff;
          box-shadow: var(--shadow-small);
          padding: 24px;
        }
      `}</style>
    </div>
  )
}
export default ShadowWhiteBox
