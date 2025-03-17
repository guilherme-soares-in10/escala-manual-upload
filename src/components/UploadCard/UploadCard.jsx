import Button from "../Button/Button";
import './UploadCard.css'

const UploadCard = ({text, onClick}) => {
    return (
        <div className="uploadCardContainer">
            <div>
                <p>{text}</p>
            </div>
            <div className="browseContainer">
                <img src="./src/images/icon.svg" alt="icon" />
                <p>Drag n Drop here<br></br>or<br></br><a href="">Browse</a></p>
            </div>
            <Button text={'Upload now'} onClick={onClick}></Button>
        </div>
    )
}

export default UploadCard;