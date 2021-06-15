import classNames from 'classnames'
import "./BoxTalk.css"

export default ({
    escena = "feedback",
    modo,
    title = "",
    text,
    onClick,
    side
}) => {

    return (
        <div
            className={classNames({
                "boxTalk-container": true,
                [side]: true
            })}
            onClick={onClick}
        >
            <div>
                <div className={classNames({
                    [`boxTalk-${modo === "talk" ? 'feedback' : escena}`]: true
                })}>
                    { title && 
                        <div className="titulo-container">
                            <div className="titulo">
                                { title } 
                            </div>
                        </div>
                    }

                    <div className="text-container">
                        <div className="text">
                            { text }
                        </div>
                    </div>
                    {(modo === 'talk' || escena === 'feedback') &&
                        <div 
                            className="btn-container"
                        >
                            <div className="btn">
                                siguiente <span className="fl"></span>
                            </div>
                        </div>
                    }
                </div>
                <div className={classNames({
                    "boxTalk-fl-container": true,
                    [side]: true
                })}>
                    <div className={classNames({ 
                        "boxTalk-fl" : true,
                        [side]: true
                    })}/>
                </div>
            </div>
        
        </div>
    )
}