import Link from 'next/link'

const SectionTitle = (props) => {
  return (
    <div className="SectionTitle">
      <div className="item title bold">{props.children}</div>
      {props.isDisplayLink && (
        <div className="item link">
          <Link href={props.href} as={props.as}>
            <a>{props.linkText}</a>
          </Link>
        </div>
      )}
      <style jsx>{`
        .SectionTitle {
          display: flex;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid #ecf0f1;
        }
        .title {
          font-size: ${props.size || '14px'};
        }
        .item {
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
