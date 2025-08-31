import { type FC } from 'react'
import { url } from '../../utils/url';
import { Link } from 'react-router-dom';

declare module 'react' {
    interface CSSProperties {
        '--main-color'?: string;
        '--secondary-color'?: string;
    }
}

interface SlideProps {
    img: string;
    title: string;
    description: string;   
    primaryColor: string;
    secondaryColor: string;
}

const Slide: FC<SlideProps> = ({title, description, img, primaryColor, secondaryColor}) => {
    return (
        <div className='slide' style={{'--main-color': primaryColor, '--secondary-color': secondaryColor}}>
            <div className="maskparent">
                <img src={`${url}/${img}`} alt={title}/>
            </div>
            <div className={`slide-info`}>
                <h1>Custom Cases</h1>
                <h3>{title}</h3>
                <p>{description}</p>
                <button><Link to='/build'>Buy Now!</Link></button>
            </div>
        </div>
    )
}

export default Slide