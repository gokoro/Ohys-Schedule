import ContentLoader from 'react-content-loader'

const DefaultLoader = ({ children, width, height, ...props }) => {
  const isPercentage =
    String(width).includes('%') || String(height).includes('%')

  return (
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      width={width}
      height={height}
      viewBox="0 0 400 160"
      preserveAspectRatio={isPercentage ? 'none' : 'xMidYMid meet'}
      {...props}
    >
      {children}
    </ContentLoader>
  )
}

export { DefaultLoader }
