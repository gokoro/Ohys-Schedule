const Section = props => {
    return (
        <div className="section">
            {props.children}
            <style jsx>{`
                .section {
                    padding-bottom: 48px;
                }
            `}</style>
        </div>
    )
}
export default Section