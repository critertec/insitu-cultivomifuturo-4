import "./info.css"

import logoCultivoMiFuturo from '../../../assets/logos/CULTIVO.png'
import logos from '../../../assets/logos/SPONSORS.png'

import textos from './intructions'

export default ({}) => {
    return (
        <>
        <div className="bg-lateral-intro" />
        <div className="bg-lateral-plant" />
        <div className="intro-container">

            <div className="intro-box">
                <div className="intro-content">
                    <div className="centerAbs">
                        <img 
                            src={logoCultivoMiFuturo} 
                            alt=""
                            className="logoCultivoMiFuturo"
                        />
                    </div>
                    <div className="intro-title">
                        Alimentacion Saludable
                    </div>

                    <div className="intro">
                        <div className="intro-container-content">
                            <div className="intro-text-intructions">
                                Instrucciones
                            </div>
                            {textos.map((text, index) => (
                                <div className="intro-block-text" key={index}>
                                    {text}
                                </div>
                            ))}
                        </div>

                        <div className="Logos">
                            <img 
                                src={logos}
                                alt=""
                            />
                        </div>
                    </div>

                </div>
                
            </div>

        </div>
        </>
    )
}