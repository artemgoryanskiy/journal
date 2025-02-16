import './Button.css'
import { useState } from 'react';

function Button() {
    const [text, setText] = useState('Сохранить');
    const clicked = () => {
        setText('Закрыть');
        console.log('clicked');
        console.log(text);
    }

    return (
        <button className='button accent' onClick={clicked}>{text}</button>
    );
}

export default Button;
