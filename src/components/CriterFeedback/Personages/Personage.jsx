import "./Personage.css"

import vec_luisa_hablando_1 from '../../../assets/personajes/VEC_LUISA_HABLANDO_1.svg';
import vec_luisa_hablando_2 from '../../../assets/personajes/VEC_LUISA_HABLANDO_2.svg';
import vec_luisa_sonriendo from '../../../assets/personajes/VEC_LUISA_SONRIENDO.svg';

import vec_yeiner_hablando_1 from '../../../assets/personajes/VEC_YEINER_HABLANDO_1.svg';
import vec_yeiner_hablando_2 from '../../../assets/personajes/VEC_YEINER_HABLANDO_2.svg';
import vec_yeiner_sonriendo from '../../../assets/personajes/VEC_YEINER_SONRIENDO.svg';

export default ({
    name,
    modo,
    escena,
    action
}) => {

    const fotoPersonage = () => {
        switch(name){
            case "yeiner": {
                if (action){
                    return vec_yeiner_hablando_1;
                }
                switch(escena){
                    case 'answer':
                        return vec_yeiner_hablando_2;
                    default:
                        return vec_yeiner_sonriendo;
                }
            }

            case "luisa": {
                if (action){
                    return vec_luisa_hablando_1;
                }
                switch(escena){
                    case 'question':
                        return vec_luisa_hablando_2;
                    default:
                        return vec_luisa_sonriendo;
                }
            }
        }
    }

    return (
        <div className="personage">
            <img 
                src={fotoPersonage()} 
                alt=""
            />
        </div>
    )
}