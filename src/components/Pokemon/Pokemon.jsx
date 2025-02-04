import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon( {name, image, id} ) {
    return (
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>
                <div className="name">{name}</div>
                <div className="image-sec"><img src={image} className="image"/></div>
            </Link>
        </div>
    )
}

export default Pokemon;