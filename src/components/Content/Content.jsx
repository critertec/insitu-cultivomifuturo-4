import classNames from 'classnames'
import "./Content.css";

import imgPyramid from '../../assets/vectores/VEC_PIRAMIDE_1.svg'

import food_1 from "../../assets/comidas/01.png"
import food_2 from "../../assets/comidas/02.png"
import food_3 from "../../assets/comidas/03.png"
import food_4 from "../../assets/comidas/04.png"
import food_5 from "../../assets/comidas/05.png"
import food_6 from "../../assets/comidas/06.png"
import food_7 from "../../assets/comidas/07.png"
import food_8 from "../../assets/comidas/08.png"
import food_9 from "../../assets/comidas/09.png"
import food_10 from "../../assets/comidas/10.png"

export default ({ smallWidth, comida, estado })=> {

    const imgFood = () => {
        switch(comida.id){
            case 1: return food_1;
            case 2: return food_2;
            case 3: return food_3;
            case 4: return food_4;
            case 5: return food_5;
            case 6: return food_6;
            case 7: return food_7;
            case 8: return food_8;
            case 9: return food_9;
            case 10: return food_10;
        }
    }

    const ContentImgFood = () => {
        return (
            <div className="bg-table">
                <img 
                    src={imgFood()} 
                    alt=""
                    className="img-dishes"
                />
            </div>
        )
    }

    const Welcome = () => {
        return (
            <BackgroundFood>
                <div className="welcome-content">
                    <div>
                        ALIMENTACION SALUDABLE
                    </div>
                </div>
            </BackgroundFood>
        )
    }

    const FeedbackEnd = () => {
        return (
            <BackgroundFood>
                <div className="bg-food-contentText">
                    <div className="bg-food-text">HAS CONSEGUIDO</div>
                    <div className="bg-food-textInfo">¡{estado.puntaje} SEMILLAS!</div>
                    <div className="bg-food-message">
                        <div className="bg-food-message-text">
                            PARA CULTIVAR UN MEJOR FUTURO
                        </div>
                    </div>
                </div> 
            </BackgroundFood>
        )
    }

    const BackgroundFood = ({children}) => {
        return (
            <div className="bg-food-container">
                <div className="bg-food-top" />
                <div className="bg-food-content" >

                    <div className="bg-food-containerText">
                        <div className="bg-food-line-top" />
                        {children}
                        <div className="bg-food-line-bottom" />
                    </div>

                </div>
                <div className="bg-food-bottom" />
            </div>

        )
    }

    const Pyramid = () => {
        return (
            <div className="imgPyramid">
                <img 
                    src={imgPyramid} 
                    alt=""
                />
            </div>
        )
    }

    const showContent = () => {
        switch(estado.modo){
            case "game":
                return <ContentImgFood />;
            case "talk": {
                switch(estado.escena){
                    case "intro":
                        return <Welcome />
                    case "pyramid":
                        return <Pyramid />
                    case 'feedbackEnd':
                        return <FeedbackEnd />
                }
            }

        }
    }

    return (
        <div 
            id="content" 
            className={classNames({
                "content": true,
                "intro": estado.modo !== 'game'
            })}
        >
            {showContent()}
        </div>
    )
};