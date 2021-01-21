const Placeholder = (props) => {
  const lines = []

  for (let i = 0; i < props.lineCountFor; i++) {
    lines.push(<div key={i} className="line"></div>)
  }

  return <div className="ui placeholder">{lines}</div>
}
export default Placeholder
