import * as React from 'react'

const SectionTitle = (props) => {
  return (
    <div className="SectionTitle">
      <div className="item title bold">{props.children}</div>
      <style jsx>{`
        .SectionTitle {
          display: flex;
          margin-bottom: 18px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ecf0f1;
        }
        .title {
          font-size: ${props.size || '14px'};
        }
        .item {
          display: block;
          width: 100%;
          line-height: 120%;
          flex: none;
        }
        .item.link {
          margin-left: auto;
          color: var(--sub-text-color);
        }
      `}</style>
    </div>
  )
}
export default SectionTitle
