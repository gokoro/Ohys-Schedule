import * as React from 'react'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="item">
          <div className="head bold">Contact</div>
          <div className="ctx">
            <ul>
              <li>
                <a href="https://discord.gg/EUvzwzx">Ohys-Raws Discord</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="item">
          <div className="head bold">Copyright</div>
          <div className="ctx copyright">
            <div className="test">
              <a href="https://github.com/gokoro">
                Copyright 2020 Gokoro. All rights reserved.
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          color: #ffffff;
          background-color: #000000;
          margin-top: 3rem;
          padding: 3rem 0;
          width: 100%;
        }
        .container {
          width: 60%;
          margin: 0 auto;
          display: flex;
        }
        .container .item {
          flex: 1 1 0;
        }
        .head {
          margin-bottom: 24px;
          text-align: center;
        }
        .ctx a:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        .copyright {
          text-align: center;
        }
      `}</style>
    </div>
  )
}
export default Footer
