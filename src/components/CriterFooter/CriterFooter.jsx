
import './CriterFooter.css';

function CriterFooter({ estado, pregunta }) {
    return (
        <>
            {estado.modo === 'game' ? 
                <div className="footer" >
                    <div className="footer-desc">
                        { pregunta.contenido }
                    </div>
                    <div className="footer-question">
                        { pregunta.pregunta_personaje}
                    </div>
                </div>
                :
                null
            }
        </>
    );
}

export default CriterFooter;