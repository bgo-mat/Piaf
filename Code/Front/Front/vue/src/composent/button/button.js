import '../../App.css';
export default function Button({children, className, onClick}){

    return (
        <div className="container-btn">
            <button className={`custom-button ${className}`} onClick={onClick}>{children}</button>
        </div>
    )
}
