import { withRouter } from 'next/router'
import Link from 'next/link'
import { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null

  if (router.asPath === props.as && props.activeClassName) {
    className = `${className !== null ? className : ''} ${
      props.activeClassName
    }`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
