import "./Option.css"
import classNames from 'classnames'

import icon_harina from "../../../assets/vectores/VEC_ICONO_HARINAS.svg"
import icon_azucar from "../../../assets/vectores/VEC_ICONO_AZUCARES.svg"
import icon_verdura from "../../../assets/vectores/VEC_ICONO_VERDURAS.svg"
import icon_proteina from "../../../assets/vectores/VEC_ICONO_PROTEINAS.svg"
import icon_grasa from "../../../assets/vectores/VEC_ICONO_GRASAS.svg"
import icon_lacteo from "../../../assets/vectores/VEC_ICONO_LACTEOS.svg"

export default ({ 
    color, 
    icon, 
    smallWidth, 
    contenido, 
    optionsTruth, 
    estado, 
    titulo, 
    index, 
    ...props
}) => {

    // const colors = [
    //     "#F2C335",
    //     "#2A601E",
    //     "#3D9DBE",
    //     "#E2433C",
    //     "#AE9562",
    //     "#9D4EBF",
    // ];
    // console.log('option', estado)

    const selectedIcon = (type) => {
        switch(type){
            case 'harina': return icon_harina;
            case 'verdura': return icon_verdura;
            case 'lacteo': return icon_lacteo;
            case 'proteina': return icon_proteina;
            case 'grasa': return icon_grasa;
            case 'azucar': return icon_azucar;
        }
    }

    const styleDisabled = () => {
        switch(estado.escena){
            case "question":
                return false;
            case "feedback":
                return estado.respuesta?.option === titulo ? 
                    false : true;
            default: 
                return false;
        }
    }

    return (
        <div 
            className={classNames({
                "option-container": true,
                // "option-md": !smallWidth,
                [`option-color_${color}`]: true,
                [`option-disabled-${index % 2}`]: styleDisabled()
            })} 
            // style={{ backgroundColor: colors[color] }}
            {...props}
            
        >
            <div className="box-option">
                <div className="option">
                    <div className="titulo-comida">
                        { contenido }
                    </div>
                    <div className="img-comida">
                        <img 
                            src={selectedIcon(icon)} 
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
