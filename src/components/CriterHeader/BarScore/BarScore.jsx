import  "./BarScore.css";

export default ({ pts, ptsMax }) => {
    return (
        <div id="bar-container">
            <div className="title">
                SEMILLAS
            </div>
            {/* Barra */}
            <div className="bar">
                <div 
                    className="bar-fill" 
                    style={{
                        width: `${pts/10}%`
                    }}
                />
            </div>

            <div className="text">
                <div className="">{pts}</div>
                <div className="">{ptsMax}</div>
            </div>
        </div>
    )
}