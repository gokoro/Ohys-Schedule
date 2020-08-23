const ShadowWhiteBox = props => {
    return (
        <div className={`box ${props.className}`}>
            {props.children}
            <style jsx>{`
                .box {
                    background: #FFFFFF;
                    box-shadow: var(--shadow-small);
                    padding: 24px;
                }
            `}</style>
        </div>
    )
}
export default ShadowWhiteBox