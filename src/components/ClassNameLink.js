import * as React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null

  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${
      props.activeClassName
    } ${props.className}`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
