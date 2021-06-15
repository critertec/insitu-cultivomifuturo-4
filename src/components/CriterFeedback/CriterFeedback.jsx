import classNames from 'classnames'

import './CriterFeedback.css';

import Personage from './Personages/Personage';
import BoxTalk from './BoxTalk/BoxTalk.jsx';

export default ({
    estado: {escena, modo, respuesta, personaje},
    pregunta,
    continuar, 
    reiniciar,
    smallWidth
}) => {
    // console.log(pregunta, 'pre')

    // const vect_evaluacion = {
    //     correcto: vect_correcto,
    //     incorrecto: vect_incorrecto
    // }

    const titleTalk = () => {
        if (escena === 'feedback'){
            return respuesta.verifyTrush ?
                pregunta.opcion.respuesta_afirmativa
                :
                pregunta.opcion.respuesta_negativa 
        }
    }

    const textTalk = () => {
        switch(escena){
            case 'feedback':
                return pregunta.opciones
                    .filter(op => op.titulo === respuesta.option)[0]
                    .feedback;
            case 'intro':
            case "pyramid":
                return pregunta.text;
            default :
                return pregunta.titulo;
        }
    }

    return (
        <div 
            id="feedback" 
            className={classNames({
                "small": smallWidth
            })}
        >
            <div 
                className= {classNames({
                    "feedback-container": true,
                    "back": escena === 'question'
                })}
            >
                {/* <div className="feedback-bg-container"> */}
                    {/* <div className="feedback-bg" /> */}
                {/* </div> */}
                
                <div className="persons-container">
                    {/* Personaje luisa */}
                    <div className="person-container">
                        {   (   
                                (modo === 'talk' && personaje === 'luisa') ||
                                escena === 'question' ||
                                escena === 'feedback'
                            ) &&
                            <BoxTalk
                                escena={escena}
                                modo={modo}
                                text={textTalk()}
                                title={titleTalk()}
                                onClick={()=> {continuar()}}
                                side="left"
                            />
                        }
                        <Personage
                            name="luisa"
                            escena={escena}
                            modo={modo}
                            action={personaje === 'luisa'}
                        />
                    </div>

                    {/* Personaje yeiner */}
                    <div className="person-container right">
                        {   (
                                (modo === 'talk' && personaje === 'yeiner') ||
                                escena === 'answer' 
                            ) &&
                            <BoxTalk
                                escena={escena}
                                modo={modo}
                                text={textTalk()}
                                title={titleTalk()}
                                onClick={()=> {continuar()}}
                                side="right"
                            />
                        }
                        <Personage
                            name="yeiner"
                            escena={escena}
                            modo={modo}
                            action={personaje === 'yeiner'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}