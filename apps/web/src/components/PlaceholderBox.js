import * as React from 'react'
import Placeholder from './Placeholder'

const PlaceholderBox = (props) => {
  if (props.isLoading) {
    return (
      <div className={`PlaceholderBox ${props.className}`}>
        <div className="left item">
          <div className="ui placeholder">
            <div className="image"></div>
          </div>
        </div>
        <div className="right item">
          <Placeholder lineCountFor={props.placeholderLineCount} />
        </div>
        <style jsx>{`
          .PlaceholderBox {
            display: flex;
            background: #ffffff;
            box-shadow: var(--shadow-medium);
            height: ${props.loadingHeight};
            padding: 24px;
          }
          .PlaceholderBox .right.item {
            flex: 1;
            margin-left: 24px;
          }
          .PlaceholderBox .left.item {
            flex: 0 0 150px;
          }
          .PlaceholderBox .left.item .placeholder {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`PlaceholderBox ${props.className}`}>
      {props.children}
      <style jsx>{`
        .PlaceholderBox {
          background: #ffffff;
          box-shadow: var(--shadow-medium);
        }
        @media screen and (max-width: 568px) {
          .PlaceholderBox {
            position: relative;
          }
        }
      `}</style>
    </div>
  )
}
export default PlaceholderBox
