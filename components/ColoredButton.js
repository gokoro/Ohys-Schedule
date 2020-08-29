const ColoredButton = props => {
    const { textColor, bgColor, hoverBgColor } = props
    return (
        <div className="rounded bold item">
            {props.children}
            <style jsx>{`
                .item {
                    font-size: 15px;
                    padding: 8px 16px;
                    background-color: ${bgColor};
                    color: ${textColor};
                    transition: background-color 0.1s;
                }
                .item:hover {
                    background-color: ${hoverBgColor};
                }
            `}</style>
        </div>

    )
}
export default ColoredButton