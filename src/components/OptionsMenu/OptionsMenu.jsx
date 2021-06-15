import classNames from 'classnames'

import "./OptionsMenu.css"
import Option from './Option/Option'

export default ({ smallWidth, pregunta, estado, contestar }) => {
    const colors = [
        'yellow',
        'green',
        'blue',
        'red',
        'marron',
        'purple'
    ];

    const icons = [
        'harina', 
        'verdura', 
        'lacteo', 
        'proteina', 
        'grasa', 
        'azucar' 
    ];

    return (
        <div 
            className={classNames({
                "options-container": true,
                "options-container-small": smallWidth
            })}
        >
                <div id="options">
                    {
                        pregunta.opciones && [pregunta.opciones
                            .map((option, index)=>(
                                <Option 
                                    key={option.titulo}
                                    index={index}
                                    color={colors[index]}
                                    icon={icons[index]}
                                    smallWidth={smallWidth}
                                    optionsTruth={pregunta.opcion.correcta ?? []}
                                    
                                    estado={estado}
                                    onClick={()=> { contestar(option) }}

                                    {...option}
                                />
                            ))]
                    }
                </div>
        </div>
    )
}