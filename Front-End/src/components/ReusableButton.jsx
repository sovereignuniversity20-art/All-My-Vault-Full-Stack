const ReusableButton = ({label, onClick, variant}) => {
    return (
    <button type="button" onClick={onClick}>{label}</button>
)};

export default ReusableButton;


