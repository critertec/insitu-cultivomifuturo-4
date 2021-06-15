import { useState, useEffect } from 'react';
import classNames from 'classnames';

import CriterHeader from '../CriterHeader/CriterHeader';
import Content from '../Content/Content';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import CriterFooter from '../CriterFooter/CriterFooter';

import CriterFeedback from '../CriterFeedback/CriterFeedback';

import dataQuestion from './data.js';
import introConversation from './Intro/intro'

import Modal from '../Utils/Modal/Modal';
import Instructions from './Intro/Instructions'

const smallWidth = window.innerWidth < 1000;

export default () => {
    const [estado, setEstado] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [comida, setComida] = useState({});
    const [pregunta, setPregunta] = useState({});
    const [modalIntro, setModalIntro] = useState(true);
    const [conversationIntro, setConversationIntro] = useState([]);

    const contestar = (option) => {
        if (estado.escena !== 'question'){
            return ;
        }

        // Verificar si la respuesta es correcta
        let verifyTrush = pregunta.opcion.correcta.includes(option.titulo);

        // Incrementar puntuaje
        let pts = verifyTrush ? estado.incrementPts : 0;
        // Verificar Vidas
        let intentos = verifyTrush ? estado.intentos : estado.intentos -1;

        // Nuevo estado
        let newState = {
            escena: 'feedback',
            intentos,
            puntaje: (estado.puntaje + pts) < estado.puntajeMax ? 
                estado.puntaje + pts
                :
                estado.puntaje
            ,
            respuesta: { 
                verifyTrush,
                option: option.titulo
            },
            pts
        }

        // Cambiar 

        // console.log({
        //     pregunta,
        //     seleccion: option,
        //     verifyTrush,
        //     pts,
        //     intentos
        // })

        setEstado({...estado, ...newState})

        // console.log({ ...estado, ...newState })
    };

    const continuar = () => {
        if (estado.escena !== 'feedback'){
            return;
        }

        if (!estado.intentos){
            //Game Over
            setPregunta({});
            setFoodList([])
            
            return setEstado({
                ...estado,
                modo: 'talk',
                escena: "feedbackEnd",
            })

        }

        let foodQuestions = [...comida.preguntas];
        let newComida = {};
       
        if (foodQuestions.length > 1){
            // si la comida tiene preguntas, ir quitando
            foodQuestions.shift();
            newComida = {
                ...comida, 
                preguntas: foodQuestions
            }

            setPregunta(newComida.preguntas[0]);

            // console.log('newPregutan', pregunta);
        }else if (foodList.length > 1){ 
            // si ya no tiene preguntas, seleccionar otra comida
            let newFoodList = [...foodList]
            
            newComida = newFoodList.shift();
            
            setFoodList(newFoodList);
            setPregunta(newComida.preguntas[0]);
        }else {
            setPregunta({});
            setFoodList([])
            // console.log('fin del juego')
        }

        // si ya no hay comidas, finalizar juego
        setComida(newComida);

        setEstado({
            ...estado,
            modo: newComida.id ? "game" :  "talk",
            escena: newComida.id ? "question" : "feedbackEnd",
            respuesta: null
        })
        // console.log('continuar', foodList)
        
    };

    const iniciar = () => {
        let foodListData = [...dataQuestion];
        let food = foodListData.shift();
// question
// answer
        setEstado({
            modo: 'game',
            escena: 'question',
            intentos: 3,
            puntaje: 0,
            incrementPts: 50,
            puntajeMax: 1000,
            racha: 0,
            respuesta: null
        })

        setFoodList(foodListData);
        
        setComida(food);
        setPregunta(food.preguntas[0]);
    };

    const tutorial = () => {
        let question = introConversation[0];
        setConversationIntro([...introConversation].splice(1,));

        setEstado({
            modo: 'talk',
            escena: 'intro',
            personaje: 'luisa',
            intentos: 3
        })
        setPregunta(question);
    }

    const continuarTuto = () => {
        let question = conversationIntro[0];
        setConversationIntro([...conversationIntro].splice(1,));

        if (!question){
            // Se acabaron las preguntas, comenzar juego
            return iniciar();
        }

        let newEstado = {
            ...estado, 
            personaje: question.personaje,
        }

        if (question.pyramid && estado.escena === 'intro'){
            newEstado = {...newEstado, escena : "pyramid"}
        }

        setEstado(newEstado)
        setPregunta(question);
    }

    const handleChangePyramid = () => {

        if (estado.escena !== 'pyramid'){
            let newEstado = {
                ...estado,
                escena: 'pyramid',
                modo: 'talk',
                prevEscena: estado.escena,
                prevModo: estado.modo
            }

            setEstado(newEstado)
        }else {
            setEstado({
                ...estado,
                prevModo: null,
                prevEscena: null,
                modo: estado.prevModo,
                escena: estado.prevEscena
            })
        }
    }

    const restartGame = () => {
        tutorial();
    }

    useEffect(()=> {
        // console.log("Iniciar")
        // tutorial();
        // iniciar();
    }, [])

    return (
        <div className="app">
            {(estado.modo === 'game' || estado.modo === 'talk') &&
                <div className="container">
                    <div className={classNames({
                        "container-game": true,
                        "small": smallWidth
                    })}>
                        <div className="game">
                            <CriterHeader 
                                estado={estado} 
                                handleChangePyramid={handleChangePyramid}
                                restartGame={restartGame}
                            />

                            <div className="box-game">
                                <Content 
                                    smallWidth={smallWidth}
                                    comida={comida}
                                    estado={estado}

                                />
                                {estado.modo === 'game' &&
                                    <OptionsMenu 
                                        smallWidth={smallWidth}
                                        estado={estado}
                                        pregunta={pregunta}
                                        contestar={contestar} 
                                    />
                                }
                            </div>

                            <CriterFooter 
                                estado={estado} 
                                pregunta={comida} 
                            />
                        </div>

                    </div>

            {/* Fondo Barra */}

                    <div className="feedback-bg-container">
                        <div className="feedback-bg" />
                    </div>

            {/* Personajes */}
                    <CriterFeedback 
                        smallWidth={smallWidth}
                        estado={estado}
                        pregunta={pregunta}
                        continuar={estado.modo === 'talk'?  
                            continuarTuto : continuar
                        }
                    />
                </div>
            }

            <div>
                <Modal
                    show={modalIntro}
                    handleChange={()=>{
                        // Cerrar modal
                        setModalIntro(!modalIntro);
                        // Iniciar Juego
                        tutorial();
                    }}
                >
                    <Instructions />
                </Modal>
            </div>

        </div>
    );
}