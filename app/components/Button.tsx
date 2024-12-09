import { IButton } from '../interfaces/componentInterfaces';

const Button = ({ text="", onClick=() => {}, rounded=false, children  } : IButton) => {
    return (
        <button
            className={`flex items-center px-4 py-2 text-white border border-green bg-green ${rounded ? 'rounded-lg' : ''}  hover:bg-greenOpacity hover:border-greenOpacity`}
            onClick={onClick}
        >
            { children }
            { text }
        </button>
    );
};

export default Button;