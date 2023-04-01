import Link from 'next/link'
import { withRouter } from 'next/router'
import * as React from 'react'
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

  return (
    <Link legacyBehavior {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default withRouter(ActiveLink)
